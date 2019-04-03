<template>
  <section class="wrap">
    <!-- 搜索框 -->
    <div class="search_fun">
      <div class="s_left">阿康</div>
      <div class="s_center" @click="jumpSearch"><input type="text" readonly><i></i></div>
      <div class="s_right">
        <!-- <router-link v-if="!$store.state.memberId" to="/login">登录</router-link> -->
        <!-- 已经登录的时候显示 -->
        <!-- <router-link v-if="$store.state.memberId" class="isLogin" to="/myinfo"></router-link> -->
        <router-link v-if="!isSignIn" to="/login" rel="nofollow">登录</router-link>
        <!-- 已经登录的时候显示 -->
        <router-link v-if="isSignIn" class="isLogin" to="/myinfo" rel="nofollow"></router-link>
      </div>
    </div>
    <!-- 搜索框 end -->

    <!-- 轮播图 -->
    <banners :list='banners'></banners>
    <!-- 轮播图 end -->

    <!-- 导航列表 -->

    <section class="navLeft">
      <ul class="d_flex">
        <li>
          <router-link to="/sort">
            <img v-lazy="require('~~/assets/images/navleft-qb.png')">
            <p>全部分类</p>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/symptom">
            <img v-lazy="require('~~/assets/images/navleft-zy.png')">
            <p>找药</p>
          </router-link>
        </li> -->
        <li>
          <router-link to="/zt/manb">
            <img v-lazy="require('~~/assets/images/navleft-mb.png')">
            <p>慢性病</p>
          </router-link>
        </li>
        <li>
          <router-link to="/zt/cmale">
            <img v-lazy="require('~~/assets/images/navleft-nx.png')">
            <p>男性频道</p>
          </router-link>
        </li>
        <li>
          <router-link to="/zt/injecta">
            <img v-lazy="require('~~/assets/images/navleft-zy.png')">
            <p>注射液专区</p>
          </router-link>
        </li>
        <li>
          <router-link to="/zt/cfemale">
            <img v-lazy="require('~~/assets/images/navleft-nr.png')">
            <p>女性频道</p>
          </router-link>
        </li>
        <li>
          <router-link to="/zt/crare">
            <img v-lazy="require('~~/assets/images/navleft-zx.png')">
            <p>罕见病</p>
          </router-link>
          <!-- <li>
            <router-link to="/order/all">
              <img v-lazy="'~~/assets/images/navleft-dd.png'">
              <p>我的订单</p>
            </router-link>
          </li> -->
        <li>
          <router-link to="/zt/coldchain">
            <img v-lazy="require('~~/assets/images/navleft-dd.png')">
            <p>冷链专区</p>
          </router-link>
        </li>
        <li>
          <router-link to="/member">
            <img v-lazy="require('~~/assets/images/navleft-gr.png')">
            <p>个人中心</p>
          </router-link>
        </li>
      </ul>
    </section>
    <!-- 导航列表 end -->

    <!-- 资讯 -->
    <news-block :artLists="artLists"></news-block>
    <!-- 资讯 end -->

    <!-- 阿康推荐 -->
    <floor-ak :akRecommend="akProDetails"></floor-ak>
    <!-- 阿康推荐 end -->

    <!-- 楼层广告图 -->
    <floor-adv :floorAdv1="floorAdv1"></floor-adv>
    <!-- 楼层广告图 end -->

    <!-- 楼层商品推荐 -->
    <floor-recoms
      :personalRecom="personalRecom"
      :manPage="manPage"
      :healthyPage="healthyPage"
      :malePage="malePage"
      :femalePage="femalePage"></floor-recoms>
    <!-- 楼层商品推荐 end -->

  </section>
</template>

<script>
import { mapState } from 'vuex'
import { searchAdvs, searchSt, getStDetail } from '@/api/recommend/'
import { getArtById } from '@/api/article/'
import { getProductByProductNumber } from '@/api/product/'
import banners from '@/components/index/banners'
import newsBlock from '@/components/index/news'
import floorAk from '@/components/index/floorAk'
import floorAdv from '@/components/index/floorAdv'
import floorRecoms from '@/components/index/floorRecoms'
import { curDate } from '~~/utils/utils.js'

