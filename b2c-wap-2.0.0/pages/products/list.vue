<template>
  <section>
    <div class="search_top">
      <form @click="jumpSearch" class="d_flex" action="javascript:;">
        <input
          type="text"
          placeholder="请输入搜索内容"
          v-model="searchCon">
        <button>搜索</button>
      </form>
    </div>

    <div class="screens">
      <div class="lists d_flex">
        <a
          href="javascript:;"
          v-for=" (sl,index) in screensLists"
          :class="[ index==(screensLists.length-1)?'screen_a':'' , {'cur': clickNum[index+1].isCur} ]"
          @click="clickScreens( sl,index )">
          {{ sl.name }}
          <i></i>
        </a>
      </div>
      <transition name="fade">
        <!-- 全部分类 -->
        <div
          class="all_solt d_flex"
          v-show="curScreen===1">
          <div class="left">
            <dl>
              <!-- <dt>全部分类</dt> -->
              <dd
                :class="{ 'cur': curKs===0 }"
                @click="nextSort( 'allSort', 0 )">全部分类</dd>
              <dd
                :class="{ 'cur': index+1==curKs }"
                v-for=" (list,index) in ks "
                @click="nextSort( list, index )">{{list.productTypeName}}</dd>
            </dl>
          </div>
          <div class="right">
            <dl>
              <dd
                :class="{cur : curRightSort===0}"
                @click="searchSort('allSort',0)">全部{{ parentName }}</dd>
              <dd
                :class="{cur : (index+1)===curRightSort}"
                v-for=" (cs,index) in childSort "
                @click="searchSort(cs,index)">
                {{ cs.productTypeName}}
              </dd>
            </dl>
          </div>
        </div>
        <!-- 全部分类 end -->
      </transition>
      <!-- 品牌筛选 -->
      <transition name="fade">
        <div class="brand_solt"
             v-show='curScreen===2'>
          <div class="top">
            <a
              :class="{ cur: curBrandIndex === index }"
              v-for="(bl,index) in brandList"
              @click="chooseBrand(bl,index)"
              href="javascript:;">{{ bl.brandName }}</a>
          </div>
          <div class="bottom d_flex">
            <button
              @click="resetBrand">重置</button>
            <button
              @click="confirmBrand">确定</button>
          </div>
        </div>
      </transition>
      <!-- 品牌筛选 end -->
      <!-- 价格筛选 -->
      <transition name="fade">
        <div
          class="brand_solt price_solt"
          v-show='curScreen===3'>
          <!-- 价格区分 暂不要 -->
          <div v-if="false" class="top">
            <a class="cur" href="javascript:;">不限</a>
            <a href="javascript:;">100元以下</a>
            <a href="javascript:;">100-200元</a>
            <a href="javascript:;">200元以上</a>
            <a href="javascript:;">1000元以上</a>
          </div>
          <!-- 价格区分 暂不要 end -->
          <div class="center">
            <input
              type="number"
              placeholder="最低价"
              v-model.trim.number="minPrice">
            <span>元</span>
            <span>~</span>
            <input
              type="number"
              placeholder="最高价"
              v-model.trim.number="maxPrice">
            <span>元</span>
          </div>
          <div class="bottom d_flex">
            <button
              @click="confirmPrice">确定</button>
          </div>
        </div>
      </transition>
      <!-- 价格筛选 end -->

      <!-- 详细筛选 -->
      <div
        class="detail_solt"
        v-show='curScreen===4'
        @click.self="closeLayer">
        <div class="top">
          <div class="item">
            <h3 class="cur"><span>是否进口</span></h3>
            <ul>
              <li
                :class="{cur: isImported === 1}"
                @click="btnImport(1)">是</li>
              <li
                :class="{cur: isImported === 0}"
                @click="btnImport(0)">否</li>
            </ul>
          </div>
          <div class="item">
            <h3 class="cur"><span>剂型</span></h3>
            <ul>
              <li
                v-for="(jxitem,index) in jx"
                :class="{ cur: isJx === (index+1) }"
                @click="btnJx(jxitem,index)">{{ jxitem.jxName }}</li>
            </ul>
          </div>
          <!-- 底部按钮 -->
          <div class="btns d_flex">
            <button
              @click="resetSolt">重置</button>
            <button
              @click="confirmSolt">确定</button>
          </div>
          <!-- 底部按钮 end -->
        </div>
      </div>
      <!-- 详细筛选 end -->
    </div>

    <!-- 商品列表 -->
    <div class="product_lists" ref="listWrap"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="400"
         :style="`height: ${wrapHeight}px;`">
      <ul v-show="lists.list.length>0">
        <li
          class="d_flex"
          @click="jumpDetail(lt,index)"
          v-for="(lt,index) in lists.list">
          <div class="list_img">
            <img v-lazy="lt.defaultPhoto+'?200*200'" :alt="lt.productName">
          </div>
          <div class="list_info">
            <h2><i v-show="lt.prescriptionType" :class="lt.prescriptionType | imgType"></i>{{ lt.productName }}</h2>
            <span>{{ lt.spec }}</span>
            <h3 class="r_color">{{ lt.ourPrice | priceFilter }}</h3>
            <!-- 活动暂不需要 -->
            <div v-if='false' class="activitys">
              <span class="inlie_block">套餐</span>
              <span class="inlie_block">秒杀</span>
              <span class="inlie_block">满减</span>
            </div>
          </div>
        </li>
      </ul>
      <div ref="iconLoading" class="icon_loading" v-show="showLoadMore || (lists.count<=page*limit)">
        <span v-show="lists.count<=page*limit">没有更多了</span>
        <mt-spinner
          type="triple-bounce"
          v-show="(lists.count>=page*limit) && showLoadMore"></mt-spinner>
      </div>
    </div>
    <!-- 商品列表 end -->

    <!-- 加载动画 -->
    <div id="loadAnimate" v-show="showLoadAnimate">
      <div>
        <mt-spinner type="snake" color="#fff"></mt-spinner>
      </div>
    </div>
    <!-- 加载动画 end -->

    <!-- 遮罩 -->
    <transition name="fade">
      <div @click.self="closeLayer" class="layer" v-show="showLayer"></div>
    </transition>
    <!-- 遮罩 end -->
  </section>
