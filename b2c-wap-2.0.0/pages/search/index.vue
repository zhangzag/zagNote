<template>
  <section class="full_wrap contain">
    <!-- 搜索框 -->
    <div class="search_from">
      <form class="d_flex" action="javascript:;">
        <input type="text" placeholder="请输入搜索关键字" v-model.trim="searchCon">
        <button @click="jumpSearch('topSearch')">搜索</button>
      </form>
    </div>
    <!-- 搜索框 end -->
    <!-- 热门搜索 -->
    <div class="hot_search" v-show="hotSearchs.length">
      <div class="border_h">
        <span>热门搜索</span>
      </div>
      <div class="lists">
        <a
          v-for="(hs,index) in hotSearchs"
          @click="jumpSearch('hotSearch', hs, index)"
          href="javscript:;">{{ searchTextFilter(hs) }}</a>
      </div>
    </div>
    <!-- 热门搜索 end -->
    <!-- 历史搜索 -->
    <div class="hot_search history_search" v-show="historyList.length>0">
      <div class="border_h">
        <span>历史搜索</span>
        <button @click="clearHistory">清除历史记录</button>
      </div>
      <div class="lists">
        <a
          v-for="(hl,index) in historyList"
          @click="jumpSearch('historySearch', hl, index)"
          href="javscript:;">{{ hl }}</a>
      </div>
    </div>
    <!-- 历史搜索 end -->

  </section>
</template>

<script>
  import { hotSearch, hotSearchDetail } from '@/api/search/'
  import { curDate } from '@/utils/utils.js'

  export default {
    name: 'search',
    layout: 'secondPage',
    async asyncData({app, params}){
      // console.log('params: ', params)
      // let searchType = '';
      //
      // await hotSearch({app, data: {
      //     endDate: curDate,//格式为 2018-05-26 00:00:00
      //     productTypeID: searchType,//格式为 int    可为空，为空时返回首页下的热门搜索
      //     type: '',//格式为 int   1、分类 2、商品 3、品牌   可为空，为空时返回3种类型的热门搜索
      //     isValid: 1,//格式为 string	1、有效  0、无效
      //   }})
      //   .then(res=>{
      //     console.log('热门搜索： ', res)
      //   })
      //   .catch(err=>{
      //     console.log('获取热门搜索出错了, ', err)
      //   })
    },
    data (){
      return {
        headTitle: '搜索',
        searchCon: '',//搜索内容
        hotSear: '', //热门搜索
        historyList: process.browser?(localStorage.searchhistorelist?JSON.parse( localStorage.searchhistorelist ):''):'',//搜索历史
        hotSearchs: [],//热门品牌
      }
    },
    mounted (){
      let productTypeID = this.$route.query.hotByIdTwo || '';//二级
      let parentTypeId = this.$route.query.hotByIdOne || '';//一级
      let searchType = productTypeID?productTypeID:parentTypeId;

      hotSearch({app: this, data: {
          endDate: curDate,//格式为 2018-05-26 00:00:00
          productTypeID: searchType,//格式为 int    可为空，为空时返回首页下的热门搜索
          type: '',//格式为 int   1、分类 2、商品 3、品牌   可为空，为空时返回3种类型的热门搜索
          isValid: 1,//格式为 string	1、有效  0、无效
        }})
        .then(res=>{
          console.log('热门搜索： ', res)
          let datas = res.data;

          if( res.success && datas.length>0 ){
            for( let i=0; i<datas.length; i++ ){
              //热门搜索
              hotSearchDetail({app: this, data: {
                  endDate: curDate, //格式为 2018-05-26 00:00:00
                  searchID: datas[i].searchID, //格式为 int
                  type: datas[i].type, //1、分类 2、商品 3、品牌
                  isValid: 1, //格式为 string	1、有效  0、无效
                }})
                .then((res)=>{
                  // console.log("热门搜索-按品牌：", res);
                  if( res.success && res.data.length>0 ){
                    for( let y=0; y<res.data.length; y++ ){
                      res.data[y].dataType = 3;
                      this.hotSearchs.push( res.data[y] );
                    }
                  }
                });
            }
          }
        })
        .catch(err=>{
          console.log('获取热门搜索出错了, ', err)
        })
    },
    methods: {
      //过滤得到热门搜索
      searchTextFilter ( data ){
        // dataType: 1 - 分类。2 - 商品。3 - 品牌
        if( !data ){ return ''; };

        //分类
        if( data.dataType === 1 ){
          return data.productTypeName;
        }
        //商品
        else if( data.dataType === 2 ){
          return data.productName;
        }
        //品牌
        else {
          return data.brandName;
        }
      },
      //搜索
      jumpSearch (searchType, hs, index){
        const _self = this;
        var hisList = [];

        //搜索时记录搜索历史
        if( searchType == 'topSearch' && this.searchCon ){
          if( localStorage.searchhistorelist ){
            hisList = JSON.parse( localStorage.searchhistorelist );
            //去重
            hisList.forEach(function(value, index, arr){
              // console.log(value, index, arr)
              value == _self.searchCon?hisList.splice(index,1):'';
            });
            //保留20条数据
            hisList.length>20?hisList.splice(0,1):'';
            hisList.unshift( this.searchCon );
            localStorage.searchhistorelist = JSON.stringify(hisList);
          }else{
            hisList.unshift( this.searchCon );
            localStorage.searchhistorelist = JSON.stringify(hisList);
          }
        }

        //热门搜索
        if( searchType == 'hotSearch' ){
          // this.$router.replace({ path: 'product', query: { searchCon: hs.searchName } });
          // console.log('热搜： ', hs)
          // dataType: 1 - 分类。2 - 商品。3 - 品牌
          if( hs.dataType === 1 ){
            if( hs.level === 2 ){
              //二级分类
              this.$router.replace({ path: 'product', query: { ptId: hs.productTypeId } });
            }else{
              this.$router.replace({ path: 'product', query: { ptIdOne: hs.productTypeId } });
            }
          }else if( hs.dataType === 2 ){
            // this.$router.replace({ path: 'product/product_detail', query: { proid: hs.productID } });
            window.location.href = '/mpros/'+ (hs.productNumber || hs.productID) +'.html';
          }else{
            this.$router.replace({ path: 'product', query: { searchCon: hs.brandName } });
          }
          return false;
        }

        //历史搜索
        if( searchType == 'historySearch' ){
          this.$router.replace({ path: '/products/list', query: { searchCon: hs } });
          return false;
        }

        //普通搜索
        this.$router.replace({ path: '/products/list', query: { searchCon: this.searchCon } });
      },
      //清除历史记录
      clearHistory (){
        this.historyList = [];
        localStorage.searchhistorelist = '';
      },
    }
  }
