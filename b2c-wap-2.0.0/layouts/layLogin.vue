<template>
  <div class="layout_in login_wrap">
    <section class="header_wrap">
      <!-- 头部标题 -->
      <div class="header">
        <mt-header fixed>
            <mt-button icon="back" slot="left" @click.prevent="goBack"></mt-button>
            <mt-button icon="more" slot="right" @click.prevent="showMore"></mt-button>
        </mt-header>
        
        <!-- 显示更多 -->
        <mt-popup
          class="more_block"
          v-model="isShowMore"
          position="top">
          <router-link to="/">首页</router-link>
          <router-link to="/sort">分类</router-link>
          <router-link to="/member">个人中心</router-link>
        </mt-popup>
        <!-- 显示更多 end -->
      </div>
      <!-- 头部标题 end -->

      <!-- 头部背景 -->
      <div class="login_bg">
        <div class="headimg">
          <!-- <img :src="headImgCur" > -->
          <img v-if="headImgCurId!=2" src="~assets/images/headimg.png" alt="">
          <img v-if="headImgCurId==2" src="~assets/images/headimg-2.png" alt="">
        </div>
        <p>{{pageTitle}}</p>
      </div>
      <!-- 头部背景 end -->

      <a id="backRef" href="javascript:" onclick="self.location=document.referrer;"></a>

    </section>

    <nuxt ref="main"/>

  </div>
</template>

<script>
export default {
	data() {
		return {
		  isGoBack: false,//是否后退
		  hearImg: {
		  	// headImgCur: './static/images/headimg.png', //默认为 登录头像
	  		headImgL: '/images/headimg.png', //头像图片地址 登录
		  	headImgM: '/images/headimg-2.png', //头像图片地址 找/设置密码
		  },
		  flag: false, //防止多次提交
		  isShowMore: false, // 是否显示更多
      isUnscRollable: false, //是否页面不可滚动
      backParentPage: false, //是否回到父页面
      isDetailPage: false,// 是否打开其他页
      // headImgCur: '',
      headImgCurId: 0,
      pageTitle: '用户登录',//默认为 用户登录
		}
	},
	// props: [
	// 	'headImgCurId',
	// 	'showId'
	// ],
	computed: {
		//当背景上的图片
		// headImgCur (){
    //   // this.title = this.$refs.main.$children[0].headTitle;
    //   if(!this.$refs.main.$children[0]){return}
		// 	if( !this.$refs.main.$children[0].headImgCurId || this.$refs.main.$children[0].headImgCurId == 1 ){
		// 		//默认登录
		// 		return this.hearImg.headImgL;
		// 	}if( this.$refs.main.$children[0].headImgCurId == 2 ){
		// 		//找回密码
		// 		return this.hearImg.headImgM;
		// 	}
		// }
  },
  mounted (){
    // console.log(this.$refs.main.$children[0].headImgCurId)
    
    if(this.$refs.main.$children[0].headImgCurId){
      this.headImgCurId = this.$refs.main.$children[0].headImgCurId
    }
    if(this.$refs.main.$children[0].pageTitle){
      this.pageTitle = this.$refs.main.$children[0].pageTitle
    }
  },
  methods: {
		// 后退
		goBack (){
			if( this.showId > 1 ){
				//跳转步骤
				this.$emit('jumpShowIdChild');
				return;
			};

			this.$router.go(-1);
		},
		//显示更多
		showMore (){
			this.isShowMore = true;
		}
  }
}
</script>

<style lang="scss" scoped>
.login_wrap .header .mint-header {
	background-color: transparent;
	color: #fff;
	border-bottom: 0;
} 
.login_wrap .login_bg {
	background-color: #09ad58;
	height: 300px;
	padding-top: 1.25rem;
	height: 5.625rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	background-image: url('~assets/images/login_bg.png');
	background-repeat: no-repeat;
	-webkit-background-size: 10.0rem auto;
	background-size: 10.0rem auto;
	max-width: 640px;
}
.login_wrap .headimg {
	width: 2.25rem;
	height: 2.265625rem;
	margin: 0 auto;
}
.login_wrap .login_bg>p { 
	color: #effff5;
	text-align: center;
	font-size: 0.5rem;
	margin-top: 0.4375rem;
}
</style>

