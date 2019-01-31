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
		//测试
		// $.ajax({
		// 	url: '/toLogin',
		// 	data: {
		// 		username: '',//用户名
		// 		password: '',//用户密码
		// 	}
		// })
		// .done(function(res){
		// 	console.log(res)
		// })
		// return false
		//测试 end
		var userName = $.trim( $('.userName').val() );
		var pass = $.trim( $('.pass').val() );

		if(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(userName)){
			$.ajax({
				url: '/toLogin',
				data: {
					username: userName,//用户名
					password: pass,//用户密码
				}
			})
			.done(function(res){
				// console.log(res);
				if(res.success === true){
					layui.use('layer',function(){
						layer.msg('阿康欢迎您！',{
							icon: 1,
							time: 1000
						},function(){
							// console.log($.cookie("registerpath"));
							// if($.cookie("registerpath") == "/register.html"){
							// 	window.location.href= "/";
							// }else{
							// 	window.history.go(-1);
							// }
							window.location.href= "/";
						})
					})
					
					var domain = window.location.host;
					domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
					$.cookie('memberId', JSON.stringify( res.memberID ),{
						expires: 7,
						path:'/',
						domain: domain
					});

				}else{
					$('.r .phoneErr').html(res.msg)
					$('.loginBtn').prop('disabled','disabled')
				}
			})
		}else{
			$('.r .phoneErr').html('手机号格式不正确，请输入正确的手机号')
		}
	})
})