</script>

<style scoped lang="scss">
  .full_wrap {
    height: 100vh;
    height: calc(100vh - 40px);
    background-color: #fff;
  }
  .search_from {
    padding: 0 0.3125rem;
    height: 1.625rem;
    line-height: 1.625rem;
    background-color: #fff;
  }
  .search_from>form {
    height: 1.625rem;
    align-items: center;
  }
  .search_from input[type=text] {
    height: 0.9375rem;
    line-height: normal;
    border-radius: 0.9375rem;
    border: 0.03125rem solid #b2b2b2;
    font-size: 0.34375rem;
    color: #a7a7a7;
    width: 8.125rem;
    padding: 0 0.46875rem 0 1.15625rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-image: url(~assets/images/icon_search.png);
    background-repeat: no-repeat;
    -webkit-background-size: 0.40625rem auto;
    background-size: 0.40625rem auto;
    background-position: 0.59375rem center;
  }
  .search_from input[type=text]::-webkit-input-placeholder {
    color: #a7a7a7;
  }
  .search_from input[type=text]::-moz-placeholder {
    color: #a7a7a7;
  }
  .search_from input[type=text]:-ms-input-placeholder {
    color: #a7a7a7;
  }
  .search_from input[type=text]:-moz-placeholder {
    color: #a7a7a7;
  }
  .search_from button {
    width: 1.1875rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 0;
    background-color: transparent;
    font-size: 0.40625rem;
    padding: 0;
    color: #555;
  }

  /* hto_search */
  .hot_search .border_h {
    height: 1.5rem;
    line-height: 1.5rem;
    padding: 0 0.3125rem;

    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */

    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .hot_search .border_h span {
    height: 0.5rem;
    line-height: 0.5rem;
    padding-left: 0.25rem;
    border-left: 0.15625rem solid #f08200;
  }
  .hot_search .border_h button {
    border:0;
    background-color: transparent;
    font-size: 0.375rem;
  }
  .history_search .border_h span {
    border-left: 0.15625rem solid #2fba66;
  }
  .hot_search .lists {
    padding: 0 0.3125rem;
    overflow: hidden;
  }
  .hot_search .lists a {
    padding: 0.1875rem 0.3125rem;
    float: left;
    border: 1px solid #dadada;
    border-radius: 0.375rem;
    margin-right: 0.3125rem;
    margin-bottom: 0.3125rem;
    color: #a7a7a7;
  }


</style>
