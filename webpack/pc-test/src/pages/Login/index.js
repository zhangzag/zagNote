require('./style/login.scss');
require('./style/register_header.scss');

import Cookies from 'js-cookie';

import { login } from 'apis/user.js';
import { verifyPhone } from '@/util/verify.js';

$('.header-mc .h-title').text('会员登录');
//立即注册
$('.header-mc .loginp').css('display', 'block');

$(function(){
	$('.userName').bind('input propertychange', function() { 
		$('.phoneErr').html('');
 		if($('.pass').val() != ''){
 			$('.loginBtn').prop('disabled',false).css({'background': '#2FBA66'})
 		}
	});
	$('.pass').bind('input propertychange', function() { 
		$('.phoneErr').html('');
 		if($('.userName').val() != ''){
 			$('.loginBtn').prop('disabled',false).css({'background': '#2FBA66'})
 		}
  });

  //登录
  $('.loginBtn').click(function(){
		let username = $.trim( $('.userName').val() );
		let password = $.trim( $('.pass').val() );

    if( !verifyPhone(username) ){
      $('.r .phoneErr').html('手机号格式不正确，请输入正确的手机号');
      return false;
    };

    layui.use('layer',function(){
      login({
        username,
        password
      })
      .then(res=>{
        // console.log('登录： ', res)
        if( !res.success ){
					$('.r .phoneErr').html(res.msg)
          $('.loginBtn').prop('disabled','disabled')
          return false;
        }
        
        layer.msg('阿康欢迎您！', { icon: 1, time: 1000 },function(){ window.location.href= "/"; });

        let domain = window.location.host;
        domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';

        // $.cookie('memberId', JSON.stringify( res.memberID ),{
        //   expires: 7,
        //   path:'/',
        //   domain: domain
        // });
        Cookies.set('memberId', JSON.stringify( res.memberID ), { expires: 7, path: '/', domain: domain });
      })
      .catch(err=>{
        console.log('登录失败', err)
        layer.msg('登录失败,服务出错', { icon: 2, time: 1000 },function(){ })
      });
      
    })
	});




});
