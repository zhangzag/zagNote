$(document).ready(function(){ 
	
	//低版本提示
	$('body').on('click', '.lowVersion .lowVersionIn>i', function(event) {
		event.preventDefault();
		$('.lowVersion').stop(true,true).slideUp(300);
	});
	//IE9以下给出低版本提示
	if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
		$('body').prepend('<div class="lowVersion">\
								<div class="lowVersionIn">\
									<p>您的浏览器版本过低，已影响部分重要功能的使用，推荐安装最新版浏览器。</p>\
									<i>X</i>\
								</div>\
							</div>');
        $('.lowVersion').stop(true,true).slideDown(300);
    }
});

//图片懒加载
// placeholder : "img/grey.gif",     //用图片提前占位
// effect : "fadeIn",    //载入使用何种效果,effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
// threshold : 200,    //提前开始加载
// event : "click",      //事件触发时才加载,event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标划过或点击图片才开始加载,后两个值未测试…
// failurelimit : 10,     //图片排序混乱时 ,
// failurelimit,值为数字.
var lazyLoad = function( param ){
	//替代图片
	var imgSrc = param.imgSrc?param.imgSrc:"/static/images/myImg.png";
	//提前加载
	var threshold = param.threshold?param:0;
	//载入效果
	var effect = param.effect?param.effect:'fadeIn';

	$("img.lazy").lazyload({
	  placeholder : imgSrc, //用图片提前占位
	    // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
	  effect: effect, // 载入使用何种效果
	    // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
	  threshold: threshold, // 提前开始加载
	});	
};