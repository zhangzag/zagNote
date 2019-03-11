$(function(){
	var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
	q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
	32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
	2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
	x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
	a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
	d)).finalize(c)}}});var w=f.algo={};return f}(Math);
	(function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
	c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
	d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);

	var memberId = $.getGlobalVal().memberId;
	var curDay = $.getGlobalVal().curDay;

	//更新出生年月日
	var newBirth = '';

	//获取会员信息
	$.ajax({
		// url: webRoot + '/vipSearchByID',
		url: '/vipSearchByID',
		type: 'POST',
		dataType: 'json',
		ansyc: false,
		data: {id: memberId},
	})
	.done(function(res) {
		// console.log("success", res);
		if( res ){
			var now = new Date(),
				hour = now.getHours();
			
			//昵称
			$('.info_name input[name="userName"]').val(res.memberName);

			//如果没有选择性别 默认选择 男性
			if( !res.sex ){
				$('#unSet').prop({checked: true});
			}else{
				res.sex=='男'?$('#male').prop({checked: true}):$('#female').prop({checked: true});
			}

			//生日
			newBirth = res.birthday;

			layui.use('laydate', function(){
			  var laydate = layui.laydate,
		  		  defaultDay = '';
			  
			  if ( res.birthday ) {
			  	defaultDay = res.birthday;
			  }else{
			  	defaultDay = curDay;
			  }
			  //执行一个laydate实例
			  laydate.render({
			    elem: '#birInput', //指定元素
			    value: defaultDay, //初始日期
			    max: curDay,//最大值
			    done: function( value, date ){
			    	// console.log( value, date )
			    	// 更新出生年月日
			    	newBirth = value;
			    },
			  });
			});

			//头像
			if( res.picURL ){
				// $('.ir_upImg img').attr('data-original', res.picURL);
				$('.info_right .ir_upImg .img').append('<img class="lazy" data-original="'+ res.picURL +'">')
		        //图片懒加载
		        lazyLoad({
		            imgSrc: '/images/myImg.png',
		        });
			}
		}
	});

	//点击触发选择头像
	$('.ir_upImg .img').on('click', 'img', function(event) {
		event.preventDefault();
		$('#upload_img_btn').trigger('click');
	});
	
	var baseUrl = $('#upload_img_btn').attr('data-u') || '';
	var shaMemberId = CryptoJS.SHA256( memberId + 'akjk' ); 
	//实例化一个plupload上传对象
    var uploader = new plupload.Uploader({
        browse_button : 'upload_img_btn', //触发文件选择对话框的按钮，为那个元素id
        url : baseUrl + '/upLoadByMemberId', //服务器端的上传页面地址
        multipart: true,//以multipart/form-data的形式来上传文件
        multi_selection: false,//是否可以在文件浏览对话框中选择多个文件
        // file_data_name: 'file',//指定文件上传时文件域的名称，默认为file
        multipart_params: { //上传时的附加参数，以键/值对的形式传入，服务器端可是使用$_POST来获取这些参数
			memberID: memberId,
        },
        headers:{
			'Authorization': shaMemberId.toString(CryptoJS.enc.Base64),
		},
		resize: {
			// width: 120,
			// height: 120,
			crop: true,
  			quality: 60,
  			preserve_headers: true
		},
		filters: {
			mime_types: [ //只允许上传图片
			    { title : "Image files", extensions : "jpg,jpeg,png" }, 
			],
			max_file_size : '1024kb', //最大只能上传1M的文件
		}
    });  
    uploader.init();
     //绑定各种事件
    uploader.bind('FilesAdded',function(uploader,files){
        //每个事件监听函数都会传入一些很有用的参数，
        //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        var file = files[0].getNative();
        var reader = new FileReader();
        var img = new Image();

        reader.readAsDataURL(file);//转成base64
        reader.onload = function(){
        	img.src = this.result;
        	// uploader.files[0] = this.result;
        }
        //清空
        $('.user_img_con').html('');
        $('.user_img_con').append(img);
        $('.user_img_layer').stop(true,true).fadeIn(300);
    });
    uploader.bind('BeforeUpload',function(uploader,file){
        //每个事件监听函数都会传入一些很有用的参数，
        //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        // console.log('BeforeUpload', uploader, file);
        // var file = file.getNative();
        // var reader = new FileReader();
        // reader.readAsDataURL(file);//转成base64
        // reader.onload = function(){
        // 	uploader.files[0] = this.result;
        // 	file = this.result;
        // }
    });
    uploader.bind('UploadFile',function(uploader,file){
        //每个事件监听函数都会传入一些很有用的参数，
        //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        // console.log('UploadFile', uploader, file);
        // var file = file.getNative();
        // var reader = new FileReader();
        // reader.readAsDataURL(file);//转成base64
        // reader.onload = function(){
        // 	uploader.files[0] = this.result;
        // }
    });

    uploader.bind('UploadProgress',function(uploader,file){
        //每个事件监听函数都会传入一些很有用的参数，
        //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        var percent = file.percent;

        //显示上传动画
        $('.user_img_in .img_load_layer').css('display','block');
    });

    uploader.bind('FileUploaded',function(uploader,file,responseObject){
        //每个事件监听函数都会传入一些很有用的参数，
        //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作

        //隐藏上传动画
        $('.user_img_in .img_load_layer').css('display','none');

        var res = JSON.parse(responseObject.response);

        layui.use('layer', function(){
		  var layer = layui.layer;

		  if( res.success ){
		  	var files = file.getNative();
	        var reader = new FileReader();
	        var img = new Image();

	        reader.readAsDataURL(files);//转成base64
	        reader.onload = function(){
	        	img.src = this.result;
	        	// uploader.files[0] = this.result;
	        }
	        //清空
	        $('.ir_upImg .img').html('');
	        $('.ir_upImg .img').append(img);

    	  	layer.msg('头像上传成功!');
		  }else{
		  	layer.msg('头像上传失败!');
		  }
		  $('.user_img_layer').stop(true,true).fadeOut(300);
		}); 
    });
    //上传出错事件
    uploader.bind('Error',function(uploader,errObject){
        // console.log('错误： ', uploader,errObject);
        layui.use('layer', function(){
		  var layer = layui.layer;

	        if( errObject.code == '-600' ){
				layer.msg('头像上传失败，请选择小于1M的图片！');
	        }else{
				layer.msg('头像上传失败，' + errObject.message);
	        }
		}); 
    });
    
    //上传
    $('.user_img_options .bp_green').click(function(event) {
		// console.log($('.user_img_con>img').attr('src'))
		// return
    	uploader.start();
    });

    //取消上传图片
    $('.user_img_options .bp_default').click(function(event) {
    	$('.user_img_layer').stop(true,true).fadeOut(300);
    });

    $('#upload_img_btn').change(function(event) {
    	console.log('改变： ',event)
    });

	//保存信息
	$('.btn_comfirm').click(function(event) {
		//会员名
		var memberName = $('.info_name input[name="userName"]').val();
		//性别
		var sex = $('input[name=sex]:checked').val();
		//出生年月 newBirth
		//头像
		$.ajax({
			// url: webRoot + '/updateByMemberId',
			url: '/updateByMemberId',
			dataType: 'json',
			data: {
				memberID: memberId,//会员id
				memberName: memberName,//会员名称,
				sex: sex,//性别
				birthday: newBirth,//出生年月日
				// file: '', //头像
			},
		})
		.done(function(res) {
			// console.log("success", res);
			layui.use('layer', function(){
			  var layer = layui.layer;
			  
				if( !res.success ){
			  		layer.msg( res.msg );
				}else{
					//更新头部会员姓名
					$('.shortcut .isLogin .login').text( memberName );
					layer.msg( '修改成功！' );
				}
			}); 
		});
		
	});
			
});