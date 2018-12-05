require('./style/login.scss');
require('./style/register_header.scss');
require('./style/forgetPassword.scss');
require('./style/step.scss');

import { webRoot } from '@/assets/js/globalDefine.js';
import { verifyPhone, verifyPwd } from '@/util/verify';
import { verifyCodeApi, verifyMessageApi, changePasswordApi } from 'apis/user.js';


$('.header-mc .h-title').text('找回密码');

$(function(){
    let stepNum = 0
    let timeToIndex = 6

    //初始化步骤条
    initStep();
    //初始化图形验证码
    getPicCode();

    //获取图形验证码
    $('.picBtn').click(function(){
        getPicCode();
    })

    // 下一步
    let nextCode = null;
    $('#nextStep').click(function(){
        let mobile = $.trim($("#userPhone").val());
        let picCode = $.trim($("#picCode").val());
        let phoneCode = $.trim($("#phoneCode").val());
        let userPsw = $.trim($("#userPsw").val());
        let repeatPsw = $.trim($("#repeatPsw").val());

        switch(stepNum)
        {
            case 0: //步骤一 - 图形验证码验证
                if( !verifyPhone(mobile) ){
                    showTip("#phoneErr", "请输入正确的手机号!");
                    return false;
                }else if( !picCode ){
                    showTip("#picErr", "请输入验证码!");
                    return false;
                }else{
                    $("#phoneErr").html('').css({'display': 'none'});
                }

                verifyCodeApi({
                    telephone: mobile, 
                    code: picCode,
                })
                .then(res=>{
                    // console.log(res)
                    // console.log(res.msg !== true)
                    if(res.msg !== true){
                      showTip("#picErr", res.msg);
                      getPicCode();
                      return false;
                    }

                    $(".steps").step("next");
                    stepNum++;
                    $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
                    countDown(120);
                })
                .catch(err=>{
                    console.log('验证图形验证码出错,', err);
                });
                break;
            case 1: //步骤二 - 短信验证码
                verifyMessageApi({
                    telephone: mobile ,//电话
                    randomCode: phoneCode,//短信验证码
                })
                .then(res=>{
                    if ( res.num ){
                        nextCode = res.num;
                        $(".steps").step("next");
                        stepNum++;
                        $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
                    }else{
                        showTip("#picErr","短信验证码错误，请重新获取!");
                        $(".steps").step("previous");
                        stepNum--;
                        $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
                    }
                })
                .catch(err=>{
                    console.log('短信验证出错,', err)
                });
                break;
            case 2: //步骤三
                if( !verifyPwd(userPsw) ){
                    //repeatPsw
                    showTip("#pswTip","密码为6-16位数字、字母或者符号!");
                    return false;
                }
                if( userPsw !== repeatPsw ){
                    showTip("#repeatPswTip","两次输入密码不一致，请再次输入密码!");
                    return false;
                }
                $("#repeatPswTip").html('').css({'display': 'none'});

                changePasswordApi({
                    telephone: mobile,
                    randomCodeTwo: nextCode,
                    password: userPsw
                })
                .then(res=>{
                    if(res.code == 101){
                      showTip("#pswTip","您设置的密码与原密码相同，请重新设置!");
                      return false;
                    }

                    $(".steps").step("next");
                    stepNum++;
                    $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
                    $('.fotget-ok .se span').eq(0).html(timeToIndex);
                    $('#nextStep').eq(0).html('返回首页');
                    setInterval(function(){
                       timeToIndex--;
                       $('.fotget-ok .se span').eq(0).html(timeToIndex);
                       if(timeToIndex < 0){
                          window.location.href = 'index.html'
                       }
                    },1000)
                })
                .catch(err=>{
                    console.log('更改密码出错,' ,err)
                });
                break;
            default :
                window.location.href = 'index.html';
        }
    })


    //倒计时
    let t = null;
    function countDown(times){
        $('#getPhoneCode').html(times+'s后重新获取').attr({'disabled': 'disabled'});
        clearInterval(t)
        t = setInterval(function(){
            times--;
            $('#getPhoneCode').html(times + 's后重新获取')
            //console.log(times)
            if(times <= 0){
                clearInterval(t);
                $('#getPhoneCode').html('重新获取验证码').attr({'disabled': false});
                $(".steps").step("previous");
                stepNum--;
                $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
            }
        },1000)
    }

    // 步骤条
    function initStep() {
        $(".steps").step({
            stepNames: ['安全验证','短信验证码', '设置新密码', '设置完成'],
            initStep: 1
        })
    }

    // 获取图形码
    function getPicCode(){
        $('.picBtn img').attr("src", webRoot+'/sendCode?n=' + Math.random());
    }

    //显示提示文字
    function showTip(tipId, errorText){
        let tip = $(tipId) ;

        tip.html(errorText) ;
        tip.show() ;
    };
});