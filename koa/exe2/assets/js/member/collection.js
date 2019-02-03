$(function(){
	// 编辑出现
	$('.edit-w .edit-t').click(function(){
		if($('.nothing').css('display') == 'block'){
			return false;
		}

		$(this).css({'display': 'none'}).siblings().css({'display': 'inline-block'});
		$('.list-tab .info label').css({'display':'inline-block'});
		$('.item .item-info label').css({'display':'inline-block'})
		$('.item .item-options p').css({'display': 'block'}).siblings().css({'display': 'none'})
		//$(this).remove();
	})

	//全选
	$('.list-tab .info input').click(function(){
		if($(this).prop('checked')){
			$(this).next().html('✔');
            $('.item .item-info input').prop('checked',true);
            $('.item .item-info input').next().html('✔');
        }else{
        	$(this).next().html('');
           	$('.item .item-info input').prop('checked',false);
           	$('.item .item-info input').next().html('');
        }
	})
	// 反全选
	$(".item-w").on('click','.item input[type="checkbox"]',function(){
		var subCheck = $(".item-w input[type='checkbox']").length; //总条数
		var checkedsub = $(".item-w input[type='checkbox']:checked").length; // 选中个数
		if($(this).prop('checked')){
			$(this).next().html('✔');
		}else{
			$(this).next().html('');
		}
		if(checkedsub == subCheck){
            $('.list-tab .info input').prop('checked',true);
            $('.list-tab .info label .checkSpan').html('✔');
        }else{
            $('.list-tab .info input').prop('checked',false);
            $('.list-tab .info label .checkSpan').html('');
        }
	})


	// $('.item .item-options p').click(function(){
	// 	layui.use('layer',function(){
 //            layer.open({
 //                type: 1,
 //                area: ['306px','210px'],
 //                title: ['提示','background-color: #E8E8E8;'],
 //                content: $('#sureAlert'),
 //                cancel: function(){

 //                }
 //            })
 //        })
	// })

	// 获取 收藏
	var collCount = null;
	var collList = null;
	function renderTable(pageSize,again){
		$.ajax({
			// url: $.getGlobalVal().webRoot + '/favorite/getFavoriteList',
			url: '/favorite/getFavoriteList',
			type: 'POST',
			dataType: 'json',
			data:{
				memberId: $.getGlobalVal().memberId,//会员id
				limit: 10 ,//每页条数
				page: pageSize,//页数
			},
			success: function(res){
				//console.log(res,222);
				collCount = res.count;
				collList = res.date;
				$('.collCount b').html(res.count)
				if(res.date.length <= 0){
					$('.nothing').css({'display': 'block'});
					$('.item-w').css({'display': 'none'});
					return false;
				}
				$('.nothing').css({'display': 'none'});
				$('.list-w .item-w').html('').css({'display': 'block'});
				for (var i = 0; i < res.date.length; i++) {
					if(res.date[i].product == null){
						$('.list-w .item-w').append('<div class="item" collIndex="'+i+'" favoriteID="'+res.date[i].favoriteID+'" productId="'+res.date[i].productID+'" ><div class="item-info"><label><input type="checkbox" value="" /><span class="checkSpan"></span></label><div class="info-img"><img src="/static/images/ak_300x300.jpg"></div><div class="info-text"><p class="name">该商品不存在，或已下架！</p></div></div></div>')
						continue;
					}
					var isKu = res.date[i].product.reserves>0 ? '有货' : '没货';
					var isBuy = null;
					if(res.date[i].product.reserves>0){
						if(res.date[i].product.prescriptionType == 1){
							isBuy = '<button class="demand-btn">需求登记</button>';
						}else{
							isBuy = '<button class="has-btn">立即购买</button>';
						}
					}else{
						isBuy = '<button class="no-btn">补货中</button>';
					}

					var collItem = '<div class="item" collIndex="'+i+'" favoriteID="'+res.date[i].favoriteID+'" productId="'+res.date[i].product.productID+'" > \
							<div class="item-info"> \
								<label> \
									<input type="checkbox" value="" /> \
									<span class="checkSpan"></span> \
								</label> \
								<div class="info-img"><a href="/products/'+res.date[i].product.productID+'.html"><img src="' + imgSrcInit(res.date[i].product.photodURL)+'"></a></div> \
								<div class="info-text"> \
									<p class="name"> \
										<i class="'+$.imgType(res.date[i].product.prescriptionType)+'"></i> \
										'+res.date[i].product.productName+'\
									</p> \
									<p class="gui">'+res.date[i].product.spec+'</p> \
								</div> \
							</div> \
							<div class="item-pri">'+res.date[i].product.ourPrice+'</div> \
							<div class="item-ku">'+isKu+'</div> \
							<div class="item-options"> \
								<p class="cancelColl">取消收藏</p> \
								'+isBuy+' \
							</div> \
						</div>' ;
					$('.list-w .item-w').append(collItem)
				}
				if(again){
					$('.item .item-info label').css({'display':'inline-block'})
					$('.item .item-options p').css({'display': 'block'}).siblings().css({'display': 'none'})
				}
			},
			error: function(err){
				console.log(err)
			}
		})
	};
	

	// 分页
	function getPage(){
		$.ajax({
			// url: $.getGlobalVal().webRoot + '/favorite/getFavoriteList',
			url: '/favorite/getFavoriteList',
			type: 'POST',
			dataType: 'json',
			data:{
				memberId: $.getGlobalVal().memberId,//会员id
				limit: 10 ,//每页条数
				page: 1,//页数
			},
			async: false
		}).done(function(res){
			// console.log(res)
			if(res.count <= 0){
				$('.nothing').css({'display': 'block'});
				$('.item-w').css({'display': 'none'});
				$('.edit-w .edit-t').css({'display': 'inline-block'}).siblings().css({'display': 'none'});
				$('.list-tab .info label').css({'display':'none'});
				$('.item .item-info label').css({'display':'none'});
				$('.item .item-options p').css({'display': 'none'}).siblings().css({'display': 'block'});
				$('#page').css({'display': 'none'});
				$('.collCount b').html(res.count);
				return false;
			}
			$('#page').css({'display': 'block'});
			layui.use('laypage', function(){
				var laypage = layui.laypage;
				//执行一个laypage实例
				laypage.render({
					elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
					count: res.count, //数据总数，从服务端得到
					limit: 10, //每页显示的条数
					layout: ['page', 'prev', 'next'], //自定义排版
					theme: '#a7a7a7', // 主题
					jump: function(obj,first){ //切换分页的回调
						//console.log(obj);
						//console.log(first);
						if($('.edit-w .edit-t').css('display') == 'none'){
							renderTable(obj.curr,2);
						}else{
							renderTable(obj.curr);
						}
					}
				});
			});
		})
	}
	getPage();
	// 取消收藏
	var collAlert = null;
	$('.list-w .item-w').on('click','.item-options .cancelColl',function(){
		layui.use('layer',function(){
            collAlert = layer.open({
                type: 1,
                area: ['306px','210px'],
                title: ['提示','background-color: #E8E8E8;'],
                content: $('#sureAlert'),
                cancel: function(){

                }
            })
        })
        $(this).parent().parent().addClass('cancelItem').siblings().removeClass('cancelItem');
	})
	// 确定
	$('#sureAlert .sure').click(function(){
		 layer.close(collAlert);
		 $.ajax({
		 	// url: $.getGlobalVal().webRoot + '/favorite/delFavoriteBymemberIdAndProId',
		 	url: '/favorite/delFavoriteBymemberIdAndProId',
		 	type: 'POST',
		 	dataType: 'json',
		 	data: {
		 		memberId: $.getGlobalVal().memberId,//会员id
				productId: $('.item-w .cancelItem').attr('productId'),//取消收藏商品id
		 	},
		 	success: function(res){
		 		//console.log(res);
	 			layui.use('layer',function(){
	 				layer.msg(res.msg,{
	 					time: 1000
	 				})
	 			})
		 		getPage();
		 	},
		 	error: function(err){
		 		console.log(err);
		 	}
		 })
	});
	$('#sureAlert .can').click(function(){
		 layer.close(collAlert);
	})

	// 批量 删除
	var allCollAlert = null;
	$('.edit-w .edit-all').click(function(){
		var checkedsub = $(".item-w input[type='checkbox']:checked").length; // 选中个数
		//console.log(checkedsub)
		if(checkedsub <= 0){
			layui.use('layer',function(){
				layer.msg('请至少选择一个需要删除的收藏商品！',{
					icon: 2,
					time: 1000
				})
			})
			return false;
		}

		layui.use('layer',function(){
            allCollAlert = layer.open({
                type: 1,
                area: ['306px','210px'],
                title: ['提示','background-color: #E8E8E8;'],
                content: $('#allCollAlert'),
                cancel: function(){

                }
            })
        })
	})
	$('#allCollAlert .sure').click(function(){
		layer.close(allCollAlert);
		var productItem = $('.list-w .item-w .item');
		var productArr = [];
		//console.log(productItem.eq(0).find('input').prop('checked'))
		for (var i = 0; i < productItem.length; i++) {
			if(productItem.eq(i).find('input[type="checkbox"]').prop('checked')){
				productArr.push(Number(productItem.eq(i).attr('favoriteID')));
			}
		}
		//console.log(productArr)
		$.ajax({
			// url: $.getGlobalVal().webRoot + '/favorite/delFavorite',
			url: '/favorite/delFavorite',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify({
				memberId: $.getGlobalVal().memberId,//会员id
				favoriteIds: productArr,//收藏id数组
			}),
			contentType:'application/json;charset=UTF-8',
			// traditional: true,
			success:function(res){
				// console.log(res);
				layui.use('layer',function(){
	 				layer.msg(res.msg,{
	 					time: 1000
	 				})
	 			})
				getPage();
				$('.list-tab .info input').prop('checked',false);
            	$('.list-tab .info label .checkSpan').html('');
			},
			error: function(err){
				console.log(err);
			}
		})
	})
	$('#allCollAlert .can').click(function(){
		 layer.close(allCollAlert);
	})

	// 确认 
	$('.edit-w .edit-com').click(function(){
		$(this).css({'display': 'none'}).prev().css({'display': 'none'}).prev().css({'display': 'block'});
		$('.list-tab .info label').css({'display':'none'});
		$('.item .item-info label').css({'display':'none'})
		$('.item .item-options p').css({'display': 'none'}).siblings().css({'display': 'block'})
	})


	// 需求弹窗
    $('.list-w .item-w').on('click','.demand-btn',function(){
        var collIndex = $(this).parent().parent().attr('collIndex');
        var productInfor = collList[collIndex];
        // console.log(productInfor)

        $.require({path: 3,product: productInfor,qty: 1,requireGtag:requireGtag});
        
    })


    // 立即购买
    $('.list-w .item-w').on('click','.has-btn',function(){
    	var count = 1, productId = $(this).parent().parent().attr('productId');
    		
    	//window.location.href = '/submitOrder.html?productId='+productId+'&count='+count;
    	window.location.href = '/submitOrder.html';
        $.cookie('order',JSON.stringify({orderType:1,productId:productId,qty:Number(count)}),{  path:'/', domain:'.ak1ak1.com', /*secure:true*/});
           
    })

    function tips(tipsText,icon){
    	layui.use('layer',function(){
            layer.msg(tipsText,{
            	icon: icon,
                time: 1000
            })
        })
    }
})


function imgSrcInit(imgSrc){
	// if(imgSrc.indexOf('http://www.ak1ak1.com') != -1){
	// 	return imgSrc
	// }
	// if(imgSrc.indexOf('http://192.168.2.250:8081') != -1){
 //        return imgSrc.replace('http://192.168.2.250:8081','http://113.108.163.210:9999')
 //    }
	// if(imgSrc.indexOf('http://113.108.163.210:9999') != -1){
	// 	return imgSrc.replace('http://113.108.163.210:9999','http://192.168.2.250:8081')
	// }
	// if(imgSrc.indexOf('http://113.108.163.210:9999') == -1){
	// 	return imgSrc = 'http://113.108.163.210:9999' + imgSrc
	// }
	return imgSrc
}

// 需求统计
function requireGtag(param){
    var title = param.title || '提交需求登记';
    var content = param.content || {};
    // console.log(param)
    gtag('event', title , content);
}