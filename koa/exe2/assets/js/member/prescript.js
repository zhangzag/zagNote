$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	var memberId = $.getGlobalVal().memberId;
	var webOrigin = $.getGlobalVal().webOrigin;
	var flag = false;

	//更新表单会员id
	$('input[name="memberID"]').val(memberId);

	//点击添加处方笺
	$('.prescript_img').click(function(event) {
		$('#add_pre_file').click();
	});

	//新增药品
	$('.btn_addrp').click(function(event) {
		var rpNum = $('.addrp_cols .addrp_col').length;
		var col = '\
			<div class="addrp_col">\
				<span>'+ (rpNum+1) +'</span>\
				<input class="rp_col_name" placeholder="请输入药品名称" name="prescriptionDetails['+ rpNum +'].medicine" type="text" autocomplete="off">\
				<input class="rp_col_spec" placeholder="请输入药品规格" name="prescriptionDetails['+ rpNum +'].spec" type="text" autocomplete="off">\
				<button class="btn_deleterp">删除</button>\
			</div>';
		$('.addrp_cols').append(col)
	});

	//删除当前药品
	$('.addrp_cols').on('click', '.btn_deleterp', function(event){
		event.preventDefault();
		$(this).parents('.addrp_col').remove();

		//重新渲染列表
		for( var i=0; i<$('.addrp_col').length; i++ ){
			$('.addrp_col').eq(i).find('span').html(i+1);
			$('.addrp_col').eq(i).find('.rp_col_name').attr('name', 'prescriptionDetails['+ i +'].medicine');
			$('.addrp_col').eq(i).find('.rp_col_spec').attr('name', 'prescriptionDetails['+ i +'].spec');
		}
	});

	//提交处方笺
	$('.form_con').submit(function(event) {
		if(flag){return false;}

    	layui.use('layer', function(){
			var layer = layui.layer;
		  
			layer.confirm('确定提交？', {
			        btn: ['确定', '取消'],
			        id: 'layerConfirm' + Math.random().toFixed(2) * 100 //防止重复弹出
			    },
			    function(index, layero) {
			        //按钮【按钮一】的回调
			        flag = true;
		         	var options = {
			            // url: webRoot + '/prescription/addPrescription', //提交地址：默认是form的action,如果申明,则会覆盖
			            url: '/prescription/addPrescription', //提交地址：默认是form的action,如果申明,则会覆盖
			            type: "post",   //默认是form的method（get or post），如果申明，则会覆盖
			            beforeSubmit: function(){
			            	//提交前的回调函数
			            	if( !$('#agree').is(':checked') ){
			            		layer.msg( '请阅读并同意处方购买协议!', {time: 3000} );
			            		//关闭弹窗
			        			layer.close(index);
			        			flag = false;
			            		return false;
			            	}
			            }, 
			            success: function(res){
			            	//提交成功后的回调函数
			            	// console.log('success',res);
			        		// layer.msg( res.msg, {time: 3000} );
			        		layer.open({
							  title: '提示',
							  btnAlign: 'c',
							  content: res.msg,
							}); 
			        		flag = false;
			           	},  
			            target: "#output",  //把服务器返回的内容放入id为output的元素中
			            dataType: "json", //html(默认), xml, script, json...接受服务端返回的类型
			            clearForm: true,  //成功提交后，是否清除所有表单元素的值
			            resetForm: true,  //成功提交后，是否重置所有表单元素的值
			            timeout: 3000     //限制请求的时间，当请求大于3秒后，跳出请求
			        };
			        
			        //为表单提交做准备
			        $('.form_con').ajaxForm(options);
			        //提交
			        $('.form_con').ajaxSubmit(options);

			        //关闭弹窗
			        layer.close(index);
			        // 防止重复提交
			        return false;
			    },
			    function(index) {
			        //按钮【按钮二】的回调
			        layer.closeAll();
			    });

			
		});
	});

	//图片裁剪
	$('#add_pre_file').change(function(event) {
		// console.log(event.target.value)
		var file = event.target.files[0] || event.dataTransfer.files;
		var reader = new FileReader();
		var img = new Image;
		// console.log('file: ', file)

		reader.readAsDataURL(file);//转成base64
		reader.onload = function() {
      		img.src = this.result;
      		img.id = 'uploadImg';
      		// $('#hiddenImg').val( this.result.split(',')[1] );
        }

        //如果大于2M
        if( file.size >= 2*1024*1024 ){

	    	try { 
	    		var canvas = document.createElement("canvas");
	    		canvas.getContext("2d");
	    	} catch (e) {
	    		alert('您的浏览器过于老旧，请使用新版浏览器！');
	    		return false;
	    	}

        	var width = 640, quality = 0.6, drawer = canvas.getContext("2d");

			img.onload = function(e) {
	          canvas.width = width;
	          canvas.height = width * (img.height / img.width);
	          drawer.drawImage(img, 0, 0, canvas.width, canvas.height);

	          var base64 = canvas.toDataURL(file.type, quality); // 这里就拿到了压缩后的base64图片
          	
          	  //将要上传的图片
	          $('#hiddenImg').val( base64.split(',')[1] );
	    	  
	    	  // 清空后插入图片
	    	  $('.prescript_img').html('');
	    	  $('.prescript_img').append('<img src="'+ base64 +'" />');
	          // 清空文件上传控件的值  不清理会出现选择同样的图片会无法触发input事件了
	          e.target.value = null;
	        }
        }else{
	        img.onload = function(e) {
	    		$('#hiddenImg').val( img.src.split(',')[1] );
		    	
		    	// 清空后插入图片
		    	$('.prescript_img').html('');
		    	$('.prescript_img').append(img);
	        	//防止同样的图片无法上传
	        	event.target.value = null;
	    	}
    	}
	});

	// $('#lkk').imgAreaSelect({ maxWidth: 10, maxHeight: 10, handles: true });
	// console.log($('#lkk').imgAreaSelect({ maxWidth: 10, maxHeight: 10, handles: true }));
	
	// 显示处方笺购买协议
	$('.agree_block>a').click(function(event) {
		$('.agree_layer').stop(true, true).fadeIn(300);
	});
	// 隐藏处方笺购买协议
	$('.agree_layer_head h3>i').click(function(event) {
		$('.agree_layer').stop(true, true).fadeOut(300);
	});;
});

//阻止跳转
function formSubmit(){
	return false;
}