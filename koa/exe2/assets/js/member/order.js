$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	var memberId = $.getGlobalVal().memberId;
	var webOrigin = $.getGlobalVal().webOrigin;
	var flag = false;
	//当前页数
	var page = 1;
	//每页显示的条数
	var limit = 10;
	//按时间搜索订单
	var recentDate = '';
	//按订单编号或商品名称搜索订单
	var orderCodeOrProName = '';
	// 1 待付款 、2 待发货、 3 待发货、4 已完成、5 已取消、 all 全部订单
	var orderTypeStatus =  $.getQueryString('status') || 'all';
	
	//获取tab各状态数量
	// getNumber( webRoot, memberId );

	//取消订单
	$('.list_lists').on('click', '.btn_cancel_order', function() {
	    var orderId = $(this).parents('.options').attr('data-ori');
	    var thisItem = $(this);

	    layui.use('layer', function() {
	        var layer = layui.layer;

	        if (flag) { return }
	        flag = true;
	        layer.confirm('确定要取消订单？', {
	            btn: ['确定', '取消'],
	            btnAlign: 'c',
	        }, function(index, layero) {
	            //确定按钮
	            $.ajax({
	                    // url: webRoot + '/order/updateOrderStatusByCancel',
	                    url: '/order/updateOrderStatusByCancel',
	                    data: {
	                        orderId: orderId
	                    },
	                })
	                .done(function(res) {
	                    // console.log("success", res);
	                    layer.closeAll();
	                    if (res.success) {
	                    	if( $('.tabs li.cur').hasClass('num_all') ){
	                    		//在全部订单的列表
		                        thisItem.parents('.item').find('.i_head span.fr em').text('已取消').removeClass('c_orange');
		                        thisItem.parents('.item').find('.options .btn_primary').parent('div').remove();
		                        thisItem.parent('div').remove();
	                    	}else{
	                    		//在其他订单状态的列表
	                    		thisItem.parents('.item').remove();
	                    	}
	                        // console.log("取消订单", $(this).parents('.item').find('.i_head span.fr em'));
							//更新订单状态
							getNumber( memberId );
	                    }
	                    layer.msg( res.msg );
	                })
	                .fail(function() {
	                    console.log("error");
	                })
	                .always(function() {
	                    flag = false;
	                });
	        }, function(index) {
	            console.log('取消')
	            flag = false;
	        });
	    });
	});

	//确认收货
	$('.list_lists').on('click', '.btn_order_comfirmget', function(){
		var orderId = $(this).parents('.options').attr('data-ori');
	    var thisItem = $(this);

		if( flag ){ return }
		flag = true;

		layui.use('layer', function() {
	        var layer = layui.layer;

	        layer.confirm('确定要取消订单？', {
	            btn: ['确定', '取消'],
	            btnAlign: 'c',
	        }, function(index, layero) {
				$.ajax({
					// url: webRoot + '/order/updateOrderStatusByConfirmReceipt',
					url: '/order/updateOrderStatusByConfirmReceipt',
					data: {
						orderId: orderId
					},
				})
				.done(function(res) {
					// console.log("确认收货", res);
					if( res.success ){
		            	if( $('.tabs li.cur').hasClass('num_all') ){
		            		//在全部订单的列表
		                    thisItem.parents('.item').find('.i_head span.fr em').text('已完成').removeClass('c_orange');
		                    thisItem.parents('.item').find('.options .btn_order_comfirmget').parent('div').remove();
							thisItem.parent('div').remove();
		            	}else{
		            		//在其他订单状态的列表
		            		thisItem.parents('.item').remove();
		            	}
						//更新订单状态
						getNumber( memberId );
					}
					  
					layer.alert( res.msg , {btnAlign: 'c'});
				})
				.fail(function() {
					console.log("error");
				})
				.always(function(){
					flag = false;
				});
        	}, function(index) {
	            console.log('取消')
	            flag = false;
	        });
        });
	});

	//查看物流
	$('.list_lists').on('click', '.btn_check_express', function(event) {
		event.preventDefault();
		var pageX = event.pageX - 86;
		var pageY = event.pageY -50;
		var expLayerWidth = $('.exp_layer').width() + 30;
		//物流单号
		var logisticsNo = $(this).attr('data-lono');
		//物流公司编码
		var logisticsCode = $(this).attr('data-locod');
		//物流状态
		var orderStatus = filterStatus( $(this).attr('data-sta') );
		//承运公司
		var logisticsName = $(this).attr('data-cod');
		//运单编号
		var logisticsNumber = $(this).attr('data-lnum');
		//官方电话
		var logisticsPhone = $(this).attr('data-tel');

		// console.log('运单编号: ', logisticsNumber)
		// return 
		$.ajax({
			// url: webRoot + '/delivery/getLogistics',
			url: '/delivery/getLogistics',
			data: {
				logisticsNo: logisticsNo,//物流单号
				logisticsCode: logisticsCode,//物流公司编码
			}
		})
		.done(function(res) {
			// console.log("查看物流: ", res);
			if( res.success ){
				//物流状态
				$('.exp_line_status').text( orderStatus );
				//承运公司
				$('.exp_line_company').text( logisticsName );
				//运单编号
				$('.exp_line_num').text( logisticsNumber );
				//官方电话
				$('.exp_line_tel').text( logisticsPhone );

				if( res.data.length === 0 ){
					//没有物流信息
					$('.exp_layer .exp_detail .exp_detail_right').append( '<p class="new_detail"><span>暂无物流信息</span></p>' );
				}	

				//物流信息
				for( var i=res.data.length-1; i>0; i-- ){
					// console.log(i, res.data[i])
					$('.exp_layer .exp_detail .exp_detail_right').append( '<p class="'+ (i==(res.data.length-1)?'new_detail':'') +'"><span>【'+ res.data[i].address +'】'+ res.data[i].remark +'</span><span>'+ res.data[i].time +'</span></p>' );
				}
			}else{
				layui.use('layer', function(){
				  var layer = layui.layer;
				  
				  layer.msg('物流信息查询失败，'+ res.msg);
				});
			}
			//显示弹窗
			$('.exp_layer').css({
				'left': pageX - expLayerWidth,
				'top': pageY
			}).stop(true,true).fadeIn(300);
		});
	});

	//关闭查看物流
	$('.exp_head>i').click(function(event) {
		event.preventDefault();
		$('.exp_layer').stop(true,true).fadeOut(300);
		$('.exp_layer_in .exp_detail_right>p').remove();
	});
	$('body').click(function(event) {
		event.stopPropagation();
		$('.exp_layer').stop(true,true).fadeOut(300);
		$('.exp_layer_in .exp_detail_right>p').remove();
	});
	$('.exp_layer').click(function(event) {
		event.stopPropagation();
	});

	//   TAB   //
	//全部订单
	$('.num_all a').click(function(event) {
		if( $(this).parents('li').hasClass('cur') ){return}

		//按时间搜索订单
		recentDate = '';
		//按订单编号或商品名称搜索订单
		orderCodeOrProName = '';
		//清空搜索值
		$('.top_search .fr>div>input[name="orderCodeOrProName"]').val('');

		$('.loading_animate').stop(true,true).slideDown('300');
		$(this).parents('li').addClass('cur');
		$(this).parents('li').siblings().removeClass('cur');
		//状态改为待付款
		orderTypeStatus = 'all';

		getList({
			webRoot: webRoot,
			memberId: memberId,
			webOrigin: webOrigin,
			orderType: 'all',//订单类型
			// orderStatus: [1,9],//订单状态
			page: page,
			limit: limit,
		});
	});
	//待付款
	$('.num_wait a').click(function(event) {
		if( $(this).parents('li').hasClass('cur') ){return}

		//按时间搜索订单
		recentDate = '';
		//按订单编号或商品名称搜索订单
		orderCodeOrProName = '';
		//清空搜索值
		$('.top_search .fr>div>input[name="orderCodeOrProName"]').val('');
		
		$('.loading_animate').stop(true,true).slideDown('300');
		$(this).parents('li').addClass('cur');
		$(this).parents('li').siblings().removeClass('cur');
		//状态改为待付款
		orderTypeStatus = 1;

		getList({
			webRoot: webRoot,
			memberId: memberId,
			webOrigin: webOrigin,
			orderType: '待付款',//订单类型
			orderStatus: [1,9],//订单状态
			page: page,
			limit: limit,
		});
	});
	//待发货
	$('.num_wsend a').click(function(event) {
		if( $(this).parents('li').hasClass('cur') ){return}
				
		//按时间搜索订单
		recentDate = '';
		//按订单编号或商品名称搜索订单
		orderCodeOrProName = '';
		//清空搜索值
		$('.top_search .fr>div>input[name="orderCodeOrProName"]').val('');
		
		$('.loading_animate').stop(true,true).slideDown('300');
		$(this).parents('li').addClass('cur');
		$(this).parents('li').siblings().removeClass('cur');
		//状态改为待发货
		orderTypeStatus = 2;

		getList({
			webRoot: webRoot,
			memberId: memberId,
			webOrigin: webOrigin,
			orderType: '待发货',//订单类型
			orderStatus: [2,3],//订单状态
			page: page,
			limit: limit,
		});
	});
	//待收货
	$('.num_wget a').click(function(event) {
		if( $(this).parents('li').hasClass('cur') ){return}
				
		//按时间搜索订单
		recentDate = '';
		//按订单编号或商品名称搜索订单
		orderCodeOrProName = '';
		//清空搜索值
		$('.top_search .fr>div>input[name="orderCodeOrProName"]').val('');
		
		$('.loading_animate').stop(true,true).slideDown('300');
		$(this).parents('li').addClass('cur');
		$(this).parents('li').siblings().removeClass('cur');
		//状态改为待收货
		orderTypeStatus = 3;

		getList({
			webRoot: webRoot,
			memberId: memberId,
			webOrigin: webOrigin,
			orderType: '待收货',//订单类型
			orderStatus: [4],//订单状态
			page: page,
			limit: limit,
		});
	});
	//已完成
	$('.num_finish a').click(function(event) {
		if( $(this).parents('li').hasClass('cur') ){return}
				
		//按时间搜索订单
		recentDate = '';
		//按订单编号或商品名称搜索订单
		orderCodeOrProName = '';
		//清空搜索值
		$('.top_search .fr>div>input[name="orderCodeOrProName"]').val('');
		
		$('.loading_animate').stop(true,true).slideDown('300');
		$(this).parents('li').addClass('cur');
		$(this).parents('li').siblings().removeClass('cur');
		//状态改为待已完成
		orderTypeStatus = 4;

		getList({
			webRoot: webRoot,
			memberId: memberId,
			webOrigin: webOrigin,
			orderType: '已完成',//订单类型
			orderStatus: [5,6,7],//订单状态
			page: page,
			limit: limit,
		});
	});
	//已取消
	$('.num_cancel a').click(function(event) {
		if( $(this).parents('li').hasClass('cur') ){return}
				
		//按时间搜索订单
		recentDate = '';
		//按订单编号或商品名称搜索订单
		orderCodeOrProName = '';
		//清空搜索值
		$('.top_search .fr>div>input[name="orderCodeOrProName"]').val('');
		
		$('.loading_animate').stop(true,true).slideDown('300');
		$(this).parents('li').addClass('cur');
		$(this).parents('li').siblings().removeClass('cur');
		//状态改为待已取消
		orderTypeStatus = 5;

		getList({
			webRoot: webRoot,
			memberId: memberId,
			webOrigin: webOrigin,
			orderType: '已取消',//订单类型
			orderStatus: [8],//订单状态
			page: page,
			limit: limit,
		});
	});
	
	//我的订单 -- 默认展示 
	judgeByStatus();

	//搜索订单
	$('.top_search>form').submit(function(event) {
		// var formVal = $(this).serialize();
		recentDate = $(this).find('select[name="recentDate"]').val();
		orderCodeOrProName = $(this).find('input[name="orderCodeOrProName"]').val();
		//回到第一页
		page = 1;
		
		$('.loading_animate').stop(true,true).slideDown('300');
		
		judgeByStatus();
	});

	//根据各种状态执行获取订单
	function judgeByStatus (){
		if( orderTypeStatus == '1' ){
			$('.num_wait').addClass('cur');
			getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '待付款', orderStatus: [1,9], page: page, limit: limit });
		}else if( orderTypeStatus == '2' ){
			$('.num_wsend').addClass('cur');
			getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '待发货', orderStatus: [2,3], page: page, limit: limit });
		}else if( orderTypeStatus == '3' ){
			$('.num_wget').addClass('cur');
			getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '待收货', orderStatus: [4], page: page, limit: limit });
		}else if( orderTypeStatus == '4' ){
			$('.num_finish').addClass('cur');
			getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '已完成', orderStatus: [5,6,7], page: page, limit: limit });
		}else if( orderTypeStatus == '5' ){
			$('.num_cancel').addClass('cur');
			getList({webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '已取消', orderStatus: [8], page: page, limit: limit });
		}else if( orderTypeStatus == 'all' ) {
			$('.num_all').addClass('cur');
			getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: 'all', page: page, limit: limit });
		}
	};

	//获取订单列表
	function getList ( param ){
		// console.log('getList', param.orderType)
		var webRoot = param.webRoot;
		var memberId = param.memberId;
		var webOrigin = param.webOrigin;
		var falg = false;
		//订单类型
		var orderType = param.orderType;
		//订单状态
		var orderStatus = param.orderStatus;
		//当前页数
		var page = param.page;
		//每页显示的条数
		var limit = param.limit;
		// console.log('getList', recentDate, orderCodeOrProName)

		//获取tab各状态数量
		// getNumber( memberId );

		//获取全部订单
		if( orderType === 'all' ){
			// var url = webRoot + '/order/getOrderByMemberId';
			var url = '/order/getOrderByMemberId';
			var data = {
				memberId: memberId,
				page: page,
				limit: limit,
				recentDate: recentDate,
				orderCodeOrProName: orderCodeOrProName,
			}
			var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
		}else{
			// var url = webRoot + '/order/getOrderByMemberIdAndStatus';
			var url = '/order/getOrderByMemberIdAndStatus';
			var data = JSON.stringify({
				memberId: memberId,
				status: orderStatus,
				page: page,
				limit: limit,
				recentDate: recentDate,
				orderCodeOrProName: orderCodeOrProName,
			});
			var contentType = 'application/json;charset=utf-8';
		}

		$.ajax({
			url: url,
			data: data,
			contentType: contentType
		})
		.done(function(res) {
			// console.log("llll", res);
			if( res.success ){
				if( res.data.length === 0 ){
					//显示无数据关闭列表
					$('.nothing').stop(true,true).show(0);
					$('.list_lists').stop(true,true).hide(0);
					setTimeout(function(){
						$('.loading_animate').stop(true,true).slideUp('300');
					}, 300);
					return ;
				}

				//显示列表
				$('.nothing').stop(true,true).hide(0);
				$('.list_lists').stop(true,true).show(0);

				//清空内容
				$('.list_lists').html('');
				//渲染列表
				for( var i=0; i<res.data.length; i++ ){
					//插入元素
					$('.list_lists').append('<div class="item"><div class="i_head"><span></span><span></span><span class="fr"></span></div><table class="akdefult_table" cellspacing="0" cellpadding="0" border="0"><col width="574" align="center" /><col width="186" align="center" /><col width="190" align="center" /><tbody><tr><td></td><td class="tc"></td><td class="tc"></td></tr></tbody></table></div>');

					//订单号
					// $('.i_head span').eq(0).text('订单号：' + res.data[i].orderCode);
					$('.i_head').eq(i).find('span').eq(0).text('订单号：' + res.data[i].orderCode);
					//下单时间
					$('.i_head').eq(i).find('span').eq(1).text('下单时间：' + res.data[i].orderDate);
					//订单状态
					$('.i_head').eq(i).find('span').eq(2).html('订单状态：<em class="'+ (filterOrderStatu(res.data[i].orderStatus)?'c_orange':'') +'">' + $.orderStatuFilter( res.data[i].orderStatus ) + '</em>');
					
					//订单明细 - 商品信息 单价 数量
					for( var y=0; y<res.data[i].orderDetails.length; y++ ){
						// console.log($('.list_lists .item ').eq(i).html())
						$('.list_lists .item').eq(i).find('.akdefult_table tbody td').eq(0).append('<div><div class="fl i_info"><div><a href="/products/'+ res.data[i].orderDetails[y].productID +'.html"><img src="'+ res.data[i].orderDetails[y].productUrl +'" alt=""></a></div><p>'+ $.iconProImg(res.data[i].orderDetails[y].prescriptionType) + res.data[i].orderDetails[y].productName +'</p><span>规格：'+ res.data[i].orderDetails[y].productProperty +'</span></div><div class="fl prices"><span>'+ $.priceFilter( res.data[i].orderDetails[y].marketPrice ) +'</span><strong>'+ $.priceFilter( res.data[i].orderDetails[y].price ) +'</strong></div><div class="fr">'+ res.data[i].orderDetails[y].qty +'</div></div>');
					}
					//订单明细 - 订单金额（元）
					$('.list_lists .item').eq(i).find('.akdefult_table tbody td').eq(1).append('<div class="prices"><p class="c_orange">'+ $.priceFilter( res.data[i].factAmt ) +'</p><span>'+ $.payType(res.data[i].payType) +'</span></div>');
					//订单明细 - 操作
					$('.list_lists .item').eq(i).find('.akdefult_table tbody td').eq(2).append('<div class="options" data-ori="'+ res.data[i].orderID +'"><div>'+ optionsBtn(res.data[i].orderStatus, 'pay') +'</div><div><a href="./order_detail.html?ori='+ res.data[i].orderID +'">订单详情</a></div><div>'+ optionsBtn(res.data[i].orderStatus, 'cancel') +'</div><div>'+ optionsBtn(res.data[i].orderStatus, 'express', res.data[i]) +'</div></div>');
				};

				if( page == 1 ){
					//分页
					layui.use('laypage', function(){
					  var laypage = layui.laypage;
					  //分页
					  laypage.render({
					    elem: 'pagings', //注意，这里的 test1 是 ID，不用加 # 号
					    count: res.count, //数据总数，从服务端得到
					    layout: ['page', 'prev', 'next'],
					    groups: 9,//连续出现的页码个数
					    limit: limit,//每页显示的条数。
					    jump: function(obj, first){
						    // obj包含了当前分页的所有参数，比如：
						    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
						    // console.log(obj.limit); //得到每页显示的条数
						    $('body, html').scrollTop(0);
						    
						    //首次不执行
						    if(!first){
						    	console.log('now orderTypeStatus: ', orderTypeStatus)
								if( orderTypeStatus == '1' ){
									getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '待付款', orderStatus: [1,9], page: obj.curr, limit: limit });
								}else if( orderTypeStatus == '2' ){
									getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '待发货', orderStatus: [2,3], page: obj.curr, limit: limit });
								}else if( orderTypeStatus == '3' ){
									getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '待收货', orderStatus: [4], page: obj.curr, limit: limit });
								}else if( orderTypeStatus == '4' ){
									getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '已完成', orderStatus: [5,6,7], page: obj.curr, limit: limit });
								}else if( orderTypeStatus == '5' ){
									getList({webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: '已取消', orderStatus: [8], page: obj.curr, limit: limit });
								}else if( orderTypeStatus == 'all' ) {
									getList({ webRoot: webRoot, memberId: memberId, webOrigin: webOrigin, orderType: 'all', page: obj.curr, limit: limit });
								}
						    }
						},
					  });
					});
				}
			}else{
				console.log(res.msg)
				//清空内容
				$('.list_lists').html('');
				alert(res.msg)
			}
			setTimeout(function(){
				$('.loading_animate').stop(true,true).slideUp('300');
			}, 300);
		});
	}
	
});


