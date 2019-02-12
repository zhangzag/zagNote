
$(function(){
    var domain = window.location.host;
    domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';

    //图片懒加载
    lazyLoad({
        imgSrc: '/images/ak_300x300.jpg',
    });

    //轮换广告 start
    $('#roteAdv').after("<div class='slider' id='roteAdv_nav' style=''>").cycle({
        prev: '#turnL',
        next: '#turnR',
        fx:     'fade',
        speed:  '300',
        timeout: 5000,
        pager:  '#roteAdv_nav',
        before: function() { 
            // if (window.console) {
            //     console.log(32323233)
            // }
        //console.log(this.src); 
        },
        pagerAnchorBuilder: function(index,slide){
            var count=index+1;
            if(index==0){
                return '<span id="c'+count+'"  class="cur"></span>'
            }else{
                return '<span  id="c'+count+'"></span>'
            }
        },
        after: function(currSlideElement, nextSlideElement, options, forwardFlag){
            var a= $("#roteAdv_nav").find("span").attr("class","");
            $("#c" + nextSlideElement.id).attr("class","cur");
        }
    });
    /*轮换广告 end*/
});