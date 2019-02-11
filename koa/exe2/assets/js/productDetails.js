$(function(){
    var domain = window.location.host;
    domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';

    // var productId = window.location.search.split('=')[1];
    var productNumber = window.location.search.split('=')[1];
    var productId = ''
    // 获取商品
    var productDetail = null;
    $.ajax({
        url: '/products/pro',
        method: 'GET',
        async: false
    })
    .done(function(res){
        console.log(res)
        if( !res.data ){    
            window.history.back()
            return false;
        }
        productDetail = res.data;
        productId = res.data.productID;
    })
    
    $('#zoomContainer .zoomItem li').eq(0).addClass('jxfzoomy-active')
    $('#zoomContainer').jxfZoomy({
        smallBoxW: 400,//小图框的宽 单位px 默认250px
        smallBoxH: 400,//小图框的高 单位px 默认250px
        bigBoxW: 500, //大图放大镜框的宽 单位px 默认350px
        bigBoxH: 500, //大图放大镜框的高 单位px 默认350px
        smallListImgW:66,//缩略图的宽 单位px 默认50px
        smallListImgH:50,//缩略图的高 单位px 默认50px
        moveSpeed:100 //缩略图点击左右方向键移动的速度 单位px 默认50px
    });

    // 数量
    //var productNumber = 1;
    $('.pro-i .reduce').click(function(){
        var productNumber = $.trim($(this).next().val());
        if(!/^[0-9]*$/.test(productNumber)){
            tips('请输入数字',2)
            $(this).next().val(1)
            return false;
        }
        productNumber--;
        productNumber = productNumber < 1 ? 1:productNumber;
        $(this).next().val(productNumber);

        singChange();
        totalMoney();
    }) 
    $('.pro-i .add').click(function(){
        var productNumber = $.trim($(this).prev().val());
        //console.log(productNumber)
        if(!/^[0-9]*$/.test(productNumber)){
            tips('请输入数字',2)
            $(this).prev().val(1)
            return false;
        }
        productNumber++;
        
        // if(productNumber > productDetail.reserves){
        //     productNumber = productDetail.reserves;
        //     tips('没有更多库存了！',null)
        // }
        $(this).prev().val(productNumber);

        singChange();
        totalMoney();
    });

    $('#productNumber').blur(function(){
        var productNumber = $.trim($(this).val());
        if(!/^[0-9]*$/.test(productNumber)){
            tips('请输入数字',2)
            productNumber = 1
        };
        // if(productNumber > productDetail.reserves){
        //     productNumber = productDetail.reserves;
        //     tips('没有更多库存了！',null);
        // };
        $(this).val(productNumber);
        singChange();
        totalMoney();
    });

    // 详情切换
    $('.minute-menu li').click(function(){
        // alert($(this).index())
        $(this).addClass('menu-active').siblings().removeClass('menu-active');
        $('.product-detail .p-detail').eq($(this).index()).css({'display': 'block'}).siblings().css({'display': 'none'});
        if($(this).index() == 2){
            $("#aboutAK").load('/aboutAK.html?n='+Math.random().toFixed(3));
        }
    })
    
    if($.getGlobalVal().memberId){
        getColl($.getGlobalVal().memberId)
    }else{
        $('#collBtn').html('<i class="layui-icon layui-icon-star"></i> 收藏');
    }

    function getColl(memberId){
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/favorite/getFavoriteList',
            url: '/favorite/getFavoriteList',
            type: 'POST',
            dataType: 'json',
            data: {
                memberId: memberId,//会员id
                limit: 100 ,//每页条数
                page: 1,//页数
            },
            success: function(res){
                //console.log(res);
                // 判断 当前会员是否已收藏该商品
                for (var i = 0; i < res.date.length; i++) {
                    if(productId == res.date[i].productID){
                        //$('#collBtn i').removeClass('layui-icon-star').addClass('layui-icon-star-fill');
                        $('#collBtn').html('<i class="layui-icon layui-icon-star-fill"></i> 已收藏');
                        return false;
                    }
                }
                $('#collBtn').html('<i class="layui-icon layui-icon-star"></i> 收藏');
            }
        })
    }
    

    // 收藏
    $('#collBtn').click(function(){
        //console.log(productDetail)
        var memberId = getUser();
        // console.log(memberId)
        if(!memberId){
            // tips('还没登陆喔，请前往登陆！',2);
            var callback = {}
            callback.getColl = getColl
            $.loginAlert(callback);
            return false;
        }
        
        // 取消收藏
        if($(this).find('.layui-icon-star-fill').length > 0){
            $.ajax({
                // url: $.getGlobalVal().webRoot + '/favorite/delFavoriteBymemberIdAndProId',
                url: '/favorite/delFavoriteBymemberIdAndProId',
                type: 'POST',
                dataType: 'json',
                data: {
                    memberId: memberId,//会员id
                    productId: productId,//取消收藏商品id

                },
                success: function(res){
                    //console.log(res);
                    tips(res.msg,1)
                    $('#collBtn').html('<i class="layui-icon layui-icon-star"></i> 收藏');
                },
                error: function(err){
                    // console.log(err);
                }
            })
            return false;
        }
        
        // 收藏
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/favorite/addFavorite',
            url: '/favorite/addFavorite',
            type: 'POST',
            dataType: 'json',
            data: {
                memberID: memberId,//会员id
                productID: productDetail.productID,//收藏商品id
            },
            success: function(res){
                //console.log(res);
                if(res.success){
                    gtag('event', '收藏', {
                      'event_category' : '收藏商品id：' + productDetail.productID
                    });
                    tips(res.msg,1)
                    $('#collBtn').html('<i class="layui-icon layui-icon-star-fill"></i> 已收藏');
                }else{
                    tips(res.msg,2)
                }
                
            },
            error: function(err){
                // console.log(err)
                tips(err.responseJSON.msg,2)
            }
        })
       
    })

    // 需求弹窗
    var demandIndex = null;
    var canDemand = true;
    $('.demand-btn').click(function(){
        if(!/^[0-9]*$/.test($('#productNumber').val())){
            $('#productNumber').val(1)
        }
        var qty = $('#productNumber').val();

        $.require({path: 0,product:productDetail,qty:qty,getColl:getColl,requireGtag:requireGtag});
        
        // var singIndex = $('.singleMeal .liaoCheng .active').attr('index');
        
        // if(singIndex){
        //     // console.log()
        //     $.require({path: 6,singleMeal: singleDetail[singIndex],product:productDetail,qty:qty,getColl:getColl,requireGtag:requireGtag});
        // }else{
        //     // console.log('商品');
        //     $.require({path: 0,product:productDetail,qty:qty,getColl:getColl,requireGtag:requireGtag});
        // }
        return false;
    })


    // 立即购买
    $('#nowBuy').click(function(){
        var memberId = getUser();
        if(!memberId){
            var callback = {}
            callback.getColl = getColl;
            $.loginAlert(callback);
            // tips('还没登陆喔，请前往登陆！',2);
            return false;
        }
        //console.log(productDetail.reserves)
        // if(productDetail.reserves <= 0){
        //     tips('此商品缺货，紧急备货中',null)
        //     return false;
        // }
        if(!/^[0-9]*$/.test($.trim($('#productNumber').val()))){
            tips('请输入数字',2)
            $('#productNumber').val(1)
            return false;
        }
        // if($.trim($('#productNumber').val()) >  productDetail.reserves){
        //     tips('库存不足',null);
        //     $('#productNumber').val(productDetail.reserves)
        //     return false;
        // }
        gtag('event', '点击立即购买', {
          'event_category' : '点击立即购买商品id：' + productDetail.productID
        });
        //window.location.href = '/submitOrder.html?productId='+productDetail.productID+'&count='+Number($('#productNumber').val());
        //console.log(productDetail)

        
        var singIndex = $('.singleMeal .liaoCheng .active').attr('index');
        
        if(singIndex){
            //console.log('疗程');
            var disMoney = Number($('.you span').html().split('￥')[1]);
            // window.location.href = '/submitOrder.html?productId='+productId +'&packageID='+singleDetail[singIndex].packageID+'&packageIndex='+singIndex+'&singleQty='+Number($('#productNumber').val());
            window.location.href = '/submitOrder.html';
            $.cookie('order',JSON.stringify({orderType:2,productId:productId,qty:Number($('#productNumber').val()),packageID:singleDetail[singIndex].packageID,index:singIndex,discountMoney:disMoney}),{  path:'/', domain:domain, /*secure:true*/});
        }else{
            //console.log('商品');
            //window.location.href = '/submitOrder.html?productId='+productDetail.productID+'&count='+Number($('#productNumber').val());
            window.location.href = '/submitOrder.html';
            $.cookie('order',JSON.stringify({orderType:1,productId:productId,qty:Number($('#productNumber').val())}),{  path:'/', domain:domain, /*secure:true*/});
           
        }

        


    })

    // 套餐
    var setmealList = null;
    $.ajax({
        // url: $.getGlobalVal().webRoot + "/getComboByProductId",
        url: "/getComboByProductId",
        type:"POST",
        dataType: "json",
        data:{
            productID: productId
        },
        success: function(res){
            if (!res.success || res.data.length <= 0 ){
                $('.setmeal-wrap').css({'display': 'none'});
                return false;
            };
            setmealList = res.data;
            $('.setmeal-wrap').css({'display': 'block'});

            var setTitleEle = '';
            for (var i = 0; i < 5; i++) {
                if(!setmealList[i]){break}
                setTitleEle += '<li>'+setmealList[i].packageName+'</li>'
            }
            $('.setTitle ul').html(setTitleEle);
            $('.setTitle ul').find("li").eq(0).addClass("active");

            getMeal(setmealList[0],0);
        },
        error: function(err){
            // console.log(err);
            $('.setmeal-wrap').css({'display': 'none'});
        }
    })

    // 套餐切换
    $('.setTitle ul').on('click','li',function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        getMeal(setmealList[index],$(this).index());
    })

    // 获取哪个套餐
    var mealProList = null;
    function getMeal(meal,packageIndex){
        // console.log(meal);
        var combo = meal;

        $('.setmeal').attr({"packageID":combo.packageID,"productId":productId,"packageIndex":packageIndex});
        $('.setmeal-r .taoPri span').html(priceInit(combo.afterBenefitCost));
        $('.setmeal-r .oldPri').html('￥'+ priceInit(combo.oldCost));
        
        $('.setmeal .docSay h3').html(combo.packageName);
        $('.setmeal .sayContent p').html(combo.useDesc?combo.useDesc:'暂无点评');
        // 获取 套餐详情
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/getComboDetailByPackageId',
            url: '/getComboDetailByPackageId',
            type: 'POST',
            dataType: 'json',
            data: {
                packageID: combo.packageID
            },
            success: function(res){
                // console.log('套餐详情',res);
                var comPro = res.data;
                mealProList = res.data;
                var comItem = '';
                // var mealBtn = '<button class="mealBtn">立即购买</button>';
                var mealBtn = '<button class="mealDemand">需求登记</button>';
                for (var i = 0; i < comPro.length; i++) {
                    var comProPhoto = ''
                    comProPhoto = comPro[i].photodURL ? comPro[i].photodURL:'/static/images/ak_200x200.jpg';
                    comItem += '<li><a href="/products/'+comPro[i].productID+'.html"><img src="'+comProPhoto+'" /></a><div class="name">'+comPro[i].productName+'</div><div class="mealProInfo"><span class="price">￥ '+priceInit(comPro[i].price)+'</span><span class="count">x'+comPro[i].qty+'件</span></div></li>'
                    
                    // if (comPro[i].prescriptionType==1) {
                    //     mealBtn = '<button class="mealDemand">需求登记</button>'
                    // }else{
                    //     continue;
                    // }

                }
                $('.featur_pro').html(comItem);
                $('.mealBtnWrap').html(mealBtn);
                // 套餐 轮播图    
                var page = 0; // 当前页
                var num = comPro.length; // 长度
                // 判断 切换按钮是否出现，4：每页显示商品数
                if(num <= 4){
                    $('#feature_next').css({"display":"none"});
                    $('#feature_prev').css({"display":"none"});
                }else{
                    $('#feature_next').css({"display":"block"});
                    $('#feature_prev').css({"display":"block"});
                }

                $('.featur_pro').css({left:"0px"});
                //下一页
                $('#feature_next').click(function(event) {
                    // console.log('下一页: ', page)
                    if( page >= comPro.length-4 ){return}
                    page++;
                    $('.featur_pro').animate({left: -215*page},300);
                });
                //上一页
                $('#feature_prev').click(function(event) {
                    // console.log('上一页: ', page)
                    if( !page ){return}
                    page--;
                    $('.featur_pro').animate({left: -215*page},300);
                });
            },
            error: function(err){
                // console.log(err)
            }
        })
    }

    // 套餐需求登记
    $('.mealBtnWrap').on('click','.mealDemand',function(){
        var packageIndex =  $('.setmeal').attr("packageIndex");
        var meal = setmealList[packageIndex];
        var productList = mealProList;
        // console.log(meal,productList)
        $.require({path: 5,meal:meal,product:productList,qty:1,getColl:getColl,requireGtag:requireGtag});
    })

    // 套餐 立即购买
    // $('.mealBtnWrap').on('click','.mealBtn',function(){
    //     var memberId = getUser();
    //     if(!memberId){
    //         var callback = {}
    //         callback.getColl = getColl;
    //         $.loginAlert(callback);
    //         // tips('还没登陆喔，请前往登陆！',2);
    //         return false;
    //     }
    //     var packageID = $('.setmeal').attr("packageID");
    //     var productId = $('.setmeal').attr("productId");
    //     var packageIndex =  $('.setmeal').attr("packageIndex");
    //     // window.location.href = '/submitOrder.html?productId='+productId +'&packageID='+packageID+'&packageIndex='+packageIndex;
    //     window.location.href = '/submitOrder.html';
    //     $.cookie('order',JSON.stringify({orderType:3,productId:productId,qty:1,packageID:packageID,index:packageIndex}),{  path:'/', domain:domain, /*secure:true*/});

    // })    

    // 疗程装
    var singleDetail = null;
    $.ajax({
        // url: $.getGlobalVal().webRoot + '/getSingleComboByProductId',
        url: '/getSingleComboByProductId',
        // url: 'http://192.168.2.66:8080/AKGW-api/v1/getSingleComboByProductId?productID=120',
        type: 'POST',
        dataType:'json',
        data: {
            productID: productId
        },
        success: function(res){
            // console.log(res);
            if (!res.success || res.data.length <= 0 ){
                $('.singleMeal').css({'display': 'none'});
                return false;
            };
            var singleRes = res.data[0];
            $.ajax({
                // url: $.getGlobalVal().webRoot + '/getComboDetailByPackageId',
                url: '/getComboDetailByPackageId',
                type: 'POST',
                dataType: 'json',
                data: {
                    packageID: res.data[0].packageID
                },
                success: function(res2){
                    if (!res2.success || res2.data.length <= 0 ){
                        $('.singleMeal').css({'display': 'none'});
                        return false;
                    };
                    // $('.buy-btn').css({'display':'none'});
                    // $('.demand-btn').css({'display':'inline-block'});

                    $('.singleMeal').css({'display': 'block'});
                    singleDetail = res2.data;
                    var singleModule = ''
                    for (var i = 0; i < singleDetail.length; i++) {
                        singleModule += '<span packageID="'+singleDetail[i].packageID+'" index="'+i+'" qty="'+singleDetail[i].qty+'" qtyEnd="'+singleDetail[i].qtyEnd+'" oldPrice="'+singleDetail[i].ourPrice+'" newPrice="'+singleDetail[i].price+'">'+(singleDetail[i].detailpackageName?singleDetail[i].detailpackageName:'')+'</span>';
                    }
                    $('.singleMeal .liaoCheng').html(singleModule);
                    // $('.singleMeal .liaoCheng button').eq(0).addClass('active');
                    singChange();
                    totalMoney();
                },
                error: function(err1){
                    console.log(err1)
                }
            })
        },
        error: function(err){
            console.log(err)
        }
    })


    // 选择疗程
    $('.singleMeal').off('click','.liaoCheng span').on('click','.liaoCheng span',function(){
        var qty = Number($(this).attr('qty'));

        if ($(this).hasClass('active')) {
            $(this).removeClass('active').siblings().removeClass('active');
            qty = 1;
        }else{
            $(this).addClass('active').siblings().removeClass('active');
            qty = Number($(this).attr('qty'));
        }
        
        
        // if(qty > productDetail.reserves){
        //     qty = productDetail.reserves;
        //     tips('没有更多库存了！',null)
        // }
        $('#productNumber').val(qty);
        singChange();
        totalMoney();
    });

    // 点击数量时 判断是那个疗程
    function singChange(){
        var singList = $('.pro-r .singleMeal .liaoCheng span');
        var value = Number($('#productNumber').val());
        var index = ''

        for (var i = 0; i < singList.length; i++) {
            var qty = Number(singList.eq(i).attr('qty'));
            var qtyEnd = Number(singList.eq(i).attr('qtyEnd'));
            // console.log()
            if(value >= qty && value <= qtyEnd){
                index = singList.eq(i).attr('index');
            }else{
                continue;
            }
        }
        // console.log(index);
        if (index != '') {
            singList.eq(index).addClass('active').siblings().removeClass('active');
        }else if(index == ''){
            singList.removeClass('active');
        }
        
    }

    // 合计
    function totalMoney(){
        // var oldPrice = oldPrice || 0;
        // var newPrice = newPrice || 0;
        // var qty = qty || 1;
        var isLiao =  $('.liaoCheng .active').attr('index');
        // console.log(isLiao,111);

        if(!isLiao){
            $('#liao').html('<span>本店价</span><p class="we">￥ <span>'+priceInit(Number(productDetail.ourPrice))+'</span></p>');
            
            return false;
        };

        var qty = Number($('#productNumber').val());

        var oldPrice = Number($('.liaoCheng .active').attr('oldPrice')) || productDetail.ourPrice;
        var newPrice = Number($('.liaoCheng .active').attr('newPrice')) || productDetail.ourPrice;
        
        // 合计
        var newMoney = (newPrice*qty).toFixed(2);
        var oldMoney = (oldPrice*qty).toFixed(2);
        var discountMoney = (oldMoney - newMoney).toFixed(2);
        // $('.pro-i .he span').html(newMoney);
        // $('.pro-i .you span').html('￥'+discountMoney);
        $('#liao').html('<span>疗程价</span><p class="he">￥ <span>'+newMoney+'</span></p><p class="you">优惠<span>￥'+discountMoney+'</span></p>');
    }
})

function tips(tipsText,icon){
    layui.use('layer',function(){
        layer.msg(tipsText,{
            icon: icon,
            time: 1000,
            // area: ['200px','60px']
        })
    })
}

// 价格格式化
function priceInit(price){
    var x = String(price).indexOf('.') + 1;   //小数点的位置
    var y = String(price).length - x;  //小数的位数
    if(String(price).indexOf('.') == -1){ // 不存在小数点
        return price + '.00';
    }else if(y<=1){ // 一位小数
        return price + '0';
    }
    return price;
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

// 图片格式化
function imgSrcInit(imgSrc){
    if(imgSrc === '' || null){
        return '/static/images/ak_200x200.jpg'
    }
    if(imgSrc.indexOf('http://192.168.2.250:8081') == -1){
        return 'http://192.168.2.250:8081' + imgSrc
    }
    return imgSrc;
}

// 需求统计
function requireGtag(param){
    var title = param.title || '提交需求登记';
    var content = param.content || {};
    // console.log(param)
    gtag('event', title , content);
}