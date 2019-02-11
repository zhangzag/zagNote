$(function(){
    //请求地址
    // var webRoot = 'http://113.108.163.210:9999/AKGW-api/v1';
    var webRoot = $.getGlobalVal().webRoot;
    //源地址
    var webOrigin = $.getGlobalVal().webOrigin;
    //当前时间
    var curDate = $.getGlobalVal().curDate;
    //会员Id
    var memberId = $.getGlobalVal().memberId;

    //轮换广告 start
    $('#roteAdv').after("<div class='slider' id='roteAdv_nav' style=''>").cycle({
        prev: '#turnL',
        next: '#turnR',
        // fx:     'slideX',
        fx:     'fade',
        speed:  '300',
        pause: true,
        timeout: 5000,
        pager:  '#roteAdv_nav',
        before: function() { 
            // if (window.console) {
            //     console.log(32323233)
            // }
        //console.log(this.src); 
        },
        pagerAnchorBuilder:function(index,slide){
            var count=index+1;
            if(index==0){
                return '<span id="c'+count+'"  class="cur"></span>'
            }else{
                return '<span  id="c'+count+'"></span>'
            }
        },
        after:function(currSlideElement, nextSlideElement, options, forwardFlag){
            var a= $("#roteAdv_nav").find("span").attr("class","");
            $("#c"+nextSlideElement.id).attr("class","cur");
        }
    });
    /*轮换广告 end*/

    //图片懒加载
    lazyLoad({
        imgSrc: '/images/i_placeholder.gif',
    });
});

//图片过滤
function photosFilter( data ){
    if ( !data || data.length<0 ){
        return '/static/images/ak_300x300.jpg';
    }else{
        return data[0].photoURL;
    }
};