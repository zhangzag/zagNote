$(function(){
    //请求地址
    // var webRoot = 'http://113.108.163.210:9999/AKGW-api/v1';
    // var webRoot = $.getGlobalVal().webRoot;
    //源地址
    // var webOrigin = $.getGlobalVal().webOrigin;
    //当前时间
    var curDate = $.getGlobalVal().curDate;
    //会员Id
    // var memberId = $.getGlobalVal().memberId;
    
    // 获取 会员id
    function getUser(){
		var arrstr = document.cookie.split("; ");
		//console.log(arrstr)
		for(var i = 0;i < arrstr.length;i ++){
			var temp = arrstr[i].split("=");
			if(temp[0] == 'memberId' && temp[1] != 'null') return unescape(temp[1]);
		}
	};

	var domain = window.location.host;
	domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
	if(window.location.pathname != '/submitOrder.html'){
		$.cookie('order',JSON.stringify(null),{  path:'/', domain:domain, /*secure:true*/});
	}
    
    //获取一级分类
    var productTypeOne = $.getQueryString('productTypeOne') || '';
    //获取二级分类
	var productTypeTwo = $.getQueryString('productTypeTwo') || '';
	
	//获取热门搜索
	$.ajax({
		url: '/getHotSearchByProductTypeID',
		data: {
			endDate: curDate,//格式为 2018-05-26 00:00:00
			productTypeID: productTypeTwo?productTypeTwo:productTypeOne,//格式为 int
			type: '',//格式为 int   1、分类 2、商品 3、品牌   可为空，为空时返回3种类型的热门搜索
			isValid: 1,
		},
	})
	.done(function(res) {
		// console.log("热门", res);
		if(res.success){
			var datas = res.data;

			for( var i=0; i<datas.length; i++ ){
				//品牌热门搜索 
				if( datas[i].type === 3 ){
					$.ajax({
						url: '/getHSDetailByParams',
						data: {
							endDate: curDate, //格式为 2018-05-26 00:00:00
							searchID: datas[i].searchID, //格式为 int
							type: datas[i].type, //1、分类 2、商品 3、品牌   
							isValid: 1, //格式为 string	1、有效  0、无效
						},
					})
					.done(function(res) {
						// console.log("热门搜索-按品牌：", res);
						var brandHtml = '';

						for( var i=0; i<res.data.length; i++ ){
							brandHtml += '<span ><a href="/list.html?productName='+ res.data[i].brandName +'" title="'+ res.data[i].brandName +'">'+ res.data[i].brandName +'</a></span>';
						};
						$('.search_recommend').append( brandHtml );
					});
					
				}
				//分类热门搜索
				if( datas[i].type === 1 ){
					$.ajax({
						url: '/getHSDetailByParams',
						data: {
							endDate: curDate, //格式为 2018-05-26 00:00:00
							searchID: datas[i].searchID, //格式为 int
							type: datas[i].type, //1、分类 2、商品 3、品牌   
							isValid: 1, //格式为 string	1、有效  0、无效
						},
					})
					.done(function(res) {
						// console.log("热门搜索-按分类：", res);
						var productTypeHtml = '';

						for( var i=0; i<res.data.length; i++ ){
							if( res.data[i].level  === 2 ){
								//二级分类
								productTypeHtml += '<span ><a href="/list.html?productTypeTwo='+ res.data[i].productTypeId +'" title="'+ res.data[i].productTypeName +'">'+ res.data[i].productTypeName +'</a></span>';
							}else{
								//一级分类
								productTypeHtml += '<span ><a href="/list.html?productTypeOne='+ res.data[i].productTypeId +'" title="'+ res.data[i].productTypeName +'">'+ res.data[i].productTypeName +'</a></span>';
							}
						};
						$('.search_recommend').append( productTypeHtml );
					});
					
				}
				//商品热门搜索
				if( datas[i].type === 2 ){
					$.ajax({
						url: '/getHSDetailByParams',
						data: {
							endDate: curDate, //格式为 2018-05-26 00:00:00
							searchID: datas[i].searchID, //格式为 int
							type: datas[i].type, //1、分类 2、商品 3、品牌   
							isValid: 1, //格式为 string	1、有效  0、无效
						},
					})
					.done(function(res) {
						// console.log("热门搜索-按商品：", res);
						var productHtml = '';

						if( res.success && (res.data.length>0) ){
							// http://localhost:8081/productDetails.html?productId=873
							for( var i=0; i<res.data.length; i++ ){
								productHtml += '<span ><a href="/productDetails.html?poductId='+ res.data[i].productID +'" title="'+ res.data[i].productName +'">'+ res.data[i].productName +'</a></span>';
							};
						};
						$('.search_recommend').append( productHtml );
					});
					
				}
			}
		}
	})
	.fail(function() {
		console.log("热门error");
	});
    
    // 退出登陆
	$('.loginOutBtn').click(function(){
		// loginOut
		$.ajax({
			url: '/loginOut',
			type: 'get',
		})
		.done(function(res){
			// console.log('退出登录： ', res)
			if(res.success){
				//清除本地cookie
				$.cookie('memberId', null,{
					path:'/',
					domain: domain
				});
				window.location.reload();
			}else{
				alert('出错了，', res.msg)
			}
		})
	});

    //是否显示导航条
	if( window.location.pathname === '/' ){
		// console.log('首页',$('.nav_in .sort_list'))
		$('.nav_in .sort_list').addClass('isIndex');
	}else {
		//鼠标移上显示导航条
		$('.all_sort').hover(function(){
			$('.nav_in .sort_list').addClass('isIndex');
		},function(){
			$('.nav_in .sort_list').removeClass('isIndex');
		});
	};

	//导航条hover
	$('.sort_list').on('mouseenter', '.list_item', function(event) {
		$(this).siblings().children('a').removeClass('cur');
		$(this).children('a').addClass('cur');
	});
	$('.sort_list').on('mouseleave', '.list_item', function(event) {
		$('.sort_list .list_item').children('a').removeClass('cur');
	});

	//购物车hover
	$('#myCart').hover(function() {
		$(this).addClass('cur');
	}, function() {
		$(this).removeClass('cur');
	});

	//从cookie获取搜索记录
	if( $.cookie('aksearchlis') ){
		var searchList = JSON.parse( $.cookie('aksearchlis'));
		for( var i=0; i<searchList.length; i++ ){
			$('.sh_list ul').append('<li><a href="/list.html?productName='+encodeURI(searchList[i].ser)+'">'+ searchList[i].ser +'</a></li>');
			// $('.sh_list ul').append('<li><a href="/list.html?ser_con='+ searchList[i].ser +'">'+ searchList[i].ser +'</a></li>');
		};
	};

	$('.clearAksearchlis').click(function(){
		$.cookie('aksearchlis', JSON.stringify( [] ));
		$('.sh_list ul').html('');
	});

	//搜索
	$('#searchForm').submit(function(){
		var val = $.trim($('#searchFields').val());

		if( !val || val === '请输入商品名称、拼音首字母、国药准字' ){
			return false;
		}else {
			gtag('event', '搜索', {
			  'event_category' : '搜索词：' + val
			});
			window.location.href = '/products/list.html?productName='+ encodeURI(val);

			var searchList = $.cookie('aksearchlis')?JSON.parse( $.cookie('aksearchlis')):[];
			var listLength = searchList.length || 0;

			//只存储5条搜索记录			
			if( listLength >= 5 ){
				searchList.splice(0,1);
				listLength = searchList.length;
				$('.sh_list ul li').eq(0).remove();
			};

			//去重
			for( var i=0; i<listLength; i++ ){
				if( searchList[i].ser === val ){
					return;
				};
			};

			//更新
			$('.sh_list ul').append('<li><a href="/list.html?ser_con='+ val +'">'+ val +'</a></li>');
			searchList.push( {ser: val} );
			$.cookie('aksearchlis', JSON.stringify( searchList ));
		};
	});

	//收藏本站
	$('.collectOur').click(function(event) {
		var url = location.href;
		var title = '阿康健康大药房';

		try {
		     window.external.addFavorite(url, title);
		} catch (e) {
		    try {
		         window.sidebar.addPanel(title, url, "");
		    } catch (e) {
		         alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
		    }
		};
	});

	//记录点击的 头部导航
	$('.nav_lists a').click(function(){
		var nav_lists_path = $(this).prop('href');
		$.cookie('nav_lists_path', nav_lists_path);
	});
	for (var i = 0; i < 6; i++) {
		if($('.nav_lists a').eq(i).prop('href') == window.location.href){
			$('.nav_lists a').eq(i).css({'color': '#2FBA66'});
		};
	};
	
	//分类鼠标移入
	$('.sort_list').on('mouseenter', '.list_item', function(){
		$(this).find('.item_childs').stop(true, true).show(300);
	});
	$('.sort_list').on('mouseleave', '.list_item', function(){
		$(this).find('.item_childs').stop(true, true).hide(300);
	});

	//显示热门搜索、搜索记录
	$('#searchFields').focus(function(event) {
		$('.search_history').stop(true,true).fadeIn(300);
	});
	$('#searchFields').blur(function(event) {
		$('.search_history').stop(true,true).fadeOut(300);
	});

	// 搜索记录出现在搜索框内
	if(getQueryString('productName') != null){
		$('#searchFields').val(getQueryString('productName'));
	};

	//获取url参数 -- 中文
	function getQueryString(name) { 
	  	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	  	var r = window.location.search.substr(1).match(reg); 
	  	if (r != null) return decodeURI(r[2]); return null; 
	};
});