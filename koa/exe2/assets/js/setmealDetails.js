$(function(){
	var packageID = getQueryString('packageID');
	var productId = getQueryString('productId');
    var packageIndex = getQueryString('packageIndex');
	// $.ajax({
	// 	url: $.getGlobalVal().webRoot + "/getOneComboByProductId",
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	data: {
	// 		productID: productId
	// 	},
	// 	success: function(res){
	// 		// console.log('套餐',res);
	// 		if (!res.success || res.data === null) return false;
	// 		var meal = res.data;
	// 		$('.meal-r .meal-info>img').attr('src',imgSrcInit(meal.photodURL));
	// 		$('.meal-r .meal-text span').html(meal.packageName);
	// 		$('.meal-r .meal-pri .payPri span').html(meal.afterBenefitCost);
	// 		$('.meal-r .meal-pri .oldPri').html('￥'+meal.oldCost);
	// 		$('.crumbs span').html(meal.packageName);

	// 		// 获取 套餐详情
 //            $.ajax({
 //                url: $.getGlobalVal().webRoot + '/getComboDetailByPackageId',
 //                type: 'POST',
 //                dataType: 'json',
 //                data: {
 //                    packageID: meal.packageID
 //                },
 //                success: function(res){
 //                    // console.log('套餐详情',res);
 //                    var packageDetail = res.data;

 //                    var packageItem = '';
 //                    var qty = 0; //数量
 //                    for (var i = 0; i < packageDetail.length; i++) {
 //                    	qty += packageDetail[i].qty;
 //                        var packagePhoto = ''
 //                        var packagePhoto = packageDetail[i].photodURL ? packageDetail[i].photodURL:'/static/images/ak_200x200.jpg';
 //                        packageItem += '<div class="meal-item"><a href="/products/'+packageDetail[i].productID+'.html"><img src="'+packagePhoto+'"></a><div class="meal-info"><h6><i class="'+$.imgType(packageDetail[i].prescriptionType)+'"></i><a href="/products/'+packageDetail[i].productID+'.html">'+packageDetail[i].productName+'</a></h6><p>数量：'+packageDetail[i].qty+'</p><p>单价：'+packageDetail[i].price+'</p></div></div>'
                            
 //                    }
 //                    $('.meal-l .meal-product').html(packageItem);
 //                    $('.meal-l h3 .productType').html(packageDetail.length);
 //                    $('.meal-l h3 .qty').html(qty);
 //                },
 //                error: function(err){
 //                    console.log(err)
 //                }
 //            })
	// 	}
	// })

    $.ajax({
        url: $.getGlobalVal().webRoot + "/getComboByProductId",
        type: 'POST',
        dataType: 'json',
        data: {
            productID: productId
        },
        success: function(res){
            // console.log('套餐',res);
            if (!res.success || res.data === null) return false;
            var meal = res.data[packageIndex];
            $('.meal-r .meal-info>img').attr('src',imgSrcInit(meal.photodURL));
            $('.meal-r .meal-text span').html(meal.packageName);
            $('.meal-r .meal-pri .payPri span').html(meal.afterBenefitCost);
            $('.meal-r .meal-pri .oldPri').html('￥'+meal.oldCost);
            $('.crumbs span').html(meal.packageName);

            // 获取 套餐详情
            $.ajax({
                url: $.getGlobalVal().webRoot + '/getComboDetailByPackageId',
                type: 'POST',
                dataType: 'json',
                data: {
                    packageID: meal.packageID
                },
                success: function(res){
                    // console.log('套餐详情',res);
                    var packageDetail = res.data;

                    var packageItem = '';
                    var qty = 0; //数量
                    for (var i = 0; i < packageDetail.length; i++) {
                        qty += packageDetail[i].qty;
                        var packagePhoto = ''
                        var packagePhoto = packageDetail[i].photodURL ? packageDetail[i].photodURL:'/static/images/ak_200x200.jpg';
                        packageItem += '<div class="meal-item"><a href="/products/'+packageDetail[i].productID+'.html"><img src="'+packagePhoto+'"></a><div class="meal-info"><h6><i class="'+$.imgType(packageDetail[i].prescriptionType)+'"></i><a href="/products/'+packageDetail[i].productID+'.html">'+packageDetail[i].productName+'</a></h6><p>数量：'+packageDetail[i].qty+'</p><p>单价：'+packageDetail[i].price+'</p></div></div>'
                            
                    }
                    $('.meal-l .meal-product').html(packageItem);
                    $('.meal-l h3 .productType').html(packageDetail.length);
                    $('.meal-l h3 .qty').html(qty);
                },
                error: function(err){
                    console.log(err)
                }
            })
        }
    })


	// 立即购买
    var loginLayui = null;
	$('.buyBtn').click(function(){
        var memberId = getUser();
        if(!memberId){
            // 登录 弹窗 出现
            layui.use('layer',function(){
                var layer = layui.layer;
                loginLayui = layer.open({
                    type: 1,
                    title: '会员登录',
                    content: $('#loginAlert'),
                    area: '500px',
                })
            })
            // tips('还没登陆喔，请前往登陆！',2);
            return false;
        }
		window.location.href = '/submitOrder.html?productId='+productId +'&packageID='+packageID+'&packageIndex='+packageIndex
	})
    
    // 登录
    $('#loginAlert button').click(function(){
        var userName = $.trim($('#loginUser').val());
        var password = $.trim($('#loginPass').val());
        if(!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(userName)){
            tips('手机格式不正确，请重新输入',2);
            return false;
        }
        $.ajax({
            url: $.getGlobalVal().webRoot + '/login',
            type: 'POST',
            dataType: 'json',
            data: {
                username: userName,//用户名
                password: password,//用户密码
            },
        }).done(function(res){
            // console.log('登陆',res);
            if(res.success === true){
                $.cookie('memberId', JSON.stringify( res.memberID ),{
                    expires: 7,
                    path:'/'
                });
                layer.close(loginLayui);
                tips('欢迎来到阿康健康！',1)
                $("#top").load('/module/common/top.html?n='+Math.random().toFixed(3));
                $.authorization(res.memberID);
            }
        })
    })
})

//获取url参数 -- 中文
function getQueryString(name) { 
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	  var r = window.location.search.substr(1).match(reg); 
	  if (r != null) return decodeURI(r[2]); return null; 
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

// 获取cookie 会员id
function getUser(){
    var arrstr = document.cookie.split("; ");
    //console.log(arrstr)
    for(var i = 0;i < arrstr.length;i ++){
        var temp = arrstr[i].split("=");
        if(temp[0] == 'memberId' && temp[1] != 'null') return unescape(temp[1]);
    }
}

// 提示
function tips(tipsText,icon){
    layui.use('layer',function(){
        layer.msg(tipsText,{
            icon: icon,
            time: 1000,
            // area: ['200px','60px']
        })
    })
}