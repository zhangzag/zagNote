
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

    $('.pro-wrap').on('click','.reduce',function(){
        var num = Number($(this).next().val());
        if(!/^[0-9]*$/.test(num)){
            tips('请输入数字',2);
            $(this).next().val(1);
            return false;
        };
        num--;
        num = num <= 1 ? 1:num;
        $(this).next().val(num);
    });

    $('.pro-wrap').on('click','.add',function(){ 
        var num = Number($(this).prev().val());
        // console.log(num)
        if(!/^[0-9]*$/.test(num)){
            tips('请输入数字',2);
            $(this).prev().val(1);
            return false;
        };
        num++;
        // if(num > Number($(this).prev().attr('maxStore'))){
        //     num = $(this).prev().attr('maxStore');
        //     tips('没有更多库存了！',null)
        // };
        $(this).prev().val(num);
    });
    
    // 需求弹窗
    $('.pro-wrap').on('click','.demand-btn',function(){
		var productNumber = $(this).attr('data-proNum') || '';

		if(!productNumber&&productNumber!=0){
			tips('获取商品信息失败',2);
			return;
		}

		var count = $.trim($(this).siblings('.buy').find('.num-wrap .num').val());
        if(!/^[0-9]*$/.test(count)){
            count = 1;
        };
        $(this).siblings('.buy').find('.num-wrap .num').val(count);
		
		$.ajax({
			// url: $.getGlobalVal().webRoot + '/product/findProductByProductNumber',
			url: '/product/findProductByProductNumber',
			data: {
				productNumber: productNumber
			}
		})
		.done(function(res){
			// console.log(res)
			if(res.data == null){    
				tips(res.msg, 2);
				return false;
			}

			var productInfor = res.data;
			$.require({path: 1,product:productInfor,qty: count,requireGtag:requireGtag})
		})
        
    });

    // 立即购买
    $('.pro-wrap').on('click','.buy-btn',function(){
        var count = $.trim($(this).prev().find('.num-wrap .num').val()),
            productId = $(this).parent().attr('productId');
            // console.log(productId,count)

        if(!/^[0-9]*$/.test(count)){
            tips('请输入数字',2);
            $(this).prev().find('.num-wrap .num').val(1);
            return false;
        };
        // 判断是否登录
        var memberId = getUser();
        if(!memberId){
            $.loginAlert();
            // tips('还没登陆喔，请前往登陆！',2);
            return false;
        };
        // if($(this).prev().find('.num').attr('maxStore') == 0){
        //     tips('此商品缺货，紧急备货中！',2);
        //     return false;
        // };
        // if(count >  $(this).prev().find('.num').attr('maxStore')){
        //     tips('库存不足',null);
        //     $(this).prev().find('.num').val($(this).prev().find('.num').attr('maxStore'));
        //     return false;
        // };

        gtag('event', '点击立即购买', {
          'event_category' : '商品id：' + productId
        });
        //window.location.href = '/submitOrder.html?productId='+productId+'&count='+count;
        window.location.href = '/submitOrder.html';
        $.cookie('order',JSON.stringify({orderType:1,productId:productId,qty:Number(count)}),{  path:'/', domain:domain, /*secure:true*/});
    });

    // 登录弹窗 出现
    var loginLayui = null;
    $('#loginShow').click(function(){
        // getdefault(15603);
        if($.getGlobalVal().memberId){
            return false;
        }
        var callback = {};
        callback.getdefault = getdefault;
        $.loginAlert(callback);
    });

});

function imgUrl(imgUrl){
// "http://113.108.163.210:9999/upLoadProduct/15317125707382018-07-16-11-42-50.png"

    // if(imgUrl.indexOf('http://113.108.163.210:9999') != -1){
    //     return imgUrl.replace('http://113.108.163.210:9999','http://192.168.2.250:8081')
    // }
    // if(imgUrl.indexOf('http://localhost:8081') != -1){
    //     return imgUrl.replace('http://localhost:8081','')       
    // }
    // if(imgUrl.indexOf('http://localhost:80') != -1){
    //     return imgUrl.replace('http://localhost:80','http://113.108.163.210:9999')
    // }
    return imgUrl;
};

function proudctNameInit(productName){
    // 【RX】【多盒优惠】新港 依斯坦 依西美坦片 25mg*10片*1瓶/盒
    // if(productName.indexOf('】') != -1){
    //    //console.log(productName.lastIndexOf('】'))
    //    productName = productName.substring(productName.lastIndexOf('】')+1)
    // }
    return $.trim(productName);
};

function tips(tipsText,icon){
    layui.use('layer',function(){
        layer.msg(tipsText,{
            icon: icon,
            time: 1000
        })
    })
};

// 获取cookie 会员id
function getUser(){
    var arrstr = document.cookie.split("; ");
    //console.log(arrstr)
    for(var i = 0;i < arrstr.length;i ++){
        var temp = arrstr[i].split("=");
        if(temp[0] == 'memberId' && temp[1] != 'null') return unescape(temp[1]);
    }
};

// 需求统计
function requireGtag(param){
    var title = param.title || '提交需求登记';
    var content = param.content || {};
    // console.log(param)
    gtag('event', title , content);
}