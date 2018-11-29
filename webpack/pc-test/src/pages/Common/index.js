require('@/assets/style/common.css');
import { webRoot, curDate } from '@/assets/js/globalDefine.js';
import { renderHtml } from '@/util/util.js';
import { getCategory, getHotSearc } from 'apis/header';
//分类模块
import categoryHtml from './category.hbs';
import Cookies from 'js-cookie';

$(function(){

    //获取分类
    getCategory()
    .then(res=>{
        // console.log("获取分类", res);
        if( res.data && res.data.length>0 ){
			let datas = res.data;
            let categoryHtmlString = renderHtml(categoryHtml, {data: datas});

            //挂载分类
            $('.sort_list').html(categoryHtmlString);
		}else{
			console.log("获取分类失败");
		};
    })
    .catch(err=>{
        console.log('获取科室失败，', err)
    });
    // 获取分类 end

    //获取热门搜索
    getHotSearc()
    .then(res=>{
        console.log("获取分类", res);
    })
    .catch(err=>{
        console.log('获取热门搜索失败，', err)
    });
    //获取热门搜索 end

	
	//从cookie获取搜索记录
	if( Cookies.get('aksearchlis') ){
		var searchList = JSON.parse( Cookies.get('aksearchlis'));
		for( var i=0; i<searchList.length; i++ ){
			$('.sh_list ul').append('<li><a href="/list.html?productName='+encodeURI(searchList[i].ser)+'">'+ searchList[i].ser +'</a></li>');
			// $('.sh_list ul').append('<li><a href="/list.html?ser_con='+ searchList[i].ser +'">'+ searchList[i].ser +'</a></li>');
		};
	};

	$('.clearAksearchlis').click(function(){
		Cookies.set('aksearchlis', JSON.stringify( [] ));
		$('.sh_list ul').html('');
	});

	//搜索
	$('#searchForm').submit(function(){
		let val = $.trim($('#searchFields').val());

		if( !val || val === '请输入商品名称、拼音首字母、国药准字' ){
			return false;
		}else {
			// gtag('event', '搜索', {
			//   'event_category' : '搜索词：' + val
			// });
			// window.location.href = '/list.html?productName='+ encodeURI(val);

			// var searchList = $.cookie('aksearchlis')?JSON.parse( $.cookie('aksearchlis')):[];
			let searchList = Cookies.get('aksearchlis')?JSON.parse( Cookies.get('aksearchlis') ):[];
			let listLength = searchList.length || 0;

			console.log('searchList: ', searchList)
			console.log('listLength: ', listLength)
			//只存储5条搜索记录			
			if( listLength >= 5 ){
				searchList.splice(0,1);
				listLength = searchList.length;
				$('.sh_list ul li').eq(0).remove();
			};

			//去重
			for( let v of searchList ){
				if( v.ser === val ){
					return;
				}
			};

			//更新
			$('.sh_list ul').append('<li><a href="/list.html?ser_con='+ val +'">'+ val +'</a></li>');
			searchList.push( {ser: val} );
			Cookies.set('aksearchlis', JSON.stringify( searchList ));
		};
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
});