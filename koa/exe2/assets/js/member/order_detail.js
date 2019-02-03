$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	var memberId = $.getGlobalVal().memberId;
	var webOrigin = $.getGlobalVal().webOrigin;
	var flag = false;
	//订单id 
	var orderId = $.getQueryString('ori');

	//获取订单详情
	$.ajax({
		// url: webRoot + '/order/getOrderInfoByOrderId',
		url: '/order/getOrderInfoByOrderId',
		data: {orderID: orderId},
	})
	.done(function(res) {
		// console.log("订单: ", res);
		if( !res.success || !res.data ){
			layui.use('layer', function(){
			  var layer = layui.layer;
			  
			  layer.open({
		        type: 1
		        ,title: '提示'
		        ,offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
		        ,id: 'layerAlert'+Math.random().toFixed(2)*100 //防止重复弹出
		        ,content: '<div style="padding: 20px 100px;">'+ res.msg +'</div>'
		        ,btn: '关闭'
		        ,btnAlign: 'c' //按钮居中
		        ,shade: 0.3 //不显示遮罩
		        ,time : 1500
		        ,yes: function(){
		          layer.closeAll();
		        }
		      });
			}); 
			return false;
		}

		//   订单信息   //
 		//订单号
		$('.order_num').text(res.data.orderCode);
 		//下单时间
		$('.order_date').text(res.data.orderDate);
 		//付款方式
		$('.order_pay').text($.payType( res.data.payType ));
 		//订单金额
		$('.order_price').text($.priceFilter( res.data.factAmt ));
 		//订单状态
		$('.order_statu').text($.orderStatuFilter( res.data.orderStatus ));

		//   配送信息   //
		//收货人
		$('.logistics_user').text(res.data.contactMan || '');  
		//收货人电话
		$('.logistics_phone').text(res.data.cellPhone || '');  
		//配送地址
		$('.logistics_address').text(res.data.deliveryAddress || '');  
		//配送方式
		$('.logistics_company').text(res.data.deliveryName || '');  
		//物流单号
		$('.logistics_num').text( res.data.logisticsNumber || '' );  
		//查看物流
		if( res.data.orderStatus == 4 || res.data.orderStatus == 5 || res.data.orderStatus == 6 || res.data.orderStatus == 7 ){
			$('.logistics_num').after('<button class="btn_primary plain btn_express" data-locod="'+ (res.data.logistics?res.data.logistics.logisticsCode:'') +'" data-lono="'+ (res.data.logisticsNumber?res.data.logisticsNumber:'') +'" data-sta="'+ (res.data.orderStatus?res.data.orderStatus:'') +'" data-cod="'+ (res.data.logistics?res.data.logistics.logisticsName:'') +'" data-lnum="'+ (res.data.logisticsNumber?res.data.logisticsNumber:'') +'" data-tel="'+ (res.data.logistics?res.data.logistics.phone:'') +'"  >查看物流</button>');
		}

		//   配送信息   //
		//备注
		$('.block_area_con .remarks').val(res.data.orderRemark);  

		//   商品清单   //
		for( var i=0; i<res.data.orderDetails.length; i++ ){
			$('.list_lists_small').append('<div class="item"><table class="akdefult_table" cellspacing="0" cellpadding="0" border="0"><col width="364" align="center" /><col width="128" align="center" /><col width="190" align="center" /><col width="80" align="center" /><col width="165" align="center" /><tbody><tr><td></td><td class="tc"></td><td class="tc"></td><td class="tc"></td><td class="tc"></td></tr></tbody></table></div>');

			//商品信息
			$('.list_lists_small .item').eq(i).find('tbody tr td').eq(0).html('<div class="i_info"><div><img class="lazy" data-original="'+ res.data.orderDetails[i].productUrl +'?70*70" alt="'+ res.data.orderDetails[i].productName +'"></div><p>'+ $.iconProImg(res.data.orderDetails[i].prescriptionType) + res.data.orderDetails[i].productName +'</p><span>规格：'+ res.data.orderDetails[i].productProperty +'</span></div>');
			//商品编号
			$('.list_lists_small .item').eq(i).find('tbody tr td').eq(1).html('<div>'+ res.data.orderDetails[i].productID +'</div>');
			//商品价格
			$('.list_lists_small .item').eq(i).find('tbody tr td').eq(2).html('<div class="prices"><span>'+ $.priceFilter(res.data.orderDetails[i].marketPrice) +'</span><strong>'+ $.priceFilter(res.data.orderDetails[i].price) +'</strong></div>');
			//商品数量
			$('.list_lists_small .item').eq(i).find('tbody tr td').eq(3).html('<div>'+ res.data.orderDetails[i].qty +'</div>');
			//商品小计
			$('.list_lists_small .item').eq(i).find('tbody tr td').eq(4).html('<div>'+ $.priceFilter(res.data.orderDetails[i].amt) +'</div>');
		}

		//   统计   //
		//商品小计
		$('.count_pro').text( $.priceFilter(res.data.ordtotalAmt) );
		//运费
		$('.count_charges').text( $.priceFilter(res.data.chargeAmtDiscount) );
		//运费减免
		// $('.count_charges_discount').text( '- ' + $.priceFilter(res.data.chargeDiscount) );
		//折扣小计
		// $('.count_count_discount').text( '- ' + $.priceFilter( 0 ) );
		//优惠金额
		$('.count_discount').text( '- ' + $.priceFilter((res.data.productDiscount*100 + res.data.manualDeduction*100)/100) );
		//订单金额
		$('.count_all').text( $.priceFilter(res.data.factAmt) );

		//底部按钮
		// $('.btns_conut').append( btnsConutFilter(res.data.orderStatus) );
		$('.btns_conut').append( btnsCancelFilter(res.data.orderStatus) );//取消
		$('.btns_conut').append( btnsPayFilter(res.data.orderStatus) );//支付
		$('.btns_conut').append( btnsConfirmFilter(res.data.orderStatus) );//确认

		//图片懒加载
        lazyLoad({
            imgSrc: '/static/images/ak_200x200.jpg',
        });
	});

	//取消订单
	$('.btns_conut').on('click', '.btn_cancel_order', function() {
	    // var orderId = $(this).parents('.options').attr('data-ori');
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
	                    if (res.success) {
	                        // $(this).parents('.item').find('.i_head span.fr em').text('已取消').removeClass('c_orange');
	                        // $(this).parent('div').remove();
	                        // alert(res.msg)
	                        layer.msg(res.msg, {time: 2000});
	                        setTimeout(function(){
	                        	window.location.href = '/module/member/order.html';
	                        },2000);
	                    }
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
	$('.btns_conut').on('click', '.btn_order_confirm', function(){
		layui.use('layer', function() {
	        var layer = layui.layer;

	        if (flag) { return }
	        flag = true;

	    	layer.confirm('确定执行此操作？', {
	            btn: ['确定', '取消'],
	            btnAlign: 'c',
	        }, function(index, layero) {
	        	layer.close(index);
				//确认收货
				$.ajax({
					// url: webRoot + '/order/updateOrderStatusByConfirmReceipt',
					url: '/order/updateOrderStatusByConfirmReceipt',
					data: {orderId: orderId},
				})
				.done(function(res) {
					// console.log("success",res);
					layer.msg(res.msg, {time: 2000});
					if( res.success ){
		                setTimeout(function(){
		                	window.location.reload();
		                },2000);
					}
				});
			}, function(index) {
	            flag = false;
	        });
		});
	});

	//查看物流
	$('.block_area_con').on('click', '.btn_express', function(event) {
		event.preventDefault();
		event.stopPropagation();
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
			$('.exp_layer').stop(true,true).fadeIn(300);
		});
	});
	//关闭查看物流
	$('.exp_layer').click(function(event) {
		event.stopPropagation();
	});
	$('.exp_layer_in .exp_head>i').click(function(event) {
		event.stopPropagation();

		$('.exp_layer').stop(true,true).fadeOut(300);
	});
	$('body').click(function(event) {
		event.stopPropagation();

		$('.exp_layer').stop(true,true).fadeOut(300);
	});
	
});

//底部按钮筛选
// 	// 1.在线未支付    2.货到付款待确认    3.待发货    4.待收货    5.物流待收款    6.财务待收款    7.已完成    8.已取消    9.支付中
//取消按钮筛选器
function btnsCancelFilter( data ){
	if( data == 4 || data == 5 || data == 6 || data == 7 || data == 8 ){
		return false;
	}else {
		return '<a class="btn_cancel_order" href="javascript:void(0);">取消订单</a>';
	}
}
//支付按钮筛选器
function btnsPayFilter( data ){
	if( data == 1 || data == 9 ){
		return '<button class="btn_primary bp_green large">支付</button>';
	}else {
		return 'false';
	}
}
//确认收货按钮筛选器
function btnsConfirmFilter( data ){
	if( data == 4 || data == 3 ){
		return '<button class="btn_primary bp_green large btn_order_confirm">确认收货</button>';
	}else {
		return 'false';
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