export default {
  async asyncData ({app, params}){
    let banners = '', artLists = [], floorAdv1 = [];
    let akStFloor = [], personalSt = [], manSt = [], healthySt = [], maleSt = [], femaleSt = [];//阿康商品推荐楼层
    let akStList = [], personalList = [], manList = [], healthyList = [], maleList = [], femaleList = [];//阿康推荐商品列表
    let akProDetails = [];//商品推荐-商品列表详细
    let personalRecom = [], manPage = [], healthyPage = [], malePage = [], femalePage = [];//楼层商品推荐

    await Promise.all([
      searchAdvs({app, data: {
          endDate: curDate,
          pageNo: 'wapBanners',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      getArtById({app, data: {
        parentTypeID: 21,
        page: 1,
        limit: 5}}).catch(err=>{console.log('获取数据出错了: ', err)}),
      searchSt({app, data: {
          endDate: curDate,
          pageNo: 'akRecommend',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      searchAdvs({app, data: {
          endDate: curDate,
          pageNo: 'floorAdv1',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      searchSt({app, data: {
          endDate: curDate,
          pageNo: 'personalRecom',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      searchSt({app, data: {
          endDate: curDate,
          pageNo: 'manPage',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      searchSt({app, data: {
          endDate: curDate,
          pageNo: 'healthyPage',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      searchSt({app, data: {
          endDate: curDate,
          pageNo: 'malePage',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      searchSt({app, data: {
          endDate: curDate,
          pageNo: 'femalePage',
          isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
    ])
      .then(res=>{
        // console.log(111222, res)
        //banner
        if(res[0].data && res[0].data.length>0){
          banners = res[0].data;
        }else{console.log('banner模块无数据')}
        //文章
        if( res[1].code == 0 && res[1].data.length>0 ){
          for(let val of res[1].data){
            artLists.push(val);
          }
        }else{
          console.log('文章模块无数据');
        }
        //阿康推荐
        if( res[2].success && res[2].data.length>0 ){
          for( let val of res[2].data ){
            akStFloor.push(val);
          }
        }
        //楼层广告图
        if( res[3].success && res[3].data.length>0 ){
          for(let val of res[3].data){
            floorAdv1.push(val);
          }
        }
        //个人推荐
        if( res[4].success && res[4].data.length>0 ){
          for( let val of res[4].data ){
            personalSt.push(val);
          }
        }
        //慢病推荐
        if( res[5].success && res[5].data.length>0 ){
          for( let val of res[5].data ){
            manSt.push(val);
          }
        }
        //健康推荐
        if( res[6].success && res[6].data.length>0 ){
          for( let val of res[6].data ){
            healthySt.push(val);
          }
        }
        //男科推荐
        if( res[7].success && res[7].data.length>0 ){
          for( let val of res[7].data ){
            maleSt.push(val);
          }
        }
        //女科推荐
        if( res[8].success && res[8].data.length>0 ){
          for( let val of res[8].data ){
            femaleSt.push(val);
          }
        }
      })
      .catch(err=>{
        console.log('首页获取错误了, ', err)
      });

    await Promise.all([
      getStDetail({app, data: !akStFloor[0]?'':{
          endDate: curDate,
          showID: akStFloor[0].showID,
          isValid: 1
        }}),
      getStDetail({app, data: !personalSt[0]?'':{
          endDate: curDate,
          showID: personalSt[0].showID,
          isValid: 1
        }}),
      getStDetail({app, data: !manSt[0]?'':{
          endDate: curDate,
          showID: manSt[0].showID,
          isValid: 1
        }}),
      getStDetail({app, data: !healthySt[0]?'':{
          endDate: curDate,
          showID: healthySt[0].showID,
          isValid: 1
        }}),
      getStDetail({app, data: !maleSt[0]?'':{
          endDate: curDate,
          showID: maleSt[0].showID,
          isValid: 1
        }}),
      getStDetail({app, data: !femaleSt[0]?'':{
          endDate: curDate,
          showID: femaleSt[0].showID,
          isValid: 1
        }}),
    ])
      .then(res=>{
        // console.log(222, res)
        if( res[0] && res[0].success && res[0].data.length>0 ){
          for( let val of res[0].data ){
            akStList.push(val.productID);
          }
        }
        if( res[1] && res[1].success && res[1].data.length>0 ){
          for( let val of res[1].data ){
            personalList.push(val.productID);
          }
        }
        if( res[2] && res[2].success && res[2].data.length>0 ){
          for( let val of res[2].data ){
            manList.push(val.productID);
          }
        }
        if( res[3] && res[3].success && res[3].data.length>0 ){
          for( let val of res[3].data ){
            healthyList.push(val.productID);
          }
        }
        if( res[4] && res[4].success && res[4].data.length>0 ){
          for( let val of res[4].data ){
            maleList.push(val.productID);
          }
        }
        if( res[5] && res[5].success && res[5].data.length>0 ){
          for( let val of res[5].data ){
            femaleList.push(val.productID);
          }
        }
      })
      .catch(err=>{
        console.log('首页获取错误了-层2， ', err)
      })

    await Promise.all([
      getProductByProductNumber({app, data: !akStList[0]?'':{
          productNumbers: akStList,
        }}),
      getProductByProductNumber({app, data: !personalList[0]?'':{
          productNumbers: personalList,
        }}),
      getProductByProductNumber({app, data: !manList[0]?'':{
          productNumbers: manList,
        }}),
      getProductByProductNumber({app, data: !healthyList[0]?'':{
          productNumbers: healthyList,
        }}),
      getProductByProductNumber({app, data: !maleList[0]?'':{
          productNumbers: maleList,
        }}),
      getProductByProductNumber({app, data: !femaleList[0]?'':{
          productNumbers: femaleList,
        }}),
    ])
      .then(res=>{
        // console.log(333, res)
        if(res[0] && res[0].success && res[0].data.length>0){
          for(let val of res[0].data){
            akProDetails.push(val)
          }
        }
        if(res[1] && res[1].success && res[1].data.length>0){
          for(let val of res[1].data){
            personalRecom.push(val)
          }
        }
        if(res[2] && res[2].success && res[2].data.length>0){
          for(let val of res[2].data){
            manPage.push(val)
          }
        }
        if(res[3] && res[3].success && res[3].data.length>0){
          for(let val of res[3].data){
            healthyPage.push(val)
          }
        }
        if(res[4] && res[4].success && res[4].data.length>0){
          for(let val of res[4].data){
            malePage.push(val)
          }
        }
        if(res[5] && res[5].success && res[5].data.length>0){
          for(let val of res[5].data){
            femalePage.push(val)
          }
        }
      })
      .catch(err=>{
        console.log('首页获取错误了-层3， ', err)
      })

    return {
      banners,artLists,akProDetails,floorAdv1,personalRecom,manPage,healthyPage,malePage,femalePage
    }
  },
  data (){
    return {
      isSignIn: false,
      banners: [],
      artLists: [],
      akProDetails: [],
      floorAdv1: [],
      personalRecom: [],
      manPage: [],
      healthyPage: [],
      malePage: [],
      femalePage: [],
      list: [],
      asyncList: [],
      title: '阿康大药房'
    }
  },
  head (){
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  components: {
    banners,newsBlock,floorAk,floorAdv,floorRecoms,
  },
  computed: {
      ...mapState({
        num: state=>state.num
      }),
      ...mapState('userModule', {
        user: state=>state.user
      }),
  },
  mounted(){
    let a = 111;
    this.$Toast('提示信息');
    //"productNumbers":["1499","593","9246","501","2628","56919","3013","3103","2134","908","746","001","634636"]

  //   let akStList = [1499,593,9246]
  //   getProductByProductNumber({app: this, data: akStList})
  // .then(res=>{
  //   console.log(3337777, res)
  // })
  // .catch(err=>{
  //   console.log('出错了， ', err)
  // })

    this.$axios({
        url: '/product/getProductList',
        method: 'post',
        data: {
            page: 1,
            limit: 20,
            sysNo: 'wap'
        }
    })
    .then(res=>{
      console.log(321, res)
    })
    .catch(err=>{console.log(321,err)});
    
    // getPro({})
    // .then(res=>{
    //   console.log('获取列表: ', res)
    //   for(let val of res.data.data){
    //     this.list.push(val)
    //   }
    // })
    // .catch(err=>{
    //   console.log('出错了', err)
    // })

    this.$axios({
      url: '/seachAd',
      method: 'post',
      data: {
        endDate: curDate,
        pageNo: 'wapBanners',
        isValid: 1
      }
    })
      .then(res=>{
        console.log('banners: ', res.data)
      })
      .catch(err=>{
        console.log('获取banners出错了,', err)
      });
  },
  methods: {
    //跳转到通用搜索页
    jumpSearch (){
      this.$router.push({ path:'search', query:{id: '002'} });
    },
  }
}
</script>
<style>
  .wrap>section {
    padding: 10px;
    background-color: #fff;
  }
</style>
<style lang="scss" scoped>
  .search_fun {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 640px;
    height: 38px;
    line-height: 30px;
    z-index: 9;
    font-size: 14px;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: -webkit-linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0)); /* 标准的语法 */
    color: #fff;
    padding: 5px 10px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;

    .s_left {
      width: 40px;
      color: #fff;
    }
    .s_center {
      width: 208px;
      position: relative;

      input {
        width: 100%;
        height: 28px;
        padding: 0 18px 0 35px;
        margin: 0;
        border: 0;
        border-radius: 16px;
        background-color: rgba(255,255,255,0.66);
        font-size: 12px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -o-box-sizing: border-box;
        color: #a7a7a7;
        vertical-align: super;
      }
      i {
        position: absolute;
        background-image: url('~assets/images/icon_search.png');
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center;
        width: 14px;
        height: 14px;
        left: 14px;
        top: 50%;
        margin-top: -5px;
      }
    }
    .s_right {
      width: 40px;
      text-align: right;
      a {
        color: #fff;
        width: 40px;
        height: 100%;
        display: inline-block;
      }
    }
  }
  .isLogin {
    background-image: url('~assets/images/icons_index.png');
    background-repeat: no-repeat;
    /*-webkit-background-size: 2.65625rem auto;
      background-size: 2.65625rem auto;*/
    -webkit-background-size: 2.625rem auto;
    background-size: 2.625rem auto;
    /*background-position: -0.5rem -6.25rem;*/
    background-position: -0.5rem -6.18rem;
  }


  /* navLeft */
  .navLeft {
    border-bottom: 0.03125rem solid #f0f0f0;

    ul {
      padding: 5px 0;
      li {
        width: 25%;
        margin-bottom: 10px;
      }
      li:nth-child(n+5) {
        margin-bottom: 0;
      }
      li a img {
        width: 40px;
        margin: 0 auto;
      }
      li a p {
        padding-top: 4px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>
