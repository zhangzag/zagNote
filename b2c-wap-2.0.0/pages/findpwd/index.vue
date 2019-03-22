<template>
    <section>
        <!-- 信息 -->
        <div class="form_info">
            <form style="display:none">
                <input type="password"/>
            </form>
            <!-- 忘记密码 step-1 -->
            <div class="forger_step_1" v-if="showId===1">
                <div class="form">
                    <div>
                        <input autocomplete="off" type="text" v-model="phone" placeholder="请输入手机号码">
                    </div>
                    <div>
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
            </div>
            <!-- 忘记密码 step-1 end -->

            <!-- 忘记密码 step-2 -->
            <div class="forger_step_2" v-if="showId===2">
                <div class="form">
                    <div>
                        <input 
                            autocomplete="off"
                            type="text" 
                            v-model="msgInfo.msgCode" 
                            placeholder="请输入短信验证码">
                        <!-- 获取了验证码之后显示 
                        <span><i>56</i>S</span> -->
                        <span 
                            :disabled="msgInfo.codeDisabled"
                            @click="changeVerImg('again')"
                            ><i class="c_green">{{ msgInfo.registerText }}</i></span>
                    </div>
                    <button 
                        @click="verifyMsg"
                        :disabled="isNextStep2">下一步</button>
                    <p>为保证您账户的安全,我们已发送了校验码到您的手机<span>{{ phone }}</span></p>
                </div>
            </div>
            <!-- 忘记密码 step-2 end -->

            <!-- 忘记密码 step-3 -->
            <div class="forger_step_3" v-if="showId===3">
                <div class="form">
                    <div>
                        <input autocomplete="off" type="password" v-model="pwds.newPwd" placeholder="请输入新密码">
                    </div>
                    <div>
                        <input autocomplete="off" type="password" v-model="pwds.newPwd2" placeholder="请确认新密码">
                    </div>
                    <button
                        :disabled="isNextStep3"
                        @click="comfireNewPwd">确定</button>
                    <p>请输入6~20个英文字母、数字或符号（除空格）</p>
                </div>
            </div>
            <!-- 忘记密码 step-3 end -->
        </div>
        <!-- 信息 end -->
    </section>
</template>

<script>
import {gaEve, verifyPhone} from '@/utils/utils.js'

export default {
    layout: 'layLogin',
    name: 'findPwd',
    data (){
        return {
			flag: false, 
            headImgCurId: 2,
			pageTitles: [ '找回密码', '安全检测', '设置新密码' ],
            pageTitle: '',
			showId: 1,//默认步骤
			phone: '', //登录号码
			// verificationSrc: '', //图像验证码src
			verCode: '',//图像验证码
			mathRandom: '0.01',
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
			// return this.webRoot + '/sendCode?v=' + this.mathRandom;
			return process.env.baseUrl + '/sendCode?v=' + this.mathRandom;
		},
	},
    mounted (){
        this.pageTitle = this.pageTitles[0];
        // console.log('哈哈哈' ,process.env.baseUrl)
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
  			const _self = this;
  			let timer = null;

  			if( this.flag ){ 
  				return false; 
  			};
  			this.flag = true ;

  			if( !verifyPhone(this.phone) ){
				this.$Toast( '请输入正确的手机号码' );

				this.phone = this.verCode = '';
				//更新图形码
				this.mathRandom = Math.random().toFixed(2);
				this.flag = false ;
				return false;
  			}

  			this.$axios({
                url: '/verifyCode',
                method: 'post',
  				data: {
  					telephone: _self.phone,
  					code: _self.verCode,
  				}
  			})
  			.then((res)=>{
  				console.log(res)
  				if( res.msg === true ){
  					this.showId = 2;

		  			this.msgInfo.codeDisabled = true; // 禁止点击获取验证按钮
		  			clearInterval(timer);
		  			timer = setInterval(()=>{
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
  					this.$Toast( res.msg );
					//更新图形码
					this.mathRandom = Math.random().toFixed(2);
					this.flag = false ;
  					return false;
  				}
  			})
  			.catch((err)=>{
  				console.log(err)
  				this.$Toast( '服务出错' );
  			});
  		},
  		//忘记密码 - 安全监测-校验验证码
  		verifyMsg (){
  			const _self = this;

  			if( this.flag ){ 
  				return false; 
  			};
  			this.flag = true ;

			this.$ajax({
				url: _self.webRootVerify + '/verifyMessage',
				data: { 
					telephone: _self.phone ,
					randomCode: _self.msgInfo.msgCode,
				}
			}).then(function(res){
				// console.log(res)
				if ( res.data.num ){
					_self.msgInfo.randomCodeTwo = res.data.num ;
					_self.showId = 3;
				}else{
					_self.$options.methods.comToast( res.data.msg );
				}
				_self.flag = false ;
			}).catch(function(err){
				_self.$options.methods.comToast( '服务出错，' + err );
			});
  		},
  		//确认新密码
  		comfireNewPwd (){
  			const _self = this;

  			if( this.flag ){ 
  				return false; 
  			};
  			this.flag = true ;

  			if ( this.pwds.newPwd == this.pwds.newPwd2 ){
  				if( !verifyPwd(this.pwds.newPwd) ){
  					_self.$options.methods.comToast( '请输入6~20个英文字母、数字或符号（除空格）', 1500 );
  					_self.flag = false ;
  					return false;
  				}
  				_self.$ajax({
  					url: _self.webRootVerify + '/changePassword',
  					data: {
  						telephone: _self.phone,
  						randomCodeTwo: _self.msgInfo.randomCodeTwo,
  						password: _self.pwds.newPwd
  					}
  				})
  				.then(function(res){
  					// console.log(res)
  					if( res.data ){
  						_self.$options.methods.comToast( '密码修改成功！', 1500 );
  						setTimeout(function(){
  							// console.log('xgmmcgl')
  							_self.$router.replace({ path: 'login' });
  							// location.reload();
  						},1000);
  					}else{
  						_self.$options.methods.comToast( res.data.msg );
  					}
  					_self.flag = false;
  				})
  				.catch(function(err){
  					console.log(err)
  					_self.$options.methods.comToast( '服务出错' );
  				})
  			}else{
  				_self.$options.methods.comToast( '两次密码输入不正确！' );
				_self.flag = false;
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