</template>

<script>
  import { oneType, twoType } from '@/api/sort/'
  import { brandList } from '@/api/brand/'
  import { productList } from '@/api/product/'

  export default {
    name: 'list',
    layout: 'nofooter',
    async asyncData({app, params, query}){
      console.log('query: ', query)
      let lists = { count: 0, list: [] };
      let page = 1, limit = 20;
      let searchCon = query.searchCon || '', couponactiveid = query.couponid || '', productTypeID = query.ptId || '', parentTypeId = query.ptIdOne || '';

      await productList({app, data: {
          page,
          limit,
          productName: searchCon, //产品名称
          isImport: '', //是否进口
          productDrugType: '', // 剂型
          brandId: '', //品牌
          lowestPrice: '',//最低价格
          highest: '',//最高价格
          productType_one: parentTypeId,//父级ID
          productType_two: productTypeID,//当前科室ID
          couponactiveid,//优惠券id
          sysNo: 'wap', //终端
        }})
        .then(res=>{
          // console.log('商品列表： ', res.data)
          if(res.success){
            lists.count = res.count;
            for(let val of res.data){
              lists.list.push(val);
            }
          }
        })
        .catch(err=>{
          console.log('获取商品列表出错了， ', err)
        })

      return {page, limit, lists, searchCon, couponactiveid, productTypeID, parentTypeId}
    },
    data() {
      return {
        flag: false,//
        selected: '1', //
        isUnscRollable: false, //是否页面不可滚动
        backParentPage: false, //是否回到父页面
        screensLists: [ //筛选列表
          { name: '分类' },
          { name: '品牌' },
          { name: '价格' },
          { name: '筛选' }
        ],
        showLayer: false, //是否显示遮罩
        // clickNum: '', //点击第几个筛选按钮
        clickNum: {
          1: { 'name': '分类', isCur: false, isData: false, },
          2: { 'name': '品牌', isCur: false, isData: false, },
          3: { 'name': '价格', isCur: false, isData: false, },
          4: { 'name': '筛选', isCur: false, isData: false, },
        },
        curScreen: '', // 当前展示的筛选
        lists: {
          count: 0,
          list: [],
        },
        page: 1, //页数 默认1
        limit: 20, //
        searchCon: this.$route.query.searchCon,//搜索内容
        couponactiveid: this.$route.query.couponid || '',//根据优惠券id查询
        loading: false, //是否已在加载
        showLoadMore: false, //是否显示加载更多
        //筛选
        isImported: '',// 是否进口,0-否,1-是
        jx: [ //剂型
          { id: 1, jxName: '粉剂' },
          { id: 2, jxName: '贴剂' },
          { id: 3, jxName: '口服散剂' },
          { id: 4, jxName: '外用液体剂' },
          { id: 5, jxName: '软膏剂' },
          { id: 6, jxName: '栓剂' },
          { id: 7, jxName: '口服液' },
          { id: 8, jxName: '颗粒' },
          { id: 9, jxName: '片剂' },
          { id: 10, jxName: '胶囊' },
        ],
        isJx: '', //选中的剂型
        jxName: '', //选中的剂型名称
        brandList: [], //品牌列表
        curBrandIndex: '',//当前选中的品牌
        curBrandId: '',//当前选中品牌ID
        minPrice: '',//最低价
        maxPrice: '',//最高价
        ks: [],//科室分类列表
        curKs: 0,//当前科室
        childSort: [], //二级分类
        parentName: '',//二级分类的父级
        curRightSort: '',//当前选中的分类
        productTypeID: this.$route.query.ptId?this.$route.query.ptId:'',//当前分类ID
        parentTypeId: this.$route.query.ptIdOne?this.$route.query.ptIdOne:'',//全部科室时传递的科室ID
        showLoadAnimate: false,//显示加载动画
        wrapHeight: '',
      }
    },
    mounted (){

      this.wrapHeight = document.documentElement.clientHeight - this.$refs.listWrap.getBoundingClientRect().top;
    },
    methods: {
      //加载更多
      loadMore() {
        const _self = this;
// console.log('loadMore')
//         return
        if(this.flag || this.isUnscRollable)return false;
        this.loading = true;
        this.showLoadMore = true;

        this.flag = true;
        productList({
          app: this,
          data: {
            page: this.page,
            limit: 20,
            productName: this.searchCon, //产品名称
            isImport: this.isImported, //是否进口
            productDrugType: this.jxName, // 剂型
            brandId: this.curBrandId, //品牌
            lowestPrice: this.minPrice,//最低价格
            highest: this.maxPrice,//最高价格
            productType_one: this.parentTypeId,//父级ID
            productType_two: this.productTypeID,//当前科室ID
            couponactiveid: this.couponactiveid,//优惠券id
            sysNo: 'wap', //终端
          }
        })
          .then((res)=>{
            // console.log(res)
            if( res.success ){
              if( res.data.length == 0 ){
                // _self.$options.methods.showToast('没有更多数据!');
                this.showLoadMore = false;
                this.loading = true;
                this.flag = false;
                return false;
              }
              // _self.list = res.data.data ;
              // _self.list.push( res.data.data );
              this.lists.count = res.count;
              for( var i = 0;i<res.data.length;i++ ){
                this.lists.list.push( res.data[i] )
              }
              this.loading = false;
              this.showLoadMore = false;
              this.page++;
              this.flag = false;
            }else {
              this.$Toast(res.msg);
              this.showLoadMore = false;
              this.loading = true;
              this.flag = false;
            }
          })
          .catch((err)=>{
            console.log(err)
          });

        // setTimeout(() => {
        //
        // }, 300);
      },
      //跳到搜索页
      jumpSearch (){
        // 选择的二级分类this.productTypeID， 选择的一级分类this.parentTypeId
        if( this.productTypeID  ){
          //二级
          this.$router.replace({ path: '/search', query:{ hotByIdTwo: this.productTypeID } });
        }else if( this.parentTypeId ){
          //一级
          this.$router.replace({ path: '/search', query:{ hotByIdOne: this.parentTypeId } });
        }
        else{
          this.$router.replace({ path: '/search' });
        }
        // this.$router.go(-1);
      },
      //品牌选择
      chooseBrand ( bl,index ){
        this.curBrandIndex = index;
        this.curBrandId = bl.brandID;
      },
      //点击筛选
      clickScreens ( item, index ){
        const _self = this;

        //重复点击关闭筛选
        //第二次点击
        if( this.curScreen == index+1 ){
          // console.log('当前')
          if( !this.clickNum[index+1].isData ){ //没有点击筛选
            this.clickNum[index+1].isCur = false;
          }
          this.curScreen = '';//关闭筛选
          this.isUnscRollable = false;
          this.showLayer = false;//遮罩
          return false;
        }else{
          // console.log('非当前')
          if( !this.clickNum[index+1].isData ){ //没有点击筛选
            this.clickNum[index+1].isCur = false;
          }
          this.curScreen = '';//关闭筛选
          this.isUnscRollable = false;
          this.showLayer = false;//遮罩
          for(var i in this.clickNum) {
            // console.log(i,":",this.clickNum[i])
            if( !this.clickNum[i].isData ){
              this.clickNum[i].isCur = false;
            }
          }
        }
        this.isUnscRollable = true;
        // console.log(this.clickNum)
        this.clickNum[index+1].isCur = true;
        if( index == 0 ) { //分类
          this.curScreen = 1;
          this.showLayer = true;
          if (this.ks.length > 0) { //已有不重新加载
            return;
          }
          oneType({app: this})
          .then(res=>{
              this.ks = res;

              twoType({app: this, data: {
                  parentTypeID: ''
              }})
              .then(res=>{
                let allSortData = [];

                for (let i = 0; i < res.length; i++) {
                  if( res[i].parentTypeID != 0 ){
                    allSortData.push(res[i]);
                  }
                }
                this.parentName = ''; //父级
                this.childSort = allSortData;
              })
              .catch(err=>{
                console.log('获取二级分类出错了, ', err)
              })
          })
          .catch(err=>{
            console.log('获取一级分类出错了,' ,err)
          })
        }else if( index == 1 ){ //品牌
          brandList({app: this})
            .then(res=>{
              if( res.success ){
                if(res.data.length == 0){
                  this.$Toast('没有更多数据!');
                  return false;
                }
                this.brandList = res.data;
              }
            })
            .catch(function(err){
              console.log(err)
            })
          this.curScreen = 2;
          this.showLayer = true;
        }else if( index == 2 ){ //价格
          this.curScreen = 3;
          this.showLayer = true;
        }else if( index == 3 ){ //筛选
          this.curScreen = 4;
        }
      },
      //筛选是否进口
      btnImport ( data ){
        if( data == 1 ){
          this.isImported = 1;
        }else{
          this.isImported = 0;
        }
      },
      //选中的剂型
      btnJx ( jxitem, index ){
        this.isJx = jxitem.id;
      },
      //重置筛选
      resetSolt (){
        this.isImported = this.isJx = this.jxName = '';
        this.page = 1;
        this.getProduct();
      },
      //确认筛选
      confirmSolt (){
        const _self = this;

        if( this.isImported === '' && this.isJx === '' ){
          return false;
        }

        for ( let i in this.jx ) {
          if( i == (this.isJx-1) ){
            _self.jxName = this.jx[this.isJx-1].jxName;
            break;
          }
        }

        this.page = 1;
        // this.$options.methods.getProduct( this );
        this.getData();
        //标志有筛选
        this.clickNum[4].isCur = this.clickNum[4].isData = true;
        // console.log(121231)
      },
      //重置品牌
      resetBrand (){
        this.curBrandIndex = this.curBrandId = '';
        this.page = 1;
        this.getProduct();
        this.$options.methods.ComCloseLayer( this );
      },
      //确认品牌
      confirmBrand (){
        const _self = this;

        if( this.curBrandIndex === '' && this.curBrandId === '' ){
          return false;
        }
        this.getData();
        //标志有选品牌
        this.clickNum[2].isCur = this.clickNum[2].isData = true;
        // this.page = 1;
        // this.showLoadAnimate = true;
        // this.$options.methods.getProduct( this );
        // this.curScreen = '';
        // this.isUnscRollable = false;
        // this.showLayer = false;
      },
      //确认价格筛选
      confirmPrice (){
        var checkNum = /^\d+$/;
        if( !checkNum.test(this.minPrice) || !checkNum.test(this.maxPrice) ){
          this.$Toast('请填写正确的价格区间!');
          return false;
        }
        if( this.minPrice >= this.maxPrice ){
          this.$Toast('请填写正确的价格区间!');
          return false;
        }

        this.getData();
        //标志有选价格区间
        this.clickNum[3].isCur = this.clickNum[3].isData = true;
        // this.page = 1;
        // this.showLoadAnimate = true;
        // this.$options.methods.getProduct( this );
        // this.clickNum = '';
        // this.isUnscRollable = false;
        // this.curScreen = '';
        // this.showLayer = false;
      },
      // 点击查看下级分类
      nextSort ( item, index ){
        const _self = this;
        var parentTypeId = item.productTypeID;
        //清空已选的分类
        this.curRightSort = '',//当前选中的分类
        this.productTypeID = '',//当前分类ID

        this.curKs = index+1; //当前科室


        if( item == 'allSort' ){
          //全部分类
          this.curKs = 0;
          parentTypeId = '';

          //获取全部二级分类
          twoType({app: this, data: {
              parentTypeID: parentTypeId
            }}).then((res)=>{
            // console.log('全部二级: ', res)
            var allSortData = [];
            for (let i = 0; i < res.length; i++) {
              if( res[i].parentTypeID != 0 ){
                allSortData.push(res[i]);
              }
            }
            this.parentName = ''; //父级
            this.childSort = allSortData;
          });
          return false;
        }

        twoType({app: this, data: {
            parentTypeID: parentTypeId
          }}).then((res)=>{
          // console.log('获取二级: ', res)
          this.parentName = item.productTypeName; //父级
          this.childSort = res;
        });
        // console.log(this.curKs,index)
      },
      //点击2级分类搜索
      searchSort(cs,index) {
        // var parentTypeId = cs.parentTypeID;//父级ID
        var parentTypeId = '';//父级ID

        this.curRightSort = (index+1);
        this.productTypeID = cs.productTypeID;//选中的分类ID

        //全部二级分类
        if( cs == 'allSort' ){
          this.curRightSort = 0;
          //全部分类-全部
          if( this.curKs === 0 ){
            // console.log('全部分类-全部')
            this.curRightSort = 0;
            this.parentTypeId = this.productTypeID = '';//全部父级分类

            // console.log('allSort里： ', this.productTypeID, parentTypeId)
            this.getData();
            //标志有分类
            this.clickNum[1].isCur = this.clickNum[1].isData = false;
            return false;
          }else{
            // console.log('全部分类-全部xx科室分类')
            parentTypeId = this.ks[this.curKs-1].productTypeID;//当前科室的id
            // console.log('全部分类-对应的科室',parentTypeId)
            this.parentTypeId = parentTypeId;
          }
        }

        this.getData();
        //标志有分类
        this.clickNum[1].isCur = this.clickNum[1].isData = true;
      },
      // 跳到商品详情页
      // jumpDetail ( lt,index ){
      // 	// this.$router.push({ path: '/product_detail', query: {proid: lt.productNumber} });
      // 	window.location.href = '/mpros/'+ lt.productNumber +'.html';
      // },
      //关闭遮罩
      closeLayer (){
        this.isUnscRollable = false;
        // this.clickNum = '';//清空筛选样式
        for(var i in this.clickNum) {
          // console.log(i,":",this.clickNum[i])
          if( !this.clickNum[i].isData ){
            this.clickNum[i].isCur = false;
          }
        }

        this.curScreen = '';//关闭筛选
        this.showLayer = false;
      },
      ComCloseLayer ( _self ){
        _self.isUnscRollable = false;
        for(var i in _self.clickNum) {
          if( !_self.clickNum[i].isData ){
            _self.clickNum[i].isCur = false;
          }
        }
        _self.curScreen = '';//关闭筛选
        _self.showLayer = false;
      },
      // 后退
      goBack (){
        this.$router.go(-1);
      },
      //确定按钮
      btnSave (){
        console.log('点击确定')
      },
      //获取数据
      getData (){
        this.page = 1; //重置页数
        this.showLoadAnimate = true;//显示加载动画
        this.getProduct();//获取数据
        this.curScreen = '';//关闭当前筛选
        this.isUnscRollable = false;
        this.showLayer = false;
      },
      //获取产品列表
      getProduct (){
        var parentTypeId = this.parentTypeId;

        if(this.flag)return false;
        if( !parentTypeId ){
          parentTypeId = '';
        }

        this.flag = true;
        productList({
          app: this,
          data: {
            page: this.page,
            limit: this.limit,
            productName: this.searchCon, //产品名称
            isImport: this.isImported, //是否进口
            productDrugType: this.jxName, // 剂型
            brandId: this.curBrandId, //品牌
            lowestPrice: this.minPrice,//最低价格
            highest: this.maxPrice,//最高价格
            productType_one: parentTypeId,
            productType_two: this.productTypeID,
            sysNo: 'wap',//终端
          }
        })
          .then((res)=>{
            // console.log('res: ',res)
            if( res.success ){
              if( res.data.length == 0 ){
                this.$Toast('没有更多数据!');
              }
              this.lists.count = res.count;
              this.lists.list = [];
              setTimeout(()=>{
                 for(let val of res.data){
                   this.lists.list.push(val)
                 }
              },300);
            }else {
              this.$Toast(res.msg);
            }
            this.flag = false;
            setTimeout(()=>{
              this.showLoadAnimate = false;
            },500);
          })
          .catch((err)=>{
            console.log(err)
          });
      },



    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    background-color: #f0f0f0;
  }

  .wrap_in {
    height: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-top: 2.8125rem;
  }

  .has_header_wrap {
    padding-top: 0;
  }

  /* product_in */
  .product_in {
    background-color: #fff;
    height: 100%;
  }
  /* .product_in>div:not(:nth-last-child(1)), .product_in>div:not(:nth-last-child(2)) {
      position: relative;
      z-index: 2;
  } */
  .product_in>div:not(:nth-last-child(1)) {
    position: relative;
    z-index: 2;
  }

  /* search_top */
  .search_top {
    top: 0;
    width: 100%;
    max-width: 640px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 0.03125rem solid #dadada;
    background-color: #fff;
    position: relative;
    z-index: 2;
  }
  .search_top>form {
    height: 1.1875rem;
    line-height: 1.1875rem;
    align-items: center;
  }
  .search_top>form>input {
    width: 8.1875rem;
    height: 0.9375rem;
    line-height: normal;
    border: 0;
    background-color: #f0f0f0;
    border-radius: 0.46875rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-left: 0.875rem;
    padding-right: 0.46875rem;
    color: #a7a7a7;
    background-image: url(~assets/images/icon_search.png);
    background-repeat: no-repeat;
    -webkit-background-size: 0.40625rem auto;
    background-size: 0.40625rem auto;
    background-position: 0.25rem center;
  }
  .search_top>form>input::-webkit-input-placeholder {
    color: #a7a7a7;
  }
  .search_top>form>input::-moz-placeholder {
    color: #a7a7a7;
  }
  .search_top>form>input:-ms-input-placeholder {
    color: #a7a7a7;
  }
  .search_top>form>input:-moz-placeholder {
    color: #a7a7a7;
  }
  .search_top>form>button {
    width: 1.1875rem;
    padding: 0;
    border:0;
    color: #555;
    background-color: transparent;
    text-align: right;
  }

  /* screens */
  /*.screens {*/
    /*position: fixed;*/
    /*top: 1.21875rem;*/
    /*width: 100%;*/
    /*box-sizing: border-box;*/
  /*}*/
  .screens {
    position: relative;
    z-index: 2;
  }
  .screens .lists {
    overflow: hidden;
    border-bottom: 0.03125rem solid #dadada;
    height: 1.5625rem;
    line-height: 1.5625rem;
    background-color: #fff;
  }
  .screens .lists a {
    width: 25%;
    text-align: center;
    font-size: 0.4375rem;
    color: #555;
  }
  .screens .lists a.cur {
    color: #0f904e;
  }
  .screens .lists a>span {
    position: relative;
    margin-right: 0.15625rem;
  }
  .screens .lists a>i {
    display: inline-block;
    width: 0.1875rem;
    height: 0.1875rem;
    vertical-align: middle;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-right: 1px solid #a7a7a7;
    border-bottom: 1px solid #a7a7a7;
    transform: translateY(-0.03125rem) rotate(45deg);
    transition: transform 0.3s ease-out;
  }
  .screens .lists a.cur:not(:last-child)>i {
    border-color: #0f904e;
    transform: rotate(225deg);
  }
  .screens .lists .screen_a>i {
    background-image: url(~assets/images/icons_product.png);
    background-repeat: no-repeat;
    width: 0.46875rem;
    height: 0.46875rem;
    transform: translateY(0) rotate(0);
    border: 0;
    background-position: -0.75rem -0.75rem;
    -webkit-background-size: 1.9375rem auto;
    background-size: 1.9375rem auto;
  }
  /* all_solt */
  .all_solt {
    position: absolute;
    top: 1.59375rem;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 100vh;
    padding-bottom: 2.8125rem;
    box-sizing: border-box;
  }
  .all_solt .left {
    width: 3.75rem;
    height: 100%;
    overflow: scroll;
  }
  .all_solt .left dl>* {
    background-color: #f0f0f0;
    font-size: 0.4375rem;
    color: #555;
    height: 1.25rem;
    line-height: 1.25rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 0.5rem;
    padding-right: 0.3125rem;
  }
  .all_solt .left dd {
    border-top: 0.03125rem solid #dadada;
  }
  .all_solt .left dd:nth-of-type(1) {
    border-top: 0;
  }
  .all_solt .left dd.cur {
    background-color: #fff;
  }
  .all_solt .right {
    width: 6.25rem;
    height: 100%;
    overflow: scroll;
  }
  .all_solt .right dl {
    padding-left: 0.3125rem;
    background-color: #fff;
  }
  .all_solt .right dl>* {
    height: 1.25rem;
    line-height: 1.25rem;
    background-color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.4375rem;
    color: #555;
  }
  .all_solt .right dd {
    border-top: 0.03125rem solid #dadada;
  }
  .all_solt .right dd:nth-of-type(1) {
    border-top: 0;
  }
  .all_solt .right dd.cur {
    color: #0f904e;
  }

  /* brand_solt */
  .brand_solt {
    padding: 0.3125rem 0 0 0;
    background-color: #fff;
    position: absolute;
    top: 1.59375rem;
    left: 0;
    width: 100%;
  }
  .brand_solt .top {
    padding: 0.375rem 0.78125rem;
    overflow: scroll;
    height: 6.25rem;
    box-sizing: border-box;
  }
  .brand_solt a {
    width: 2.5rem;
    height: 0.875rem;
    line-height: 0.8125rem;
    text-align: center;
    font-size: 0.375rem;
    color: #555;
    border: 0.03125rem solid #555;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    float: left;
    margin: 0 0.46875rem 0.46875rem 0;
    border-radius: 0.0625rem;
    overflow: hidden;
  }
  .brand_solt a.cur {
    color: #f08200;
    border: 0.03125rem solid #f08200;
  }
  .brand_solt a:nth-of-type(3n) {
    margin-right: 0;
  }
  .brand_solt .bottom {
    border-top: 0.03125rem solid #f0f0f0;
    padding: 0.3125rem 0.78125rem;
    width: 100%;
    box-sizing: border-box;
  }
  .brand_solt .bottom button {
    width: 3.90625rem;
    height: 0.875rem;
    line-height: 0.8125rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 0.09375rem;
    padding: 0;
  }
  .brand_solt .bottom button:nth-of-type(1) {
    border:1px solid #555;
    color: #555;
    background-color: #fff;
  }
  .brand_solt .bottom button:nth-of-type(2) {
    border:1px solid #f08200;
    background-color: #f08200;
    color: #fff;
  }

  /* price_solt */
  .price_solt .center {
    border-top: 0.03125rem solid #f0f0f0;
    padding: 0.375rem 0.78125rem;
    font-size: 0;
  }
  .price_solt .center>* {
    font-size: 0.375rem;
  }
  .price_solt .center>input {
    background-color: #f0f0f0;
    color: #a7a7a7;
    width: 2.5rem;
    height: 0.875rem;
    padding:0 0.1875rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 0;
    border-radius: 0.0625rem;
  }
  .price_solt .center>input:nth-of-type(2) {
    margin-left: 0.125rem;
  }
  .price_solt .center>span {
    padding-left: 0.125rem;
  }
  .price_solt .bottom button:first-child {
    width: 100%;
    background-color: #f08200;
    border-color: #f08200;
    color: #fff;
  }

  /* detail_solt */
  .detail_solt {
    position: absolute;
    z-index: 2;
    top: -40px;
    right: 0;
    background-color: rgba(0, 0, 0, .2);
    width: 100%;
    height: 100vh;
  }
  .detail_solt .top {
    background-color: #fff;
    width: 7.5rem;
    position: absolute;
    right: 0;
    padding: 0.3125rem 0 0.3125rem 0.3125rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow-y: scroll;
    height: 100%;
  }
  .detail_solt .item {
    border-bottom: 0.03125rem solid #dadada;
    margin-bottom: 0.375rem;
  }
  .detail_solt .top h3 {
    height: 0.875rem;
    font-size: 0.4375rem;
    font-weight: normal;
    padding-right: 0.3125rem;
  }
  .detail_solt .top h3>span {
    display: block;
    position: relative;
  }
  .detail_solt .top h3>span::after {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid #a7a7a7;
    border-left: 0;
    border-top: 0;
    transform: translate(-2px, 4px) rotate(45deg);
    transform-origin: bottom;
    transition: transform 0.3s ease-out;
  }
  .detail_solt .top h3.cur>span::after {
    transform: rotate(225deg);
  }
  .detail_solt .top ul {
    overflow: hidden;
    padding: 0.375rem 0;
  }
  .detail_solt .top li {
    float: left;
    width: 2.1875rem;
    height: 0.875rem;
    line-height: 0.8125rem;
    border: 0.03125rem solid #555;
    color: #555;
    text-align: center;
    border-radius: 0.0625rem;
    margin-right: 0.15625rem;
    margin-bottom: 0.15625rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .detail_solt .top li:last-child {
    margin-right: 0;
  }
  .detail_solt .top li.cur {
    color: #f08200;
    border-color: #f08200;
  }
  .detail_solt .btns {
    position: fixed;
    bottom: 0;
    width: 7.5rem;
    margin-left: -0.3125rem;
    height: 1.375rem;
    line-height: 1.375rem;
  }
  .detail_solt .btns button:nth-of-type(1) {
    height: 1.375rem;
    border: 0;
    border-top: 1px solid #dadada;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 2.8125rem;
    background-color: #fff;
  }
  .detail_solt .btns button:nth-of-type(2) {
    height: 1.375rem;
    border: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 4.6875rem;
    background-color: #f08200;
    color: #fff;
  }

  /* product_lists */
  .product_lists {
    z-index: 1;
    background-color: #fff;
    overflow-y: scroll;
  }
  .product_lists ul {
    overflow-y: scroll;
  }
  .product_lists li {
    border-bottom: 0.03125rem solid #f0f0f0;
    padding: 0.3125rem;
  }
  .product_lists .list_img {
    /*width: 3.125rem;
      height: 3.125rem;*/
    width: 3.0rem;
    height: 3.0rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 0.03125rem solid #f0f0f0;
  }
  .product_lists .list_info {
    /*width: 6.25rem;*/
    width: 6.25rem;
    padding-left: 0.15625rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .product_lists .list_info>h2 {
    font-size: 0.40625rem;
    font-weight: normal;
    line-height: 0.5rem;
  }
  .product_lists .list_info>span {
    color: #b2b2b2;
    font-size: 0.34375rem;
    padding: 0.125rem 0 0.1875rem;
    display: block;
    min-height: 0.9375rem;
    box-sizing: border-box;
  }
  .product_lists .list_info>h2>i {
    display: inline-block;
    vertical-align: middle;
    height: 0.5rem;
    width: 1.5rem;
    background-image: url(~assets/images/icons_product.png);
    -webkit-background-size: 1.9375rem auto;
    background-size: 1.9375rem auto;
    background-repeat: no-repeat;
  }
  .product_lists .list_info>h2 .OTC-1 {
    background-position: -0.28125rem -1.90625rem;
  }
  .product_lists .list_info>h2 .OTC-2 {
    background-position: -0.28125rem -3.0625rem;
  }
  .product_lists .list_info>h2 .RX {
    background-position: -0.28125rem -4.21875rem;
  }
  .product_lists .list_info>h3 {
    font-size: 0.40625rem;
  }
  .product_lists .activitys {
    font-size: 0;
    margin-top: 0.1875rem;
  }
  .product_lists .activitys>span {
    font-size: 0.3125rem;
    color: #f08200;
    height: 0.5625rem;
    line-height: 0.5625rem;
    padding: 0 0.09375rem;
    border: 0.03125rem solid #f08200;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin-right: 0.125rem;
    border-radius: 0.0625rem;
  }
  .product_lists .activitys>span:last-child {
    margin-right: 0;
  }

  .icon_loading {
    text-align: center;
    height: 0.9375rem;
    line-height: 0.9375rem;
  }

  /* loadAnimate */
  #loadAnimate {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999999;
    background-color: rgba(0,0,0,.2);
    text-align: center;
  }
  #loadAnimate>div {
    width: 0.875rem;
    height: 0.875rem;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  /* layer */
  .layer {
    height: 100%;
    background-color: rgba(0,0,0,.2);
    position: fixed;
    width: 100%;
    max-width: 640px;
    z-index: 1;
    top: 0;
  }

</style>
