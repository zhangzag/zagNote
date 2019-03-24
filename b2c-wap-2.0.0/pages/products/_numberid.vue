<template>
  <section>
    <header class="mint-header d_flex prodel is-fixed header" ref="headFixedTop">
      <div
        @click="goBack"
        class="mint-header-button is-left">
        <button class="mint-button mint-button--default mint-button--normal">
          <span class="mint-button-icon">
            <i class="mintui mintui-back"></i>
          </span>
          <label class="mint-button-text"></label>
        </button>
      </div>
      <h1 class="mint-header-title">
        <div>
          <a
            v-for="(item, index) in headerTitle"
            :class="{ 'cur': index==curHeaderTitle }"
            @click="jumpSildePage(index)"
            href="javascript:void(0);" title="">{{item.name}}</a>
        </div>
      </h1>
      <div class="mint-header-button is-right" @click.prevent="showMore">
        <button class="mint-button mint-button--default mint-button--normal">
				<span class="mint-button-icon">
					<i class="mintui mintui-more"></i>
				</span>
          <label class="mint-button-text"></label>
        </button>
      </div>

      <!-- 更多 -->
      <mt-popup
        class="more_block"
        v-model="isShowMore"
        position="top">
        <router-link to="/index">首页</router-link>
        <router-link to="/sort">分类</router-link>
        <router-link to="/myinfo">个人中心</router-link>
      </mt-popup>
      <!-- 更多 end -->
    </header>
    <!-- 头部 end -->

    <div id="slideProduct" class="slide_product">
      <!-- 商品图片 -->
      <div class="pro_imgs">
        <div v-swiper:mySwiper="swiperOptionImg" ref="mySwiper-img" class="swiperBanners">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(pd,index) in productData.productPhotos" :key="index">
              <img preview="0" :src="pd.photoURL" :alt="productData.productName">
            </div>
          </div>
        </div>
        <div class="pro_imgs_pagination swiper-pagination"></div>
      </div>
      <!-- 商品图片 end -->
      <!-- 基础信息 -->
      <div class="base_info">
        <h2>
					<span class="f_left">
						<i v-show="productData.prescriptionType" :class="productData.prescriptionType | imgType"></i>{{ productData.productName }}
					</span>
          <span class="f_right"><i  :class="{is_collect: productData.isCollect}" @click="collection(productData)"></i></span>
        </h2>
        <span v-html="productData.sellingPoint"></span>

        <h2><span class="r_color">{{ productData.ourPrice | priceFilter }}</span><span>{{ productData.price | priceFilter }}</span></h2>
      </div>
      <div class="base_info_2">
        <p class="d_flex"><span>批准文号：</span><span>{{ productData.approvalNo?productData.approvalNo:'' }}<a href="javscript:;">（国家食药局查询）</a></span></p>
        <p class="d_flex"><span>生产厂家：</span><span>{{ productData.productFactory?productData.productFactory:'' }}</span></p>
      </div>
      <!-- 基础信息 end -->
      <!-- 承诺 -->
      <div class="promise d_flex">
        <span><i></i>100%正品</span>
        <span><i></i>药监认证</span>
        <span><i></i>厂家定点</span>
        <span><i></i>门店服务</span>
      </div>
      <!-- 承诺 end -->
      <!-- 处方药品购药流程图 -->
      <div class="cfyprocess">
        <img v-if="proAdvs.length<=0" src="~assets/images/process.jpg" alt="处方药品购药流程">

        <a v-else v-for="(item, index) in proAdvs" :href="item.advertisementUrl">
          <img :src="item.advertisementPhoto" >
        </a>
      </div>
      <!-- 处方药品购药流程图 end -->

      <!-- 优惠券 -->
      <div class="coupon block_one d_flex" @click="chooseCoupon" v-if="couponList.length>0">
        <div class="left">优惠券</div>
        <div class="right">
          <span v-for="(item, index) in couponList">{{item.couponactiveName}}</span>
        </div>
      </div>
      <!-- 优惠券 end -->
      <!-- 促销 暂时不要 -->
      <div v-if="false" class="sales d_flex">
        <div class="left">
          促销
        </div>
        <ul class="right">
          <li><span>秒杀</span>2月12日14：00开始</li>
          <li><span>买一送一</span>买一送一，送完即止</li>
        </ul>
      </div>
      <!-- 促销 end -->
      <!-- 规格 -->
      <div class="spec d_flex">
        <div class="left">
          规格
        </div>
        <ul class="right">
          <!-- 单规格 -->
          <li
            v-if="!productData.isMultSpec && productData.spec"
            v-text.trim="productData.spec">
          </li>
          <!-- 多规格 -->
          <li
            v-if="productData.isMultSpec"
            :class="{ cur: curMultIndex === index }"
            v-for="(pd,index) in productData.productDetailCode"
            @click="chooseMultiSpec(pd,index)">{{ pd.propertyAndValue }}</li>
        </ul>
      </div>
      <!-- 规格 end -->
      <!-- 数量 -->
      <div class="nums d_flex" v-show="singleCombos.singleComboList.length<=0">
        <div class="left">
          数量
        </div>
        <div class="right num_count">
          <button @click="numReduce"></button>
          <input type="text" v-model.trim="num">
          <button @click="numAdd"></button>
        </div>
      </div>
      <!-- 数量 end -->
      <!-- 添加药师微信号 暂时不要 -->
      <!-- <div class="wx d_flex">
                <div class="left">
                    <i class="iconfont icon-weixin"></i>添加药师微信号：
                </div>
                <div class="right">
                    <strong>akdyf001</strong>
                </div>
            </div> -->
      <!-- 添加药师微信号 end -->
      <!-- 疗程装 -->
      <mt-cell title="疗程装" v-show="singleCombos.singleComboList.length>0"></mt-cell>
      <div class="cure_list" v-show="singleCombos.singleComboList.length>0">
        <ul>
          <li
            ref="cureListItem"
            :class="{cur : curCure>=item.qty&&curCure<=item.qtyEnd}"
            :data-ikey="index"
            @click="selectCure(item, index)"
            v-for="(item,index) in singleCombos.singleComboList"
            v-text="item.detailpackageName">
          </li>
        </ul>

        <div class="cure_count">
          <div class="left f_left">
            <div class="cure_all"><span>合计</span><strong>{{ singleComboAllPrice.allPrice | priceFilter }}</strong></div>
            <div class="cure_discount"><span>优惠</span><span>{{ singleComboAllPrice.discount | priceFilter }}</span></div>
          </div>
          <div class="right f_right num_count">
            <button @click="numReduce"></button>
            <input type="text" v-model.trim="num">
            <button @click="numAdd"></button>
          </div>
        </div>
      </div>
      <!-- 疗程装 end -->
      <!-- 套餐商品 有套餐时才显示 -->
      <div class="union" v-if="unionData.length>0">
        <!-- <mt-cell to="Union_detail" title="联合用药" value="查看药品清单" is-link></mt-cell> -->
        <div class="union_tab">
          <swiper class="union_tab_item" :options="swiperUnion" ref="UnionSwiper" @someSwiperEvent="callback">
            <swiper-slide v-for="(item,index) in unionData" :key="index" :class="{ cur: swiperUnion.curTab==(index+1) }" @click.native="selectUnionTab(index+1)">{{ item.packageName }}</swiper-slide>
          </swiper>
        </div>
        <div class="suggest">
          <div class="icon"><i class="iconfont icon-yisheng"></i></div>
          <div class="suggest_con" :class="{ cur: swiperUnion.curTab==(index+1) }" v-for="(item,index) in unionData">
            <h3>药师点评：</h3>
            <p ref="sugcon">{{ item.useDesc?item.useDesc:'暂无点评!' }}</p>
            <p class="showsug" @click="showMoreSuggest(index)" ref="moreSugBtn">展开</p>
          </div>
        </div>
        <div class="union_info d_flex" v-for="(item,index) in unionData" v-show="swiperUnion.curTab===(index+1)" :t-curTab="swiperUnion.curTab" :t-index="index+1" >
          <div class="img">
            <!-- <img :src="item.photodURL | photoFilter" :alt="item.packageName"> -->
            <img v-lazy="item.photodURL" :alt="item.packageName">
          </div>
          <div class="right">
            <a :href='"#/Union_detail?packageId="+item.packageID'><i></i>{{ item.packageName }}</a>
            <div class="d_flex">
              <div class="price">
                <span>{{ item.oldCost | priceFilter }}</span>
                <h3 class="r_color">{{ item.afterBenefitCost | priceFilter }}</h3>
              </div>
              <div class="btn_union">
                <router-link :to="{path: '/utoregister', query: { packageId:item.packageID }}">提交需求</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 套餐商品 有套餐时才显示 end -->
      <!-- 商品推荐 -->
      <div class="recommend" v-show="proRecommend.length>0">
        <h3>商品推荐</h3>
        <ul class="d_flex">
          <li v-for="pr in proRecommend" @click="jumpDetail(pr)">
            <img v-lazy="pr.productPhotos>0?pr.productPhotos[0].photoURL:''" :alt="pr.productName">
            <p>{{ pr.productName }}</p>
            <span>{{ pr.spec }}</span>
            <p><span class="r_color">￥{{ pr.ourPrice }}</span></p>
          </li>
        </ul>
      </div>
      <!-- 商品推荐 end -->
      <!-- </swiper-slide> -->
      <!-- <swiper-slide id="slideDetail"> -->
      <div class="slide_detail" id="slideDetail">
        <div class="block-2">
          <h3>产品展示</h3>
          <div class="block-2-imgs" v-html="productData.remark">
            <!-- 产品图片 -->
          </div>
        </div>
      </div>
      <!-- </swiper-slide> -->
      <!-- <swiper-slide  > -->
      <div class="slide_instructions" id="slideInstructions">
        <h3>说明书</h3>
        <!-- 说明书 -->
        <div v-html="productData.instructions">

        </div>
      </div>
      <!-- </swiper-slide> -->
    </div>
    <!-- Optional controls -->
    <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- </swiper> -->
    <!-- 底部立即购买 -->
    <div class="options d_flex">
      <div class="left d_flex">
        <a id="tqchat2" href="javascript:void(0)" title="在线咨询" style="cursor: pointer;" @click="gaEvent( '在线咨询', '在线咨询', '在线咨询' )">在线咨询</a>
        <a href="tel:400-9309-990" @click="gaEvent( '电话咨询', '电话咨询', '电话咨询' )">电话咨询</a>
        <!-- <a href="javascript:;" :class="{is_collect: productData.isCollect}" @click="collection(productData)">收藏</a> -->
        <a href="javascript:;" @click="showEwm">家庭药师</a>
      </div>
      <div class="right">
        <!-- OTC 按钮 、非药品类 -->
        <!-- <button v-if="productData.prescriptionType !== 1" @click="btnBuy">立即购买</button>  -->
        <!-- OTC 按钮 end -->
        <!-- 处方药按钮 -->
        <!-- <button v-if="productData.prescriptionType === 1" @click="btnBuy(2)">登记需求</button> -->
        <!-- 处方药按钮 end -->
        <button @click="btnBuy(productData.prescriptionType)">{{ productData.prescriptionType | btnFilter }}</button>
      </div>
    </div>
    <!-- 家庭药师二维码 -->
    <img style="display:none;" ref="ysEwm" preview="1" src="~assets/images/ysewm.png" alt="阿康大药房旗舰店">
    <!-- 家庭药师二维码 end -->
    <!-- 底部立即购买 end -->
    </div>

  </section>
