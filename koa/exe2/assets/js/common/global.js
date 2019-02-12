
(function($){
		/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	// var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
	// q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
	// 32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
	// 2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
	// x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
	// a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
	// d)).finalize(c)}}});var w=f.algo={};return f}(Math);
	// (function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
	// c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
	// d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);

	//var hash = CryptoJS.SHA256("123456"); alert(hash.toString(CryptoJS.enc.Base64));
	//var hash = CryptoJS.MD5("Message");  alert(hash.toString(CryptoJS.enc.Base64));
	//var hash = CryptoJS.SHA3("Message"); alert(hash.toString()); //Same as hash.toString(CryptoJS.enc.Hex);

	//时间格式化
	Date.prototype.Format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) {
	        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) 
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	    
	}

	// 获取cookie 会员id
	function getUser(){
		var arrstr = document.cookie.split("; ");
		//console.log(arrstr)
		for(var i = 0;i < arrstr.length;i ++){
			var temp = arrstr[i].split("=");
			if(temp[0] == 'memberId' && temp[1] != 'null') return unescape(temp[1]);
		}
	}
	//请求地址
	// 生产
	// var webRoot = 'http://113.108.163.210:9999/AKGW-api/v1';
	// var webRoot = '/api';
	
	var webRoot = 'http://192.168.2.254:8080/AKGW-api/v1'; 
	// var webRoot = 'http://192.168.2.248:8080/AKGW-api/v1'; 
	//var webRoot = 'http://api-web.ak1ak1.com/AKGW-api/v1'; 
	// var webRoot = '/testapi';
	
	// var webRoot = 'http://192.168.2.65:8083/AKGW-api/v1'; //
	
	// var webRoot = 'http://192.168.2.65:8083/AKGW-api/v1';
	//var webRoot = '/apilf';

	//lf
	// var webRoot = 'http://192.168.1.220:8886/AKGW-api/v1';
	
	//源地址
	// var webOrigin = 'http://113.108.163.210:9999';
	var webOrigin = 'http://113.108.163.210:9999';
	
	// 生产环境 图片前缀
	// var ImgSrc = 'http://113.108.163.210:9999';
	// 测试环境 图片前缀
	var ImgSrc = 'http://192.168.2.250:8081';
	
	//当前时间
	var curDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
	//当前日期
	var curDay = new Date().Format("yyyy-MM-dd");
	//会员Id
	var memberId = getUser(); //10299,15603

	jQuery.extend({
		//全局数据
		getGlobalVal: function() {
		  return {
		  	webRoot		: webRoot, //请求地址
		  	webOrigin	: webOrigin, //源地址
		  	curDate		: curDate, //当期时间
		  	curDay		: curDay,//当前日期
		  	memberId 	: memberId, //会员id
		  	ImgSrc 		: ImgSrc,//图片地址前缀
		  }
		},
		//获取url参数
		getQueryString: function ( name ){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) return unescape(r[2]); return null;
		},
		//价格格式化
		priceFilter: function( data ){
			if( data === null || data === 0 || !data ){
				return '¥' + (0).toFixed(2);
			}else{
				return '¥' + data.toFixed(2);
			}
		},
		//订单状态格式化
		orderStatuFilter: function ( data ){
			// 1.在线未支付    2.货到付款待确认    3.待发货    4.待收货    5.物流待收款    6.财务待收款    7.已完成    8.已取消    9.支付中
			if( data == 1 || data == 9 ){ return '待付款' }
			else if( data == 3 || data == 2 ){ return '待发货' }
			else if( data == 4 ){ return '待收货' }
			else if( data == 5 || data == 6 || data == 7 ){ return '已完成' }
			else if( data == 8 ){ return '已取消' }
		},
		//订单支付方式
		payType: function ( data ){
			// 1、支付宝支付   2、微信支付    3、通联支付     4、货到付款
			if(  data === 1 ){
				return '支付宝支付 ';
			}else if ( data === 2 ){
				return '微信支付';
			}else if ( data === 3 ){
				return '通联支付';
			}else {
				return '货到付款';
			}
		},
		//药品类型图标过滤
		iconProImg: function ( data ){
			if( data === 1 ){
				//处方药RX
				return '<i class="y_type"></i>';
			}else if( data === 2 ){
				//甲类OTC
				return '<i class="y_type otc_1"></i>';
			}else if( data === 3 ){
				//乙类OCT
				return '<i class="y_type otc_2"></i>';
			}else{
				return '';
			}
		},
		//提示弹窗
		showToast: function ( msg, time ){
			alert(msg)
		},
		imgType: function ( data ){
	      if( data == 1 ){
	        return 'RX';
	      }else if(data == 2){
	        return 'OTC-2'
	      }else if(data == 3){
	        return 'OTC-1'
	      }
	    },
	    //提示对话框
	    comConfirm: function ( param ){
			//提示文本
			var tipText = param.tipText || '提示';

			//提示内容
			var conText = param.conText || '确定执行此操作？';
			//取消按钮内容
			var cancelText = param.cancelText || '取消';
			//确定按钮内容
			var confirmText = param.confirmText || '确定';

			//取消回调
			var cancelFunction = param.cancel || null;
			//确定回调
			var conformFunction = param.conform || null;


			$('body').append(
			'<div id="loginLayer_wrap">\
				<div class="loginLayer">\
					<div class="loginLayerTip"><span class="fl">'+ tipText +'</span><i  class="fr">x</i></div>\
					<div class="loginLayerCon">\
						<p>'+ conText +'</p>\
					</div>\
					<div class="loginLayerBtns">\
						<button class="loginLayerCancel fl">'+ cancelText +'</button>\
						<button class="loginLayerConfirm fr">'+ confirmText +'</button>\
					</div>\
				</div>\
			</div>'
			);
			
			//取消回调
			if( typeof cancelFunction === 'function' ){
				$('#loginLayer_wrap').on('click', '.loginLayerCancel', function(event) {
					event.preventDefault();
					cancelFunction();
				});
			}
			//确定回调
			if( typeof conformFunction === 'function' ){
				$('#loginLayer_wrap').on('click', '.loginLayerConfirm', function(event) {
					event.preventDefault();
					conformFunction();
				});
			}

		},

		// 操作完成 提示框
		finishTips: function(title,content){
			var title = title || '提示';
			var content = content || '操作提示';
			layui.use('layer',function(){
				var layer = layui.layer;
				layer.open({
				  	title: title,
				  	content: content,
				  	area: '260px',
				  	zIndex: 99999999999
				});     
  			})
		},
		// 提示信息
		tips: function(title,icon){
			var title = title || '';
			var icon = icon || 1;
			layui.use('layer',function(){
		    	var layer = layui.layer;
		        layer.msg(title,{
		            icon: icon,
		            time: 1000,
		            zIndex: 999999999999
		        })
		    })
		},

		// 弹窗登录 设置请求头Authorization
		authorization: function(memberId){
			var shaMemberId = CryptoJS.SHA256( memberId + 'akjk' );
			$.ajaxSetup({
				headers : {
					'Authorization': shaMemberId.toString(CryptoJS.enc.Base64),
				},
			})
			// return CryptoJS.SHA256( memberId + 'akjk' ).toString(CryptoJS.enc.Base64);
		},

		// 快捷登录
		loginAlert: function(callback){
  			var content = '<div id="loginAlert222" class="alertWrap"><div class="alertContent"><div class="alertTop"><span>会员登录</span><b>X</b><i class="clear"></i></div><div id="loginAlert"><input type="text" id="loginUser" placeholder="请输入手机号"><input type="password" id="loginPass" placeholder="请输入密码" autocomplete="new-password"><button id="loginAlertClick">登 录</button><div><a href="/register.html">没有账号？ <span>去注册 ></span></a><a href="/forgetPassword.html" style="float: right;">忘记密码？</a></div></div></div></div>';
  			$('body').append(content);

  			// 关闭
  			$('body').off('click','#loginAlert222 b').on('click','#loginAlert222 b',function(){
  				$('body').find('#loginAlert222').remove();
  			})

  			// 登录
  			$('body').off('click','#loginAlertClick').on('click','#loginAlertClick',function(event){
  				event.preventDefault();
		        var userName = $.trim($('#loginUser').val());
		        var password = $.trim($('#loginPass').val());
		        if(userName == '' || password == ''){
		        	// console.log(22222)
		            $.tips('账号和密码不能为空！',2);
		            return false;
		        }
		        if(!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(userName)){
		            $.tips('手机格式不正确，请重新输入',2);
		            return false;
		        }
		        $.ajax({
		            // url: $.getGlobalVal().webRoot + '/login',
		            url: '/login',
		            type: 'POST',
		            dataType: 'json',
		            data: {
		                username: userName,//用户名
		                password: password,//用户密码
		            },
		        }).done(function(res){
		            // console.log('登陆',res);
		            if(res.success === true){
		            	var domain = window.location.host;
						domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
		                $.cookie('memberId', JSON.stringify( res.memberID ),{
		                    expires: 7,
		                    path:'/',
		                    domain: domain
		                });
		                $('body').find('#loginAlert222').remove();
		                $.tips('欢迎来到阿康健康！',1);
		                // $("#top").load('/module/common/top.html?n='+Math.random().toFixed(3));
		                $.authorization(res.memberID)

		                if (!callback) {
		                	return false;
		                }
		                if (callback.getColl) {
		                	callback.getColl(res.memberID)
		                }
		                if (callback.getdefault) {
		                	callback.getdefault(res.memberID)
		                }

		            }else{
		            	$.tips('账号或者密码错误！',2);
		            }
		        })
		    })
		},

		
		
	});

	//ajax 全局样式
	var shaMemberId = CryptoJS.SHA256( memberId + 'akjk' ); 

	$.ajaxSetup( {
		url: webRoot , // 默认URL
	    type: "POST" , // 默认使用POST方式
	    dataType: 'json',//默认格式
	    cache: true,
		headers : {
			'Authorization': shaMemberId.toString(CryptoJS.enc.Base64),
		},
	    error: function(jqXHR, textStatus, errorMsg){ // 出错时默认的处理函数
	        // jqXHR 是经过jQuery封装的XMLHttpRequest对象
	        // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
	        // errorMsg 可能为： "Not Found"、"Internal Server Error"等
 
	        // 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found
	       	//console.log('账号登陆错误错误啊需要返回从新登陆')
	       	//console.log(jqXHR)
    	    if (jqXHR.status==500) {
    	    	console.log( '出错[' + jqXHR.status + ']：' + errorMsg+':::'+jqXHR.responseText ); 

    	    	if( JSON.parse(jqXHR.responseText).msg === '请先登录！' ){
    	    		// alert('请等登录')
    	    		// $('body').append('<div class="loginLayer"></div>')
    	    		console.log('请先登录！')
    	    	}
			}
    	    if (jqXHR.status==404) {
    	    	console.log( '出错[' + jqXHR.status + ']：' + errorMsg+':::'+jqXHR.responseText );  
    	    }
	    }
	} );
})(jQuery);	

