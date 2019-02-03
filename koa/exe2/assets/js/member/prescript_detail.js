$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	var memberId = $.getGlobalVal().memberId;
	var webOrigin = $.getGlobalVal().webOrigin;
	var ImgSrc = $.getGlobalVal().ImgSrc;
	var flag = false;
	 var prescriptionId = $.getQueryString('cid');

	//获取处方笺详情
	$.ajax({
		// url: webRoot + '/prescription/getPrescriptionById',
		url: '/prescription/getPrescriptionById',
		data: {prescriptionId: prescriptionId},
	})
	.done(function(res) {
		// console.log("success", res);
		if( res.success ){
			//提交处方笺时间
			$('.create_time').text(res.data.createTime);
			//医院
			$('.detail_hospital').text(res.data.hospitalName);
			//科别
			$('.detail_cate').text(res.data.offices);
			//姓名
			$('.detail_name').text(res.data.sufferer);
			//手机号码
			$('.detail_phone').text(res.data.phone);
			//性别
			$('.detail_sex').text((res.data.sex==1?'男':'女'));
			//年龄
			$('.detail_age').text(res.data.age?res.data.age:'');
			//临床诊断
			$('.zd_con').text(res.data.diagnosed);

			//药品详情
			var prescriptionDetail = res.data.prescriptionDetail;
			for( var i=0; i<prescriptionDetail.length; i++ ){
				$('.addrp_cols').append('<div class="addrp_col"><span>'+ (i+1) +'</span><h3>'+ prescriptionDetail[i].medicine +'</h3><p>'+ prescriptionDetail[i].spec +'</p></div>');
			}

			//处方笺图片
			$('.cjf_img').append('<img src="'+ res.data.pictureURL +'" >');
		}
	});
	
});