//获取各状态订单数量
function getNumber ( memberId ){
	$.ajax({
	    // url: webRoot + '/order/getOrderCount',
	    url: '/order/getOrderCount',
	    data: {
	        memberId: memberId
	    },
	})
	.done(function(res) {
	    console.log('getOrderCount: ', res);
	    if (res.success) {
	        var datas = res.data[0];
	        //
	        //{"all":18,
	        //"obligation":9, //待付款 6 个
	        //"sendTheGoods":0}] //待发货 3 个
	        //"waitForReceiv":2, //待收货 1个
	        //"complete":0, // 已完成 1 个
	        //"cancel":7, // 已取消 7 个
	        //
	        var numAll = datas.all; //全部 9 个
	        var numWait = datas.obligation; //待付款 9 个
	        var numWsend = datas.sendTheGoods; //待发货 0 个
	        var numWget = datas.waitForReceiv; //待收货 2 个
	        var numFinish = datas.complete; //已完成 0 个
	        var numCancel = datas.cancel; //已取消 7 个

	        //更新各状态数量
	        $('.num_all span').text('('+numAll+')')
	        $('.num_wait span').text('(' + numWait + ')');
	        $('.num_wsend span').text('(' + numWsend + ')');
	        $('.num_wget span').text('(' + numWget + ')');
	        $('.num_finish span').text('(' + numFinish + ')');
	        $('.num_cancel span').text('(' + numCancel + ')');

	    };
	});
}

