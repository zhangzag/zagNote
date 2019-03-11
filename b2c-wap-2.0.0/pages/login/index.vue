<template>
    <section class="wrap_form_info" :class="{ unscrollable: isUnscRollable }">
        <!-- 头部 -->
        <!-- <login-head ref="loginhead"/> -->
        <!-- 头部 end -->

        <!-- 信息 -->
        <div class="form_info">
            <form style="display:none">
                <input type="password"/>
            </form>
            <!-- 登录 -->
            <div class="user_login">
                <div class="form">
                    <div>
                        <input autocomplete="off" type="text" v-model="phone" placeholder="请输入手机号码">
                    </div>
                    <div>
                        <input 
                            autocomplete="off" 
                            type="password" 
                            v-model="pwd" 
                            placeholder="请输入密码">
                    </div>
                    <button 
                        :disabled="isNext"
                        @click="signIn">登录</button>
                </div>
                <div class="links d_flex">
                    <!-- <a href="javascript:;">忘记密码?</a> -->
                    <router-link to="/findPwd">忘记密码?</router-link>
                    <router-link to="/registerPage">新用户注册</router-link>
                    <!-- <a href="javascript:;">新用户注册</a> -->
                </div>
            </div>
            <!-- 登录 end -->
        </div>
        <!-- 信息 end -->
        <!-- <a id="backRef" href="javascript:" onclick="self.location=document.referrer;"></a> -->
    </section>
</template>

<script>
import Cookie from 'js-cookie'

export default {
    layout: 'layLogin',
    data (){
        return {
            isUnscRollable: false,
            redirectUrl: '/',
        }
    },
    mounted (){
        let redirectUrl = this.$route.query.ref;
        
        if (redirectUrl){
            this.redirectUrl = redirectUrl
        }
    },
    methods: {
        signIn (){
            //将服务端的token存入cookie当中
            Cookie.set('memberId', 10299)
            //返回上一页
            // this.$router.push(this.redirectURL)
        },
    },
}
</script>

<style lang="scss" scoped>
.wrap_in {
	padding-top: 0;
	position: absolute;
	bottom:0;
	width: 100%;
	height: 100%;
	z-index: 1;
}

/* form_info */
.form_info {
	padding: 0.5625rem 0.8125rem;
    box-sizing: border-box;
	max-width: 640px;
}
.form_info .form>* {
	display: block;
	width: 100%;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	position: relative;
}
.form_info .form input {
	background-image: url(~assets/images/icons_login.png);
	background-repeat: no-repeat;
	-webkit-background-size: 2.125rem auto;
	background-size: 2.125rem auto;
	padding-left: 1.1875rem;
	color: #555;
	font-size: 0.375rem;
	display: block;
	position: relative;
	width: 100%;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	margin: 0;
}
.form_info .form input::-webkit-input-placeholder {
	color: #a7a7a7;
}
.form input::-moz-placeholder {
	color: #a7a7a7;
}
.form_info .form input:-ms-input-placeholder {
	color: #a7a7a7;
}
.form_info .form input:-moz-placeholder {
	color: #a7a7a7;
}
.form_info .form div:nth-of-type(1) input {
	height: 1.40625rem;
	/*line-height: 1.40625rem;*/
	line-height: normal;
	border-radius: 0.125rem 0.125rem 0 0;
	border:0.03125rem solid #dadada ;
	border-bottom: 0;
	background-position: -0.5625rem -0.5rem;
}
.form_info .form div:nth-of-type(2) input {
	height: 1.40625rem;
	line-height: normal;
	border-radius: 0 0 0.125rem 0.125rem;
	border:0.03125rem solid #dadada ;
	background-position: -0.5625rem -1.9375rem;
}
.form_info .form>button {
	height: 1.1875rem;
	border-radius: 0.125rem;
	background-color: #2fba66;
	border: 0;
	color: #fff;
	font-size: 0.5rem;
	margin-top: 0.9375rem;
}
.form_info .form>button[disabled] {
	background-color: #dadada;
	color: #fff;
}
.links {
	margin-top: 0.5625rem;
}
.links a {
	font-size: 0.4375rem;
	color: #555;
}

</style>

