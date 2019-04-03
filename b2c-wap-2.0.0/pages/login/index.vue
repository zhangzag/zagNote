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
                    <router-link to="/findpwd">忘记密码?</router-link>
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
import {gaEve, verifyPhone} from '@/utils/utils.js'
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
    name: 'login',
    layout: 'layLogin',
    data (){
        return {
            isUnscRollable: false,
            redirectUrl: '/',
            headImgCurId: 1,
            
            isGoBack: false,//是否后退
            flag: false, //防止多次提交
            isDetailPage: false,// 是否打开其他页
            pwd: '', //登录密码
            titles: '',
            phone: '', //登录号码
        }
    },
	computed: {
		//是否可以下一步
		isNext (){
			if( this.phone && this.pwd ){
				return false;
			}else{
				return true;
			}
        },
		// ...mapState('userModule', ['memberId', 'memberInfo']),
		...mapGetters('userModule', ['memberId', 'memberInfo'])
	},
    mounted (){
        let redirectUrl = this.$route.query.ref || this.$route.query.redirectUrl;

        if (redirectUrl){
            this.redirectUrl = redirectUrl
		}
		console.log('memberId: ', this.memberId)
		console.log(this.memberInfo)
    },
    methods: {
        ...mapMutations('userModule', ['saveMemberId', 'saveMemberInfo']),
        signIn (){
            //将服务端的token存入cookie当中
            // Cookie.set('memberId', 10299)
            //返回上一页
            // this.$router.push(this.redirectURL)

  			if( this.flag ){return}
              this.flag = true;
              
  			if( !verifyPhone( this.phone ) ){
				this.$Toast( '请输入正确的手机号码' );

				this.phone = this.pwd = '';
				return false;
  			}
			
			this.$Idc.open({
			  text: '登录中...',
			  spinnerType: 'fading-circle'
			});

  			let signin = new Promise( (resolve, reject)=>{
	  			this.$axios({
                    url: '/login',
                    method: 'post',
	  				data: {
	  					username: this.phone,
	  					password: this.pwd
	  				}
	  			}).then(( res )=>{
	  				console.log('res: ', res);
	  				if( res.success ){
	  					resolve( res );
	  				}else{
	  					reject(res.msg);
	  				}
	  			}).catch( (err) => {
	  				reject( err )
	  			} );
            } );
              

  			//获取会员信息
  			signin.then( (val)=>{
  				console.log('val: ', val);
  				let memberId = '';

  				memberId = val.memberID;
				
				// 储存个人信息
                //   this.$store.commit('addLogin', {memberID: val.memberID});
				this.saveMemberId(memberId)
				//将服务端的token存入cookie当中
            	Cookie.set('_co_mem', memberId)
                
				//GA统计
				// gaEve({eName:'登录', eCate: '登录会员id: ' + val.memberID});

				//会员查询 
				this.$axios({
                    url: '/vipSearchByID',
                    method: 'post',
					data: {
						id: memberId,
					}
				})
				.then((res)=>{
					console.log('获取个人信息', res)
					this.$Idc.close();
					if( !res ){
						// console.log('获取个人信息失败')
						this.$Toast( '获取个人信息失败' );
						this.flag = false;
						return false;
					}
					// 储存个人信息
                    if(res){this.saveMemberInfo(res)}  
                    this.$Toast({
                        message: '登录成功',
                        position: 'top',
                        duration: 1000,
                        iconClass: 'mintui mintui-success',
                    });
	  				
	  				setTimeout(()=>{

              if( window.history.length<2 ){
                this.$router.replace({path:'/'});
                return false;
              }
              // if( this.isGoBack ){
              //     this.$router.go(-1);//后退
              // }else{
              //   this.$router.replace({path: this.redirectUrl})
						  // }
              this.$router.replace({path: this.redirectUrl})
						  this.flag = false;
	  				},300);
				});
              } )
  			//登录失败或出错
  			.catch( (err) => {
  				// console.log('err: ', err);
				this.$MsgBox.alert( err ).then(action => {});
				this.flag = false;
				this.$Idc.close();
  			} );
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

