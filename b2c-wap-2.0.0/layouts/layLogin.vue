<template>
  <div class="layout_in login_wrap">
    <section class="header_wrap">
      <!-- 头部标题 -->
      <div class="header">
        <mt-header fixed>
            <mt-button icon="back" slot="left" @click.prevent="goBack"></mt-button>
          <mt-button icon="more" slot="right" @click.prevent="showMore"></mt-button>
        </mt-header>
      </div>
      <!-- 头部标题 end -->

      <!-- 显示更多 -->
      <mt-popup
        class="more_block"
        v-model="isShowMore"
        position="top">
        <router-link to="/index">首页</router-link>
        <router-link to="/sort">分类</router-link>
        <router-link to="/myinfo">个人中心</router-link>
      </mt-popup>
      <!-- 显示更多 end -->

      <!-- 头部背景 -->
      <div class="login_bg">
        <div class="headimg">
          <img :src="headImgCur" >
        </div>
        <slot name="page-title">
          <!-- 默认用户登录 -->
          <p>用户登录</p>
        </slot>
      </div>
      <!-- 头部背景 end -->

      <a id="backRef" href="javascript:" onclick="self.location=document.referrer;"></a>
    </section>

    <nuxt/>

  </div>
</template>

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

