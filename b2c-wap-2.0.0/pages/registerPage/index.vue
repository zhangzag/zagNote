<template>
    <section>
        <!-- 信息 -->
        <div class="form_info">
            <form style="display:none">
                <input type="password"/>
            </form>
            <!-- 快速注册 - 图形验证码 -->
            <div class="user_register" v-if="showId===1">
                <div class="form">
                    <div>
                        <input autocomplete="off" type="text" v-model="phone" placeholder="请输入手机号码">
                    </div>
                    <div class="register_ver">
                        <input autocomplete="off" type="text" v-model="verCode" placeholder="请输入验证码">
                        <span>
                            <img 
                                class="ver_img" 
                                :src="verificationSrc"
                                @click="changeVerImg">
                        </span>
                    </div>
                    <button 
                        @click="btnVerifyCode"
                        :disabled="isNextStep1">下一步</button>
                </div>
                <label ischeckboxtwo>
                    <input autocomplete="off" ref="registerAgreement" name="registerAgreement" type="checkbox" checked>
                    <i></i>
                    <span>我已阅读并同意<router-link to="/login_agreement">《网站服务协议》</router-link></span>
                </label>
            </div>
            <!-- 快速注册 - 图形验证码 end -->

            <!-- 快速注册 - 获取验证码 -->
            <div class="user_register" v-if="showId===2">
                <div class="form">
                    <div>
                        <!-- <input disabled autocomplete="off" type="text" v-model="registerPhone" placeholder="请输入手机号码"> -->
                    </div>
                    <div>
                        <input 
                            autocomplete="off"
                            type="text" 
                            v-model="msgInfo.msgCode" 
                            placeholder="请输入短信验证码">
                        <button 
                            :disabled="msgInfo.codeDisabled"
                            @click="changeVerImg('again')"><i class="c_green">{{ msgInfo.registerText }}</i></button>
                    </div>
                    <button 
                        @click="verifyMsg"
                        :disabled="isNextStep2">下一步</button>
                </div>
                <label ischeckboxtwo>
                    <input autocomplete="off" name="registerAgreement" ref="registerAgreement" type="checkbox" checked>
                    <i></i>
                    <span>我已阅读并同意<router-link to="/login_agreement">《网站服务协议》</router-link></span>
                </label>
            </div>
            <!-- 快速注册 - 获取验证码 end -->

            <!-- 快速注册 - 设置密码 -->
            <div class="user_login" v-if="showId===3">
                <div class="form">
                    <div>
                        <input autocomplete="off" type="password" v-model="pwds.newPwd" placeholder="请输入新密码">
                    </div>
                    <div>
                        <input autocomplete="off" type="password" v-model="pwds.newPwd2" placeholder="请确认新密码">
                    </div>
                    <button
                        :disabled="isNextStep3"
                        @click="comfirePwd">确定</button>
                    <p>请输入6~20个英文字母、数字或符号（除空格）</p>
                </div>
            </div>
            <!-- 快速注册 - 设置密码 end -->
        </div>
        <!-- 信息 end -->
    </section>
</template>