//操作按钮
function optionsBtn ( orderStatus, type, data ){
	// 1.在线未支付    2.货到付款待确认    3.待发货    4.待收货    5.物流待收款    6.财务待收款    7.已完成    8.已取消    9.支付中
	if( type == 'pay' ){
		if( orderStatus === 1 ){
			return '<button class="btn_primary bp_orange">支付</button>';
		}else if( orderStatus === 4 ){
			return '<button class="btn_primary bp_green btn_order_comfirmget">确认收货</button>';
		}else {
			return '';
		}
	}
	if( type == 'cancel' ){
		if( orderStatus === 1 || orderStatus === 2 || orderStatus === 3 || orderStatus === 9 ) {
			return '<a href="javascript:void(0);" class="btn_cancel_order">取消订单</a>';
		}else {
			return '';
		}
	}
	if( type == 'express' ){
		// console.log(data)
		if( orderStatus !== 2 && orderStatus !== 3 && orderStatus !== 8 && orderStatus !== 1 ){
			return '<a data-locod="'+ (data.logistics?data.logistics.logisticsCode:'') +'" data-lono="'+ (data.logisticsNumber?data.logisticsNumber:'') +'" data-sta="'+ (data.orderStatus?data.orderStatus:'') +'" data-cod="'+ (data.logistics?data.logistics.logisticsName:'') +'" data-lnum="'+ (data.logisticsNumber?data.logisticsNumber:'') +'" data-tel="'+ (data.logistics?data.logistics.phone:'') +'" href="javascript:void(0);" class="btn_check_express">查看物流</a>' ;
		}else {
			return '';
		}
	}
};

//订单状态过滤
function filterOrderStatu ( data ){
	if( data === 5 || data === 6 || data === 7 || data === 8 ){
		return false;
	}else{
		return true;
	}
}

function filterStatus( data ){
	// 1.在线未支付    2.货到付款待确认    3.待发货    4.待收货    5.物流待收款    6.财务待收款    7.已完成    8.已取消    9.支付中
	if( data == 1 || data == 9 ){ return '待付款' }
	else if( data == 3 || data == 2 ){ return '待发货' }
	else if( data == 4 ){ return '待收货' }
	else if( data == 5 || data == 6 || data == 7 ){ return '已送达' }
	else if( data == 8 ){ return '已取消' }
}


