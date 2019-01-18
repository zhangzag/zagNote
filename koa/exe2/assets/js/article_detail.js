$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	var memberId = $.getGlobalVal().memberId;
	var webOrigin = $.getGlobalVal().webOrigin;
	var flag = false;
	var typeName = $.getQueryString('typeName');
	var parentTypeId = $.getQueryString('ptId');
	var healthAdvisoryID = $.getQueryString('id');

	layui.use('laypage', function(){
	  var laypage = layui.laypage;
	  
	  //获取文章详情
	  $.ajax({
	  	url: webRoot + '/healthAdvisory/getHealthAdvisoryById',
	  	data: {
	      	typeName: typeName,
	      	healthAdvisoryID: healthAdvisoryID
      	},
	  })
	  .done(function(res) {
	  	// console.log("success", res);
	  	if( res.success ){
	  		//标题
	  		$('.detail_con .title h3').text( res.data.title );
	  		//来源
	  		$('.detail_con .info p:eq(0) span').text( res.data.source );
	  		//发布时间
	  		$('.detail_con .info p:eq(1) span').text( res.data.createTime );
	  		//文章内容
	  		$('.article').html( res.data.content );
	  		//外链文章
	  		if( res.data.isLink ){
	  			$('#ifbody').attr('src',res.data.url);
	  		}
	  	}
	  });

	  //返回按钮
	  $('.btn_cancel').click(function(event) {
	  	window.history.go(-1);
	  });

	  //下一条
	  $('.btn_next').click(function(event) {
	  	/* Act on the event */
	    $.ajax({
	    	url: webRoot + '/healthAdvisory/getHealthAdvisoryOrderBy',
	    	type: 'POST',
	    	dataType: 'json',
	    	data: {
	    		status: 1,//status  0 为上一篇  1为下一篇
	    		parentTypeID: parentTypeId,
	    		healthAdvisoryID: healthAdvisoryID
	    	},
	    })
	    .done(function(res) {
	    	//console.log("下一条： ", res.data);
	    	if( res.code === '0' && res.data ){
	    		window.location.replace('/article_detail.html?typeName='+typeName+'&ptId='+ res.data.parentTypeID +'&id='+ res.data.healthAdvisoryID);
	    	}else{
	    		alert('没有更多了')
	    	}
	    });
	  });

	  //上一条
	  $('.btn_pre').click(function(event) {
	  	/* Act on the event */
	    $.ajax({
	    	url: webRoot + '/healthAdvisory/getHealthAdvisoryOrderBy',
	    	type: 'POST',
	    	dataType: 'json',
	    	data: {
	    		status: 0,//status  0 为上一篇  1为下一篇
	    		parentTypeID: parentTypeId,
	    		healthAdvisoryID: healthAdvisoryID
	    	},
	    })
	    .done(function(res) {
	    	//console.log("上一条： ", res.data);
	    	if( res.code === '0' && res.data ){
	    		window.location.replace('/article_detail.html?typeName='+typeName+'&ptId='+ res.data.parentTypeID +'&id='+ res.data.healthAdvisoryID);
	    	}else{
	    		alert('没有更多了')
	    	}
	    });
	  });
	  
	});
});