<script>
export default {
    layout: 'layLogin',
	name: 'RegisterPage',
    data (){
        return {
			flag: false, //防止多次提交
			pageTitles: [ '快速注册', '安全检测', '设置密码' ],
            pageTitle: '',
			phone: '', //登录号码
			verCode: '',//图像验证码
			mathRandom: '0.01',
			showId: 1,//默认步骤
			//安全检测 - 短信验证	
			msgInfo: {
				msgCode: '',//短信验证码
				registerText: '获取验证码',
				codeTime: 120,//隔120s可再获取短信验证码
				codeDisabled: true,//安全检测 - 验证短信验证码 默认禁止点击
				randomCodeTwo: '',//短信验证成功返回值
			},
			pwds: {
				newPwd: '',//新密码
				newPwd2: '',//确认新密码
			},
        }
    },
	computed: {
		//当前页面标题
		curPageTitle (){
			return this.pageTitles[ this.showId-1 ];
		},
		//是否可以下一步
		isNextStep1 (){
			if( this.phone && this.verCode ){
				return false;
			}else{
				return true;
			} 
		},
		//是否可以下一步
		isNextStep2 (){
			if( this.msgInfo.msgCode ){
				return false;
			}else{
				return true;
			} 
		},
		//是否可以下一步
		isNextStep3 (){
			if( this.pwds.newPwd && this.pwds.newPwd2 ){
				return false;
			}else{
				return true;
			} 
		},
		//验证码地址
		verificationSrc (){
			return process.env.baseUrl + '/sendCode?v=' + this.mathRandom;
		},
	},
    mounted (){
        
        this.pageTitle = this.pageTitles[0];
    },
  	methods: {
  		//更换图像验证src
  		changeVerImg ( type ){
  			let dataType = type || '';

  			this.mathRandom = Math.random().toFixed(2);
  			if( dataType === 'again' && !this.msgInfo.codeDisabled ){
  				//清空原图形验证码
  				this.verCode = '';
  				//重新获取图像验证码
  				this.showId = 1;
  			}
  		},
  		//验证图像验证码
  		btnVerifyCode (){
  			//是否有选择已阅读《网站服务协议》
  			let registerAgreement = this.$refs.registerAgreement.checked;
  			const _self = this;
  			let timer = null;

  			if( this.flag ){ 
  				return false; 
  			};
  			this.flag = true ;

  			if( !registerAgreement ){
				this.$Toast( '请输阅读并同意《网站服务协议》' );
				this.flag = false ;
				return false; 
  			}

  			if( !verifyPhone(this.phone) ){
				this.$Toast( '请输入正确的手机号码' );

				this.phone = this.verCode = '';
				//更新图形码
				this.mathRandom = Math.random().toFixed(2);
				this.flag = false ;
				return false;
  			}

  			this.$axios({
                  url: '/sendCodeMessage',
                  method: 'post',
  				data: {
  					telephone: this.phone,
  					code: this.verCode,
  				}
  			})
  			.then((res)=>{
  				// console.log(res)
  				if( res.msg === true ){
  					this.showId = 2;

		  			this.msgInfo.codeDisabled = true; // 禁止点击获取验证按钮
		  			clearInterval(timer);
		  			timer = setInterval(function(){
		  				this.msgInfo.registerText = (this.msgInfo.codeTime--) + 's后重新获取'

		  				if(this.msgInfo.codeTime <= 0){
							clearInterval(timer);
		  					this.msgInfo.registerText = '获取验证码';
		  					this.msgInfo.codeDisabled = false; // 开放点击获取验证按钮
		  					this.msgInfo.codeTime = 120;
		  				}
		  			},1000);
		  			this.flag = false ;
  				}else{
  					this.$Toast( res.data.msg );
					//更新图形码
					this.mathRandom = Math.random().toFixed(2);
					this.flag = false ;
  					return false;
  				}
  			})
  			.catch(function(err){
  				console.log(err)
  			});
  		},
  		//注册 - 安全监测-校验验证码
  		verifyMsg (){
  			const _self = this;
  			//是否有选择已阅读《网站服务协议》
  			let isRegisterAgreement = this.$refs.registerAgreement.checked;

  			if( this.flag ){ 
  				return false; 
  			};

  			this.flag = true ;

  			if( !isRegisterAgreement ){
				this.$Toast( '请输阅读并同意《网站服务协议》' );
				this.flag = false ;
				return false; 
  			}

			this.$axios({
                url: '/verifyMessage',
                method: 'post',
				data: { 
					telephone: this.phone ,
					randomCode: this.msgInfo.msgCode,
				}
			}).then((res)=>{
				// console.log(res)
				if ( res.num ){
					this.msgInfo.randomCodeTwo = res.data.num ;
					this.showId = 3;
				}else{
					this.$Toast( res.data.msg );
				}
				this.flag = false ;
			}).catch((err)=>{
				this.$Toast( '服务出错，' + err );
			});
  		},
  		//确认新密码
  		comfirePwd (){
  			const _self = this;

  			if( this.flag ){ 
  				return false; 
  			};
  			this.flag = true ;

  			if ( this.pwds.newPwd == this.pwds.newPwd2 ){
  				if( !verifyPwd(this.pwds.newPwd) ){
  					this.$Toast( '请输入6~20个英文字母、数字或符号（除空格）', 1500 );
  					this.flag = false ;
  					return false;
  				}
  				this.$axios({
                    url: '/vipRegisterInsert',
                    method: 'post',
  					data: {
  						telephone: this.phone,
  						randomCodeTwo: this.msgInfo.randomCodeTwo,
  						password: this.pwds.newPwd
  					}
  				})
  				.then((res)=>{
					//GA统计
					gaEve({eName:'注册', eCate: '注册结果: ' + res.data.msg});
	  				
	  				if( res.data ){
	  					// _self.$router.replace({ path: '/success_registre' });
	  					this.$router.push({ path: '/success_register' });
	  				}else{
						this.$Toast( res.data.msg );
	  				}
	  				this.flag = false;
  				})
  				.catch((err)=>{
  					console.log(err)
  				})
  			}else{
  				this.$Toast( '两次密码输入不正确！' );
				this.flag = false;
  			}
  		},
  		//调整显示步骤
  		jumpShowId(){
  			if( this.showId === 1 ){
  				return;
  			};

  			this.showId--;
  		},
  	}
}
</script>


<style scoped>
/* @import '../../../static/css/headerTitle.css'; */
@import '~assets/style/login.scss';
</style>