</template>

<script>
  import Vue from 'vue'
  import { gaEve, curDate } from '@/utils/utils.js'
  import { productInfo, addCollection, delCollection, getCoupon } from '@/api/product/'
  import { searchAdvs } from '@/api/recommend/'
  import 'swiper/dist/css/swiper.css'
  import { mapState } from 'vuex'

  if(process.browser){
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    const { Cell } = require('mint-ui')

    let preview = require('vue-photo-preview')['default'];
    require('vue-photo-preview/dist/skin.css');

    Vue.use(VueAwesomeSwiper)
    Vue.component(Cell.name, Cell);
    Vue.use(preview,{
      fullscreenEl:false, //关闭全屏按钮
      zoomEl: false, //关闭缩放按钮
      shareEl: true,
      shareButtons: [{id:'download', label:'保存图片', url:'{{raw_image_url}}', download:true}]
    });
  }

  export default {
    name: 'productDetail',
    layout: 'nofooter',
    async asyncData({app, params, route}){
      let productNumber = params.numberid || '', productData = '', proAdvs = [];

      // await productInfo({app, data: {
      //     productNumber,
      //     memberId: app.store.state.userModule.memberId || '',
      //   }})
      //   .then(res=>{
      //     // console.log('商品信息： ', res)
      //     if( res.success ) {
      //       productData = res.data;
      //       // _self.imgSrc = _self.webRoot + res.data.photodURL;
      //     }
      //   })
      await Promise.all([
        productInfo({app, data: {
            productNumber,
            memberId: app.store.state.userModule.memberId || '',
        }}).catch(err=>{console.log('获取商品信息出错了，', err)}),
        searchAdvs({app, data: {
            endDate: curDate,
            pageNo: 'proDetailAdvs',
            isValid: 1
        }}).catch(err=>{console.log('获取数据出错了: ', err)}),
      ])
        .then(res=>{
          if( res[0] && res[0].success ) {
            productData = res[0].data;
            // _self.imgSrc = _self.webRoot + res.data.photodURL;
          }
          // console.log(res[1])
          if( res[1] && res[1].success ){
            for(let val of res[1].data){
              proAdvs.push(val)
            }
          }
        })
        .catch(err=>{

        })

      // console.log('route: ', route)
      return {productNumber, productData, proAdvs}
    },
    data (){
      return {
        isShowMore: false, // 是否显示更多
        curHeaderTitle: 0, // 当前的Tab 0-商品，1-详情，2-说明书
        isUnscRollable: false, //是否页面不可滚动
        popupCoupons: false, //显示优惠券选择列表
        backParentPage: false, //是否回到父页面
        headerTitle: [
          { name: '商品', id: 0, },
          { name: '详情', id: 1 },
          { name: '说明书', id: 2 }
        ],
        swiperOption: {
          notNextTick: true,
          autoplay: 0,
          autoHeight: true,//wrapper和container会随着当前slide的高度而发生变化。
          loop: false,
          touchRatio:0.5,
          longSwipesRatio:0.1,
          threshold:20,
          followFinger:false,
          grabCursor : true,
          setWrapperSize :true,
          pagination : {
            el: '.title-swiper-pagination',
            clickable: true,
            clickableClass: 'tcp',
            renderBullet: function (index, className) {
              var headerTitle = [
                { name: '商品', id: 0, },
                { name: '详情', id: 1 },
                { name: '说明书', id: 2 }
              ];

              return '<a class="' + className + '">' + headerTitle[index].name + '</a>';
            },
            pagination: 'swiper-pagination-bullet',
            bulletActiveClass: 'my-bullet-active',
            bulletActiveClass : 'cur',
          },
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          on: {
            slideNextTransitionEnd: () => {
              document.documentElement.scrollTop = document.body.scrollTop = window.scrollY = 1;
              this.isStart = false;
            },
            slidePrevTransitionEnd: () => {
              document.documentElement.scrollTop = document.body.scrollTop = window.scrollY = 1;
              this.isStart = false;
              if( document.documentElement.scrollTop == 0 || document.body.scrollTop == 0 || window.scrollY == 0 ){
                //切换到上一页
                this.$refs.mySwiper.swiper.slidePrev(0);
              }
            },
            slideChange: () => {
              let curSlide = this.$refs.mySwiper.swiper;
              let activeIndex = curSlide.activeIndex;

              this.curSlideId = curSlide.slides[activeIndex].getAttribute('id');
              this.isStart = true;
            }
          },
          lazy: {
            loadPrevNext: true,
          },
        },
        swiperOptionImg: {
          autoplay: 0,
          observeParents:true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          nested: true, //用于嵌套相同方向的swiper时，当切换到子swiper时停止父swiper的切换
          pagination: { //使用分页导航
            el: '.pro_imgs_pagination',
            clickable :true,
          },
        },
        windowHeight: '', //窗口高度
        windowScrollHeight: '',// 商品页滚动多少到底部额高度
        curSlideId: 'slideProduct' ,//当前slide的id
        i: 0,
        timer: null,
        imgSrc: '',
        productNumber: '', //产品ID
        productData: '',//产品信息
        curMultIndex: '',//当前的多规格
        curMult: '',//当前多规格
        num: 1,//数量
        brandList: [],//品牌列表
        proRecommend: [],//商品推荐
        showDetailImgs: '',//详情图片
        //套餐商品Tab
        swiperUnion: {
          autoplay: false,
          slidesPerView : 2.6,
          slideToClickedSlide: true,
          curTab: 1,
        },
        unionData: [],//套餐商品
        curCure: 0,//默认不选择
        isStart: false,
        //疗程装
        singleCombos: {
          singleCombo: '',//套餐信息
          singleComboList: [],//详细
        },
        proAdvs: [],//中层广告图
        couponList: [],//优惠券
      }
    },
    filters: {
      //按钮过滤
      btnFilter ( data ){
        if( data === null ){
          return '立即购买';
        }
        if( !data ){
          return '';
        }

        if( data === 1 ){
          return '登记需求';
        }else if( data === 2 || data === 3 ){
          return '立即购买';
        };
      },
    },
    watch: {
      num (){
        var checkNum = /^[0-9]*[1-9][0-9]*$/;

        if( !checkNum.test(this.num) ){
          this.$options.methods.showToast('请填写正确的数量');
          return false;
        }

        //有套装疗程
        if( this.singleCombos.singleCombo ){
          this.curCure = this.num;
        }
      },
    },
    computed: {
      ...mapState('userModule', ['memberId', 'memberInfo']),
      // 得到当前的swiper对象，同时notNextTick必须为true
      swiper (){
        //获取 ref="mySwiper" 的swiper
        return this.$refs.mySwiper.swiper ;
      },
      activeIndexSlide(){
        return this.$refs.mySwiper.swiper.activeIndex ;
      },
      //产品图片
      showImg (){
        if(this.$data.productData){
          if( this.$data.productData.productPhotos.length >0 ){
            return 1
          }else{
            return 0;
          }
        }
      },
      //单一商品总价
      singleComboAllPrice (){
        const _self = this;
        let obj = {
          allPrice: '',
          discount: ''
        };

        if(this.singleCombos.singleComboList.length<=0 || this.curCure<=0){
          return obj;
        };

        let curData = '';

        for( let val of _self.singleCombos.singleComboList ){
          if( (_self.num>=val.qty)&&(_self.num<=val.qtyEnd) ){
            curData = val;
            break;
          }
        }

        obj = {
          allPrice: curData.price * _self.num,//疗程装合计
          discount: (_self.productData.ourPrice - curData.price) * _self.num,//疗程装优惠
        };
        return obj;
      },
    },
    mounted (){

      console.log('productData: ', this.productData)

      //筛选出通用优惠券
      getCoupon({
        app: this,
        data: {
          productId: '',// 商品的ID（查询当前商品是否存在优惠券）
          sysNo: 'wap',// 终端标识（wap，pc，表示请求终端）
        }
      })
        .then(res=>{
          if(!res.success){
            this.$Toast({
              message: res.msg,
              position: 'center',
              duration: 1500
            });
            return false;
          }
          if( res.data.length<=0 ){return}

          for( let val of res.data ){
            if(val.isAll){ //是通用券
              this.couponList.push(val)
            }
          }
          //商品优惠券
          getCoupon({
            app: this,
            data: {
              productId: productData.productID || '',// 商品的ID（查询当前商品是否存在优惠券）
              sysNo: 'wap',// 终端标识（wap，pc，表示请求终端）
            }
          })
            .then(res=>{
              if(!res.success){
                this.$Toast({
                  message: res.msg,
                  position: 'center',
                  duration: 1500
                });
                return false;
              }
              if( res.data.length<=0 ){return}

              for( let val of res.data ){
                if(val.isAll){ //是通用券
                  this.couponList.push(val)
                }
              }
            })
            .catch(err=>{
              console.log('获取优惠券出错了， ', err)
            })
        })
        .catch(err=>{
          console.log('获取优惠券出错了， ', err)
        })
    },
    methods: {
      // 点击切换silde tab
      jumpSildePage ( id ){
        this.curHeaderTitle = id;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight ;
        let docScrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        let slideHeight = document.getElementById('slideProduct').offsetHeight ;
        //标题高度
        let headFixedTop = this.$refs.headFixedTop.offsetHeight;

        switch ( id )
        {
          case 1:
            //详情
            let slideDetailTop = document.getElementById('slideDetail').offsetTop;

            document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = slideDetailTop-headFixedTop;
            break;
          case 2:
            //说明书
            let slideInstructionsTop = document.getElementById('slideInstructions').offsetTop;

            document.documentElement.scrollTop = document.body.scrollTop = window.pageYOFFset = slideInstructionsTop-headFixedTop;
            break;
          default :
            //商品
            document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = 0;
        }
      },
      //收藏
      collection (data) {
        // console.log(this.$route.fullPath)
        // return
        const _self = this;
        if( !this.memberId ){
          // _self.$options.methods.showToast('请先登录');
          this.$MsgBox.confirm('请先登录').then(action => {
            this.$router.push({
              path: '/login',
              query: {redirectUrl: this.$route.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }).catch( cancel => {
            console.log(cancel)
          } );
          return false;
        }

        if( this.flag ){return}

        //已收藏
        if( data.isCollect ){
          delCollection({app: this, data: {
              memberId: this.memberId,
              productId: data.productNumber,
              sysNo: 'WAP端'
          }})
            .then(res=>{
              if( res.success ){
                _self.productData.isCollect = false;
              }

              gaEve({eName:'点击"取消收藏"', eCate: '点击"取消收藏"-商品id: ' + data.productNumber, eType: res.success});
              this.$Toast(res.msg);
              this.flag = false;
            })
            .catch(err=>{
              console.log(err)
            })
          return false;
        }

        //收藏
        addCollection({app: this, data: {
            productID: data.productNumber,
            memberID: this.memberId,
            sysNo: 'WAP端'
        }})
          .then(res=>{

            gaEve({eName:'点击"收藏"', eCate: '点击"收藏"-商品id: ' + data.productNumber, eType: res.success});
            if( res.success ){
              this.productData.isCollect = true;
            }
            this.$Toast(res.msg);
            this.flag = false;
          })
          .catch(err=>{
            console.log(err)
            this.flag = false;
          })
      },
      //选择多规格
      chooseMultiSpec (pd,index){
        this.curMultIndex = index;
        this.curMult = pd;
      },
      //数量减少
      numReduce (){
        const _self = this;
        var checkNum = /^[0-9]*[1-9][0-9]*$/;
        if( this.num <= 1 ){
          return false;
        }else{
          if( !checkNum.test(this.num) ){
            this.$options.methods.showToast('请填写正确的数量');
            return false;
          }
          this.num--;
        }
      },
      //数量增加
      numAdd (){
        const _self = this;
        var checkNum = /^[0-9]*[1-9][0-9]*$/;
        if( this.num === 0 || !this.num ){
          this.num = 1;
        }else{
          if( !checkNum.test(this.num) ){
            this.$options.methods.showToast('请填写正确的数量');
            return false;
          }
          this.num++;
        }
      },
      //购买
      btnBuy ( id ){
        //id:1 - 处方药, id:2 - otc
        const _self = this;
        // 处方药
        if( id == 1 ){
          // gtag('event', '点击需求登记事件', {
          //   'event_category' : '点击需求登记的商品id: ' + this.productNumber
          // });
          gaEve({eName:'点击"需求登记"', eCate: '点击"需求登记"-商品id: ' + this.productNumber});

          //有疗程套装
          if( this.singleCombos.singleComboList.length>0 ){

            // let curData = '';

            // for( let val of _self.singleCombos.singleComboList ){
            // 	if( (_self.num>=val.qty)&&(_self.num<=val.qtyEnd) ){
            // 		curData = val;
            // 		break;
            // 	}
            // }

            this.$router.push({ path: '/toregister', query: { id: this.productNumber, num: this.num, curMultIndex: this.curMultIndex, packageId: this.singleCombos.singleCombo.packageID } });
            return false;
          }
          this.$router.push({ path: '/toregister', query: { id: this.productNumber, num: this.num, curMultIndex: this.curMultIndex } });
          return false;
        }

        // OTC
        // gtag('event', '点击提交订单事件', {
        //   'event_category' : '点击提交订单的商品id: ' + this.productNumber
        // });
        gaEve({eName:'点击"立刻购买"', eCate: '点击"立刻购买"-商品id: ' + this.productNumber});
        var productNumber = '';
        if( this.productData.isMultSpec ){ //开启多规格
          productNumber = this.curMult.detailCodeID; //是

          if( !productNumber ){
            _self.$options.methods.showToast( '请选择规格!' );
            _self.flag = false;
            return false;
          }
        }

        let singleComboInfo = '';
        //有疗程套装
        if( this.singleCombos.singleComboList.length>0 && this.curCure>0 ){
          let [...singList] = this.singleCombos.singleComboList;

          for( let val of singList ){
            // val.qty==this.curCure?(singleComboInfo=val):'';
            if(this.num>=val.qty&&this.num<=val.qtyEnd){singleComboInfo=val;break;}
          }
        }

        const proInfo = {
          orderId: this.productNumber,//产品ID
          num: this.num,//数量
          specId: productNumber,//规格ID 单规格不用传
          specName: this.curMult.propertyAndValue,//规格名称 单规格不用传
          proNmae: this.productData.productName,//商品名称
          productNumber: this.productData.productNumber,//商品编码
          singleComboInfo: singleComboInfo,//疗程套装信息
        };

        this.$store.commit('addBuyProductInfo', proInfo);
        sessionStorage.addBuyProductInfo = JSON.stringify( proInfo );
        // console.log(_self.$store.state.buyProductInfo);
        this.$router.push({ path: '/purchase'});
      },
      //确定按钮
      btnSave (){
        console.log('点击确定')
      },
      //选择疗程套装
      selectCure ( item, index ){
        if( this.num>=item.qty && this.num<=item.qtyEnd ){
          this.num = 1;
          this.curCure==1?this.curCure=0 : this.curCure=1;

          return false;
        }
        // this.curCure = itemId;
        // this.num = qty;
        this.curCure = this.num = item.qty;
      },
      //选择联合用药tab
      selectUnionTab (itemId){
        this.swiperUnion.curTab = itemId;
      },
      //药师点评展示或收起更多
      showMoreSuggest ( index ){
        let innerText = this.$refs.moreSugBtn[index].innerText;


        if( !this.$refs.sugcon[index].style.display || this.$refs.sugcon[index].style.display == '-webkit-box' ){
          this.$refs.sugcon[index].style.display = 'block';
        }else{
          this.$refs.sugcon[index].style.display = '-webkit-box';
        }
        innerText == '展开'?(this.$refs.moreSugBtn[index].innerText='收起') : (this.$refs.moreSugBtn[index].innerText='展开');
      },
      //显示药师二维码
      showEwm(){
        this.$refs.ysEwm.click()
      },
      //显示优惠券列表
      chooseCoupon (){
        this.popupCoupons = !this.popupCoupons;
      },
      //显示更多
      showMore (){
        this.isShowMore = true;
      },
      // 后退
      goBack (){
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped lang="scss">

  /* slide_product */
  .slide_product {
    /* height: 100vh; */
    margin-top: -1.25rem;
    padding-top: 1.25rem;
    box-sizing: border-box;
    background-color: #fff;
  }

  /* pro_imgs */
  .pro_imgs {
    height: 7.125rem;
    position: relative;
  }
  .pro_imgs img {
    width: 7.125rem;
    height: 7.125rem;
    margin: 0 auto;
  }
  .pro_imgs_pagination {
    bottom: 0.3125rem;
    width: 100% ;
  }

  /* base_info */
  .base_info {
    padding: 0.3125rem;
    border-bottom: 0.03125rem solid #f0f0f0;
  }
  .base_info>h2 {
    font-size: 0.5rem;
    color: #262626;
    font-weight: normal;
    line-height: 0.75rem;
    overflow: hidden;
  }
  .base_info>span {
    color: #e0081a;
    font-size: 0.375rem;
    line-height: 0.5rem;
    display: block;
    margin-bottom: 0.59375rem;
    padding-top: 0.12rem;
  }
  .base_info>h2>span:nth-of-type(1) {
    width: 7.81rem;
    padding-right: 0.31rem;
    box-sizing: border-box;
  }
  .base_info>h2>span:nth-of-type(1)>i {
    display: inline-block;
    vertical-align: middle;
    height: 0.5rem;
    width: 1.5rem;
    background-image: url(~assets/images/icons_product.png);
    -webkit-background-size: 1.9375rem auto;
    background-size: 1.9375rem auto;
    background-repeat: no-repeat;
  }
  .base_info>h2>.f_right {
    width: 1.56rem;
    height: 1.0rem;
    border-left: 0.03rem solid #ccc;
    box-sizing:border-box;
  }
  .base_info>h2>.f_right>i {
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(~assets/images/icons_product.png);
    background-repeat: no-repeat;
    -webkit-background-size: 1.9375rem auto;
    background-size: 1.9375rem auto;
    background-position: -0.09rem -9.03125rem;
  }
  .base_info>h2>.f_right>i.is_collect {
    background-position: -0.09rem -13.5rem;
  }
  .base_info>h2:nth-of-type(2) {
    font-weight: bold;
    font-size: 0.5625rem;
    margin-top: 0.59375rem;
  }
  .base_info>h2:nth-of-type(2) span:nth-of-type(2) {
    font-size: 0.375rem;
    color: #b2b2b2;
    text-decoration: line-through;
    font-weight: normal;
    padding-left: 0.375rem;
  }
  .base_info>h2 .OTC-1 {
    background-position: -0.28125rem -1.90625rem;
  }
  .base_info>h2 .OTC-2 {
    background-position: -0.28125rem -3.0625rem;
  }
  .base_info>h2 .RX {
    background-position: -0.28125rem -4.21875rem;
  }

  /* base_info_2 */
  .base_info_2 {
    padding: 0.375rem 0.3125rem;
    border-bottom: 0.03125rem solid #f0f0f0;
  }
  .base_info_2 p {
    font-size: 0.375rem;
  }
  .base_info_2 p:nth-of-type(1) {
    margin-bottom: 0.4375rem;
  }
  .base_info_2 p:nth-of-type(1) a {
    display: inline;
  }
  .base_info_2 p span:nth-of-type(1) {
    width: 2.125rem;
  }
  .base_info_2 p span:nth-of-type(2) {
    width: 7.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* promise */
  .promise {
    padding: 0 0.3125rem;
    height: 1.25rem;
    line-height: 1.25rem;
    background-color: #fafafa;
    font-size: 0.375rem;
    border-bottom: 0.3125rem solid #f0f0f0;
  }
  .promise i {
    display: inline-block;
    vertical-align: middle;
    width: 0.5625rem;
    height: 0.5625rem;
    background-image: url(~assets/images/icons_product.png);
    background-repeat: no-repeat;
    -webkit-background-size: 1.9375rem auto;
    background-size: 1.9375rem auto;
    background-position: -0.71875rem -5.375rem;
  }

  /* cfyprocess */
  .cfyprocess {
    border-bottom: 0.3125rem solid #f0f0f0;
  }

  /* sales */
  .sales {
    padding: 0.3125rem;
    border-bottom: 0.3125rem solid #f0f0f0;
  }
  .sales .left {
    width: 1.1875rem;
    line-height: 0.5625rem;
    font-size: 0.375rem;
  }
  .sales .right {
    width: 8.1875rem;
    line-height: 0.5625rem;
    font-size: 0.375rem;
  }
  .sales .right li {
    margin-bottom: 0.3125rem;
  }
  .sales .right li:last-child {
    margin-bottom: 0;
  }
  .sales .right li>span {
    font-size: 0.3125rem;
    color: #f08200;
    border: 0.03125rem solid #f08200;
    padding: 0 0.125rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: inline-block;
    height: 0.375rem;
    line-height: 0.3125rem;
    margin-right: 0.28125rem;
  }

  /* sales */
  .spec {
    padding: 0.3125rem 0.3125rem 0 0.3125rem;
  }
  .spec .left {
    width: 1.1875rem;
    line-height: 0.5625rem;
    font-size: 0.375rem;
  }
  .spec .right {
    width: 8.1875rem;
    line-height: 0.5625rem;
    font-size: 0.375rem;
  }
  .spec .right li {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    min-width: 2.5rem;
    height: 0.875rem;
    line-height: 0.8125rem;
    border: 0.03125rem solid #555;
    font-size: 0.375rem;
    text-align: center;
    float: left;
    margin: 0 0.3125rem 0.3125rem 0;
    border-radius: 0.0625rem;
    overflow: hidden;
    text-align: center;
    padding: 0 0.15625rem;
  }
  .spec .right li:nth-of-type(3n) {
    margin-right: 0;
  }
  .spec .right li.cur {
    border-color: #f08200;
    color: #f08200;
  }

  /* nums */
  .nums {
    padding: 0.3125rem ;
    border-top: 0.03125rem solid #f0f0f0;
    border-bottom: 0.03125rem solid #f0f0f0;
  }
  .nums .left {
    width: 1.1875rem;
    line-height: 0.5625rem;
    font-size: 0.375rem;
  }
  .num_count {
    width: 8.1875rem;
    line-height: 0.5625rem;
    text-align: right;
    font-size: 0;
  }

  .num_count>* {
    display: inline-block;
    vertical-align: middle;
  }
  .num_count>button {
    width: 0.6875rem;
    height: 0.6875rem;
    line-height: 0.625rem;
    text-align: center;
    border: 0.03125rem solid #555;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 0.0625rem;
    background-color: #fff;
    padding: 0;
    background-image: url(~assets/images/icons_product.png);
    background-repeat: no-repeat;
    -webkit-background-size: 1.9375rem auto;
    background-size: 1.9375rem auto;
    background-position: -0.65625rem -10.3125rem;
  }
  .num_count>button:nth-of-type(2) {
    background-position: -0.625rem -11.25rem;
  }
  .num_count>input {
    width: 1.65625rem;
    height: 0.6875rem;
    line-height: 0.625rem;
    text-align: center;
    border: 0.03125rem solid #555;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 0.0625rem;
    background-color: #fff;
    padding: 0;
    vertical-align: bottom;
    margin: 0 0.1875rem;
    font-size: 0.375rem;
  }

  /* wx */
  .wx.d_flex {
    justify-content: flex-start;
  }
  .wx {
    padding: 0.3125rem ;
    border-bottom: 0.3125rem solid #f0f0f0;
    border-top: 0.03125rem solid #f0f0f0;
  }
  .wx .left {
    /*width: 1.1875rem;*/
    line-height: 0.5625rem;
    font-size: 0.375rem;
    text-align: center;
  }
  .wx .left>i {
    margin:0 0.15rem;
  }
  .wx .right {
    /*width: 8.1875rem;*/
    line-height: 0.5625rem;
    text-align: left;
  }

  /* cure_list */
  .cure_list {
    padding: 0.3125rem 0.3125rem 0;
    border-bottom: 0.03125rem solid #f0f0f0;
  }
  .cure_list ul {
    overflow: hidden;
  }
  .cure_list li {
    float: left;
    border:1px solid #555;
    padding: 0.18rem;
    margin:0 0.3125rem 0.3125rem 0;
  }
  .cure_list li.cur {
    background-color: #fb7e35;
    color:#fff;
    border-color: #f3752c;
  }
  .cure_count {
    overflow: hidden;
    padding:0 0 0.3125rem 0;
  }
  .cure_count>div {
    width: 50%;
  }
  .cure_count>div>div {
    font-size: 0;
  }
  .cure_count>div>div>* {
    font-size: 0.4375rem;
    display: inline-block;
    vertical-align: middle;
  }
  .cure_count .cure_all>span {
    font-size: 0.4375rem;
    vertical-align: bottom;
  }
  .cure_count .cure_all>strong {
    font-size: 0.5rem;
    color: #e00000;
  }
  .cure_discount {
    padding-top: 0.125rem;
  }

  /* union */
  .union{
    border-bottom:0.3125rem solid #f0f0f0;
    padding-bottom: 0.4375rem ;
  }
  .union_tab {
    border-bottom: 0.03125rem solid #f0f0f0;
  }
  .union_tab .union_tab_item {
    height: 1.25rem;
    line-height: 1.25rem;
  }
  .union_tab .swiper-slide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 0.31rem;
    text-align: left;
  }
  .union_tab .swiper-slide.cur {
    color: #29b76f;
  }
  .union .union_info {
    padding: 0 0.3125rem;
  }
  .union .union_info>.img {
    height: auto;
    max-height: 3.125rem;
    width: 3.125rem;
    border: 0.03125rem solid #f0f0f0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: hidden;
  }
  .union .union_info>.right {
    width: 6.21rem;
    padding-left: 0.3125rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .union .union_info>.right>a {
    font-size: 0.40625rem;
    color: #262626;
    line-height: 0.625rem;
    font-weight: normal;
    text-align: justify;
    margin-bottom: 0.3125rem;
    background-image: url(~assets/images/arr_r1.png);
    background-repeat: no-repeat;
    background-position: right center;
    padding-right: 0.625rem;
  }
  .union .union_info>.right>a>i {
    display: inline-block;
    vertical-align: middle;
    height: 0.5rem;
    width: 1.71rem;
    background-image: url(~assets/images/icons_product.png);
    background-size: 1.9375rem auto;
    background-repeat: no-repeat;
    background-position: -0.1875rem -12.5rem;
  }
  .union .union_info>.right>div {
    align-items: center;
  }
  .union .union_info>.right>div .price {
    width: 3.46rem;
  }
  .union .union_info>.right>div .price span {
    text-decoration: line-through;
    font-size: 0.375rem;
    color: #a7a7a7;
    display: block;
  }
  .union .union_info>.right>div .price h3 {
    font-size: 0.5625rem;
  }
  .union .union_info>.right>div .btn_union {
    width: 2.43rem;
  }
  .union .union_info>.right>div .btn_union a {
    width: 2.43rem;
    height: 0.875rem;
    line-height: 0.8125rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: transparent;
    border:0.03125rem solid #eb5b04;
    color: #eb5b04;
    border-radius: 0.0625rem;
    text-align: center;
  }
  .union .suggest {
    padding: 0.3125rem;
    overflow: hidden;
  }
  .union .suggest_con {
    display: none;
  }
  .union .suggest_con.cur {
    display: block;
  }
  .union .suggest>.icon {
    width: 1rem;
    height: 1rem;
    float: left;
    text-align: center;
    margin-right: 0.125rem;
  }
  .union .suggest>.icon>i {
    font-size: 0.8125rem;
    color: #5db0f9;
  }
  .union .suggest_con>h3 {
    color: #32a5ea;
  }
  .union .suggest_con>p {
    text-align: justify;
    line-height: 0.5625rem;
    color: #757575;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
  .union .suggest_con .showsug {
    text-align: right;
    text-decoration: underline;
    color: #32a5ea;
  }

  /* recommend */
  .recommend {
    padding: 0.3125rem 0.3125rem 0 0.3125rem;
    margin-bottom: 0;
  }
  .recommend h3 {
    height: 1.0rem;
    font-weight: normal;
    color: #0f904e;
    font-size: 0.4375rem;
  }
  .recommend li {
    width: 50%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-right: 0.03125rem solid #f0f0f0;
    border-bottom: 0.03125rem solid #f0f0f0;
    padding-bottom: 0.3125rem;
  }
  .recommend li:nth-of-type(2n) {
    border-right: 0;
  }
  .recommend li:nth-last-of-type(1), .recommend li:nth-last-of-type(2) {
    border-bottom: 0;
  }
  .recommend li>img {
    width: 2.8125rem;
    height: 2.8125rem;
    display: block;
    margin: 0 auto;
  }
  .recommend li>p {
    padding: 0 0.1875rem;
    font-size: 0.375rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recommend li>p .r_color {
    font-size: 0.40625rem;
  }
  .recommend li>span {
    padding: 0 0.1875rem;
    font-size: 0.3125rem;
    min-height: 0.5rem;
    color: #a7a7a7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0.09375rem 0 0.15625rem 0;
    display: block;
  }

  /* options */
  .options {
    width: 100%;
    max-width: 640px;
    height: 1.4rem;
    line-height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-top: .03125rem solid #dadada;
    z-index: 9;
  }
  .options .left {
    width: 5.5rem;
    font-size: 0.3125rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    justify-content: flex-start;
    height: 1.40625rem;
  }
  .options .left>a {
    /*width: 1.875rem;*/
    width: 33.33333%;
    text-align: center;
    font-size: 0.3125rem;
    color: #555;
    padding-top: 0.90625rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    line-height: 0.3125rem;
    background-image: url(~assets/images/icons_product.png);
    background-repeat: no-repeat;
    -webkit-background-size: 1.9375rem auto;
    background-size: 1.9375rem auto;
    background-position: 0 -6.375rem;
  }
  .options .left>a:nth-of-type(2) {
    background-position: 0 -7.6875rem;
  }
  .options .left>a:nth-of-type(3) {
    background-position: 0 -16.19rem;
  }
  .options .left>a.is_collect {
    background-position: 0 -13.5rem;
  }
  .options .right {
    /*width: 4.375rem;*/
    width: 4.5rem;
    font-size: 0.46875rem;
    height: 1.40625rem;
  }
  .options .right button {
    display: block;
    background-color: #f08200;
    color: #fff;
    font-size: 0.46875rem;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /*** slide_detail ***/
  .slide_detail {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .slide_detail h3, .slide_instructions>h3 {
    background-color: #29b76f;
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: 0.4375rem;
    text-align: center;
    color: #fff;
    font-weight: normal;
  }
  .slide_detail .block-1 {
    border-bottom: 0.3125rem solid #f0f0f0;
  }
  .slide_detail .block-1 ul {
    padding: 0.3125rem;
  }
  .slide_detail .block-1 li {
    padding-bottom: 0.5625rem;
  }
  .slide_detail .block-1 li .left {
    width: 2.40625rem;
    font-size: 0.375rem;
  }
  .slide_detail .block-1 li .right {
    width: 6.96875rem;
    color: #a7a7a7;
    font-size: 0.375rem;
  }


  /*** slide_instructions ***/
  .slide_instructions {
    padding-bottom: 1.4rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 0.375rem;
    line-height: 0.75rem;
    text-align: justify;
    color: #262626;
  }
  .slide_instructions>div {
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
  }
  .slide_instructions>span {
    font-size: 0.34375rem;
    color: #a7a7a7;
    line-height: 0.5625rem;
    padding: 0.375rem 0;
    display: block;
  }
  .slide_instructions>h4 {
    font-size: 0.40625rem;
    font-weight: normal;
    margin-bottom: 0.78125rem;
  }
  .slide_instructions>h4>p {
    line-height: 0.625rem;
  }
  .slide_instructions>p {
    margin-bottom: 0.78125rem;
    line-height: 0.625rem;
    font-size: 0.40625rem;
    color: #555;
  }

  .prodel {
    background-color: #fff;
    color:#262626;
    border-bottom:1px solid #dadada;
    z-index: 10;
  }

  .Product_detail_wrap >>> .mint-header.is-fixed {
    z-index: 11;
    width: 100%;
    max-width: 640px;
    left: 50%;
    transform: translateX(-50%);
    margin:0;
  }
  .prodel .mint-header-button {
    width: 1.25rem;
    flex: inherit;
  }
  .prodel .mint-header-title {
    width: 6.75rem;
    flex: inherit;
    text-align: center;
    font-size: 0;
    height: 1.25rem;
    line-height: 1.25rem ;
  }
  .prodel .mint-header-title a {
    display: inline-block;
    font-size: 0.4375rem;
    width: 1.8125rem;
    height: 1.25rem;
    border-radius: 0;
    background-color: transparent;
    color: #262626;
    position: relative;
    opacity: 1;
    outline: none;
  }
  .prodel .mint-header-title a.cur {
    color: #0f904d;
  }
  .prodel .mint-header-title a.cur::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.03125rem;
    bottom: 0.03125rem;
    left: 0;
    background-color: #0f904d;
  }
  /*.slide_product .swiper-pagination {*/
    /*position: static;*/
    /*height: 1.25rem;*/
  /*}*/

  .slide_product /deep/ .pro_imgs_pagination .swiper-pagination-bullet {
    margin: 0 0.15625rem;
    background-color: #909090;
    width: 0.3125rem;
    height: 0.3125rem;
    border-radius: 50%;
    outline:none;
  }
  .slide_product .pro_imgs_pagination .swiper-pagination-bullet-active {
    background-color: #767676;
  }


  .prodel .union .mint-cell-wrapper {
    border-bottom: 0;
  }
  .prodel .base_info>span>a {
    display: inline-block;
    color:#fd2c17;
  }

  /* coupon */
  .block_one {
    padding:0.31rem;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 0.31rem solid #f0f0f0;
  }
  .block_one>.left {
    width:1.56rem;
    font-size: 0.44rem;

  }
  .block_one>.right {
    padding-right: 0.31rem;
    flex: 1;
    background-image: url(~assets/images/arr_r1.png);
    background-repeat: no-repeat;
    background-position: right center;
    height: 1.0rem;
    line-height: 1.0rem;
    overflow: hidden;
  }
  .block_one>.right>span {
    display: inline-block;
    line-height: 0.56rem;
    height: 0.56rem;
    border:0.03rem solid #ff9900;
    border-radius: 0.06rem;
    padding:0 0.19rem;
    margin-left: 0.19rem;
    color:#ff9900;
    font-size: 0.38rem;
    margin-top:0.19rem;
  }
  .block_one>.right>span:nth-of-type(1), .block_one>.right>span:nth-of-type(2) {
    margin-top:0;
  }

  /* coupons_list */
  .coupons_list {
    /*height: 350px;*/
    height: 10.94rem;
    width:100%;
    max-width: 640px;
  }
  .coupons_list>h3 {
    padding-top:0.38rem;
    line-height: 0.44rem;
    font-size: 0.44rem;
    text-align:center;
    font-weight: normal;
  }
  .coupons_list>.btn {
    padding:0.12rem 0.31rem 0.16rem;
  }
  .coupons_list>.btn>button {
    display: block;
    width:100%;
    height: 1.0rem;
    line-height: 1.0rem;
    background-color: #cc0000;
    color:#fff;
    border-radius: 0.47rem;
    border:0;
  }
</style>
