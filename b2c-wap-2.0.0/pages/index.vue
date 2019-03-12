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
          <router-link to="/manb">
            <img v-lazy="require('~~/assets/images/navleft-mb.png')">
            <p>慢性病</p>
          </router-link>
        </li>
        <li>
          <router-link to="/c_male">
            <img v-lazy="require('~~/assets/images/navleft-nx.png')">
            <p>男性频道</p>
          </router-link>
        </li>
        <li>
          <router-link to="/injecta">
            <img v-lazy="require('~~/assets/images/navleft-zy.png')">
            <p>注射液专区</p>
          </router-link>
        </li>
        <li>
          <router-link to="/c_female">
            <img v-lazy="require('~~/assets/images/navleft-nr.png')">
            <p>女性频道</p>
          </router-link>
        </li>
        <li>
          <router-link to="/crare">
            <img v-lazy="require('~~/assets/images/navleft-zx.png')">
            <p>罕见病</p>
            </a>
          </router-link>
          <!-- <li>
            <router-link to="/order/all">
              <img v-lazy="'~~/assets/images/navleft-dd.png'">
              <p>我的订单</p>
            </router-link>
          </li> -->
        <li>
          <router-link to="/coldChain">
            <img v-lazy="require('~~/assets/images/navleft-dd.png')">
            <p>冷链专区</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myinfo">
            <img v-lazy="require('~~/assets/images/navleft-gr.png')">
            <p>个人中心</p>
          </router-link>
        </li>
      </ul>
    </section>
    <!-- 导航列表 end -->

    <!-- 资讯 -->
    <news-block></news-block>
    <!-- 资讯 end -->
  </section>
</template>

<script>
import { mapState } from 'vuex'
import banners from '@/components/index/banners'
import newsBlock from '@/components/index/news'
import { curDate } from '~~/utils/utils.js'

export default {
  async asyncData ({app, params}){
    let banners = '';

    await app.$axios({
      url: '/seachAd',
      method: 'post',
      data: {
        endDate: curDate,
        pageNo: 'wapBanners',
        isValid: 1
      }
    })
      .then(res=>{
        // console.log('banners: ', res.data)
        if(res.data && res.data.length>0){
          banners = res.data;
        }
      })
      .catch(err=>{
        console.log('获取banners出错了,', err)
      });

    return {
      banners: banners,
    }
  },
  data (){
    return {
      banners: '',
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
    banners,newsBlock,
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
}
</script>

<style lang="scss" scoped>
  .wrap>section:not(.banners) {
    padding: 12px;
    background-color: #fff;
  }

  .search_fun {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 640px;
    height: 45px;
    line-height: 32px;
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
    padding: 6px 10px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;

    .s_left {
      /*width: 1.375rem;*/
      width: 46px;
      color: #fff;
    }
    .s_center {
      width: 254px;
      position: relative;

      input {
        width: 100%;
        height: 32px;
        padding: 0 18px 0 35px;
        margin: 0;
        border: 0;
        border-radius: 16px;
        background-color: rgba(255,255,255,0.66);
        font-size: 0.34375rem;
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
        width: 16px;
        height: 16px;
        left: 14px;
        top: 50%;
        margin-top: -8px;
      }
    }
    .s_right {
      width: 46px;
      text-align: right;
      a {
        color: #fff;
        width: 46px;
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
      padding: 6px 0;
      li {
        width: 25%;
        margin-bottom: 12px;
      }
      li:nth-child(n+5) {
        margin-bottom: 0;
      }
      li a img {
        width: 45px;
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
