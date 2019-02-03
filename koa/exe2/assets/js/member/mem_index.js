$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	var memberId = $.getGlobalVal().memberId;
	var webOrigin = $.getGlobalVal().webOrigin;

	// //获取会员信息
	var now = new Date(),
		hour = now.getHours();
	
	//会员名称
	if( hour < 9 ){
		$('.mcb_info h3>span').html('早安，新的一天又开始了~');
	}

	$('.ir_upImg').click(function(){
		document.getElementById("upload_img_btn").click();
	});

	// // 我的收藏
	// $.ajax({
	// 	// url: webRoot + '/favorite/getFavoriteList',
	// 	url: '/favorite/getFavoriteList',
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	data: {
	// 		memberId: memberId,
	// 		// limit: 10 ,
	// 		// page: 1,
	// 		// loading: false,//无限加载
	// 	}
	// })
	// .done(function(res) {
	// 	// console.log("success", res);
	// 	if( res.success ){
	// 		$('.num_collect').html(res.date.length);
	// 	}else{
	// 		console.log(res.msg)
	// 	}
	// });

	// // 我的需求记录
	// $.ajax({
	// 	// url: webRoot + '/require/getRequire',
	// 	url: '/require/getRequire',
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	data: {
	// 		memberId: memberId,
	// 	}
	// })
	// .done(function(res) {
	// 	// console.log("success", res);
	// 	if( res.success ){
	// 		$('.num_need').html(res.data.length);
	// 	}else{
	// 		console.log(res.msg)
	// 	}
	// });

	// // 我的处方笺记录
	// $.ajax({
	// 	url: webRoot + '/prescription/getPrescription',
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	data: {
	// 		memberId: memberId,
	// 	}
	// })
	// .done(function(res) {
	// 	// console.log("success", res);
	// 	if( res.success ){
	// 		$('.num_cjf').html(res.data.length);
	// 	}else{
	// 		console.log(res.msg)
	// 	}
	// });

	// //我的订单
	// // 1.在线未支付    2.货到付款待确认    3.待发货    4.待收货    5.物流待收款    6.财务待收款    7.已完成    8.已取消    9.支付中
	// $.ajax({
	//     url: webRoot + '/order/getOrderCount',
	//     data: {
	//         memberId: memberId
	//     },
	// })
	// .done(function(res) {
	//     // console.log('getOrderCount: ', res);
	//     if (res.success) {
	//         var datas = res.data[0];
	//         var numWait = datas.obligation; //待付款 
	//         var numWsend = datas.sendTheGoods; //待发货 
	//         var numWget = datas.waitForReceiv; //待收货 
	//         var numFinish = datas.complete; //已完成 
	//         var numCancel = datas.cancel; //已取消 

	//         //更新各状态数量
	//         $('.num_wait').text('(' + numWait + ')');
	//         $('.num_wsend').text('(' + numWsend + ')');
	//         $('.num_wget').text('(' + numWget + ')');
	//         $('.num_finish').text('(' + numFinish + ')');
	//         $('.num_cancel').text('(' + numCancel + ')');

	//     };
	// });
			
});