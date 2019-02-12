$(function(){
	jQuery.extend({
		require: function(params){
			var product = {};
			if(params.path == 0){ // 详情页
				product = params.product;
				product.photodURL = product.photoURL ? product.photoURL:product.photodURL;
			}else if(params.path == 1){ // 列表
				product = params.product;
				product.photodURL = product.defaultPhoto;
			}else if(params.path == 2){ // 慢病
				product = params.product;
				product.photodURL = product.productPhotos[0]?product.productPhotos[0].photoURL:'/images/ak_300x300.jpg'
			}else if(params.path == 3){ // 我的收藏
				product = params.product.product;
				var favoriteLis = params.product; // 我的收藏
			}else if(params.path == 4){ // 需求登记
				product = params.product.product;
				var demand = params.product; // 需求登记
			}else if(params.path == 5){ // 套餐
				var productList = params.product;
				var meal = params.meal;
			// }else if (params.path == 6) { //疗程装
			// 	product = params.product;
			// 	var singleMeal = params.singleMeal;
			// 	product.photodURL = product.photoURL ? product.photoURL:product.photodURL
			}
			// console.log(meal,1111);

			var qty = params.qty || 1;
			var getColl = params.getColl || function(){};
			var requireGtag = params.requireGtag || function(){}; // 统计
			var listReload = params.listReload || function(){}; // 数据重载，重新提交需求登记

			var productId = product.productID?product.productID:'';
			var flag = true;
			// var index = null; //layer
			
			// requireGtag({title: '点击需求登记',content:{
			// 	'event_category' : '点击需求登记的商品id：' + productId
			// }})
			
			var content = ''

			var productMould = ''
			if(params.path == 5){
				requireGtag({title: '点击套餐需求登记',content:{
					'event_category' : '点击套餐需求登记的套餐id：' + meal.packageID
				}})
				
				var mealItem = '';
				for(var k=0;k<productList.length;k++){
					mealItem += '<div class="item"><div class="mpInfo" style="width:70%;"><img src="'+(productList[k].photodURL?productList[k].photodURL:"/images/ak_200x200.jpg")+'" /><div class="mpText"><p class="mpName"><i class="'+$.imgType(productList[k].prescriptionType)+'"></i>'+productList[k].productName+'</p><p class="mpSpec"><span>'+productList[k].spec+'<span></p></div></div><div class="mpQty" style="width:15%;"><p>'+productList[k].qty+'</p></div><div class="mpPrice" style="width:15%;"><p>'+priceInit(Number(productList[k].price))+'</p></div><b class="clear"></b></div>'
				}

				productMould = '<p class="tips">提交登记后，阿康门店药师将在15分钟内致电与您确认，请您保持电话通畅哦。注：套餐商品的商品种类和数量为固定组合，不可修改。</p><div class="mealWrap"><input type="hidden" name="packageID" value="'+meal.packageID+'"><div class="mealTable"><div class="mealHead"><span style="width:70%;text-align:left;text-indent:20px;">商品信息</span><span style="width:15%;">数量</span><span style="width:15%;">原单价</span><i class="clear"></i></div><div class="mealBody">'+mealItem+'</div>	</div><div class="mealInfo"><div style="width:240px;"><span class="key">套餐数：</span><div class="value"><a href="javascript:void(0);" class="reduce"></a><input type="text" name="qty" id="demandNum" value="'+qty+'" /><a href="javascript:void(0);" class="add"></a></div></div><div style="width:160px;"><span class="key">套餐价：</span><div class="value" style="font-size:16px;color:#e00000;">'+priceInit(meal.afterBenefitCost)+'</div></div><div style="width:160px;"><span class="key">原总价：</span><div class="value">'+priceInit(meal.oldCost)+'</div></div><i class="clear"></i></div></div>'
			}else{
				requireGtag({title: '点击需求登记',content:{
					'event_category' : '点击需求登记的商品id：' + productId
				}})


				productMould = '<p class="tips"> 温馨提示：提交登记后，阿康门店药师将在15分钟内致电与您确认，请您保持电话通畅哦。</p><div class="productInfo"><div id="productSend"><input type="hidden" name="productID" value="'+product.productID+'"><input type="hidden" name="productName" value="'+product.productName+'"><input type="hidden" name="productCode" value="'+product.productCode+'"></div><a href="javascript:void(0)"><img src="'+(product.photodURL?product.photodURL:"/images/ak_200x200.jpg")+'"></a><div class="proInforShow"><p class="p-text">'+product.productName+'</p><div class="p-list"><span>规格：</span><div class="p-gui">'+product.spec+'</div></div><div class="p-list" id="alLiaoMoney"><span>价格：</span><div class="p-pri">￥ <span>'+priceInit(Number(product.ourPrice))+'</span></div></div><div class="p-list"><span>数量：</span><div class="p-num"><a href="javascript:void(0)" class="reduce"></a><input type="text" name="qty" id="demandNum" value="'+qty+'" /><a href="javascript:void(0)" class="add"></a></div></div><div class="p-list singleMeal" style="margin-top:3px;display:none;"><span style="line-height: 30px;">疗程装：</span><div class="liaoCheng"></div></div></div></div>'
			}

			var content = '<div id="requireAlert333" class="alertWrap"><div style="height:650px;" class="alertContent"><div class="alertTop"><span>需求登记</span><b>X</b><i class="clear"></i></div><form id="demandAlert" enctype="multipart/form-data" action="javascript: void(0);"><div id="output" style="display: none;"></div><input type="hidden" name="memberID"><input type="hidden" name="sysNo" value="pc">'+productMould+'<div class="toLogin"><a id="loginShow" href="javascript:void(0)">登录阿康会员，可帮助您快速提交需求！</a></div><div class="user-wrap"><div class="user-item" style="width: 50%;"><span class="key">姓名：</span><div><input style="width:177px;" type="text" name="realName" id="userName" class="userName" placeholder="请输入姓名"></div></div><div class="user-item" style="width: 50%;"><span class="key">手机：</span><div><input type="text" id="phone" name="phone" class="phone" style="width: 223px;" placeholder="请输入手机"></div></div><div class="user-item"><span>地区：</span><div><select id="province" class="" name=""><option value="">请选择</option></select><select name="" id="city"><option value="">请选择</option></select><select name="" id="county"><option value="">请选择</option></select></div></div><div class="user-item"><span>详细地址：</span><div><input type="text" id="addressName" class="addressName" style="width: 559px;" placeholder="请输入详细地址"><input type="hidden" name="DeliveryAddress"></div></div><div class="left" style="width: 38%;"><div class="user-item" style="width: 100%"><span>年龄：</span><div><input id="age" type="text" name="age" placeholder="请输入年龄"></div></div><div class="user-item" style="width: 100%"><span>身份证号：</span><div><input id="carId" type="text" name="carId" placeholder="请输入身份证号"></div></div><div class="user-item"><span>性别：</span><div><label><input type="radio" name="sex" value="1" checked> 男</label><label><input type="radio" name="sex" value="2"> 女</label></div></div><div class="user-item"><span>门店递送：</span><div><input value="1" type="checkbox" checked disabled><input name="isStore" value="1" type="hidden"></div></div><div class="user-item docphone"><p>如紧急，请咨询药师 <span>400-9309-990</span></p></div></div><div class="left" style="width:31%;"><div class="user-item"><span style="width:50px;">留言：</span><div><textarea name="remark" id="demandRemark" placeholder="请留言您的要求"></textarea></div></div></div><div class="left" style="width:31%;"><div class="isPres"><span class="active">有处方</span><span>无处方</span></div><div class="user-item"><div id="upload"><span>上传处方笺图片</span><img src=""><input id="file" type="file" accept="image/jpeg,image/jpg,image/png"><input type="hidden" name="imgstr"></div></div></div></div><div class="demand-button"><button type="submit" class="demand-submit">提交需求</button><button class="demand-cancel">返回</button></div></form></div></div>';


			$('body').append(content);
			// $('body').off('click change'); // 清除点击事件
			getProv(null,'province');
	        var memberId = getUser();
	        if(!memberId){
	            $('.toLogin a').html('登录阿康会员，可帮助您快速提交需求！');
	        }else{
	            getdefault(memberId,demand);
	        }


			// 登录
			$('body').off('click','#loginShow').on('click','#loginShow',function(e){
				e.preventDefault();
				var memberId = getUser();

		        if(memberId){
		            return false;
		        }
		        
		        var callback = {};
		        if(getColl){
		        	callback.getColl = getColl;
		        }
		        callback.getdefault = getdefault;
		        $.loginAlert(callback);
		        return false;
			})

			// 数量 减
			$('body').off('click','#demandAlert .reduce').on('click','#demandAlert .reduce',function(){
		        var demandNum = $(this).next().val();
		        if(!/^[0-9]*$/.test(demandNum)){
		            $.tips('请输入数字',2)
		            $(this).next().val(1)
		            return false;
		        }
		        demandNum--;
		        if(demandNum < 1){
		        	demandNum = 1;
		        	$.tips('数量至少为1',-1);
		        }
		        $(this).next().val(demandNum);
		        singChange();
		        totalMoney();
    		})

		    // 数量 加
		    $('body').off('click','#demandAlert .add').on('click','#demandAlert .add',function(){
		        var demandNum = $.trim($(this).prev().val())
		        if(!/^[0-9]*$/.test(demandNum)){
		            $.tips('请输入数字',2)
		            $(this).prev().val(1)
		            return false;
		        }
		        demandNum++;
		     //    if(params.path != 5){
			    //     if(demandNum > product.reserves){
			    //         demandNum = product.reserves;
			    //         $.tips('没有更多库存了！',-1)
			    //     }
		    	// }
		    	// console.log(demandNum)
		        $(this).prev().val(demandNum)
		        singChange();
		        totalMoney();
		    });

		    // 失去焦点
		    $('body').off('blur','#demandAlert #demandNum').on('blur','#demandAlert #demandNum',function(){
		        var demandNum = $.trim($(this).val());
		        if(!/^[0-9]*$/.test(demandNum)){
		            $.tips('请输入数字',2);
		            demandNum = 1
		        }
		        // if(demandNum > product.reserves){
		        //     demandNum = product.reserves;
		        //     $.tips('没有更多库存了！',null);
		        // }
		        $(this).val(demandNum);
		        singChange();
		        totalMoney();
		    });

		    // 获取市
		    $('body').off('change','#province').on('change','#province',function(){
		        //console.log($(this).val());
		        if ($(this).val() == '') {
		            $('#city').html('<option value="">请选择</option>');
		            $('#county').html('<option value="">请选择</option>');
		            return false;
		        }
		        $('#city').html('<option value="">请选择</option>');
		        $('#county').html('<option value="">请选择</option>');
		        getProv(Number($(this).val()),'city')
		    })
		    
		    // 获取 区
		    $('body').off('change','#city').on('change','#city',function(){
		        //console.log($(this).val());
		        if($(this).val() == ''){
		            $('#county').html('<option value="">请选择</option>');
		            return false;
		        }
		        $('#county').html('<option value="">请选择</option>');
		        getProv(Number($(this).val()),'county')
		    });

		    // 有无处方笺isPres
		    $('body').off('click','.isPres span').on('click','.isPres span',function(){
		    	//alert($(this).index());
		    	$(this).addClass('active').siblings().removeClass('active');
		    	if($(this).index() == 1){
		    		$('#upload').css('display','none');
		    	}else{
		    		$('#upload').css('display','block');
		    	};
		    });

		    // 点击按钮上传
		    $('body').off('click','#upload span').on('click','#upload span',function(){
		    	$(this).siblings('#file').click();
		    });
		    // 点击图片上传
		    $('body').off('click','#upload img').on('click','#upload img',function(){
		    	$(this).siblings('#file').click();
		    });

		    // 上传 处方笺
		    $('body').off('change','#file').on('change','#file',function(){
		        var event = $(this);
		        var file = this.files[0];
		        if (window.FileReader) {    
		            var reader = new FileReader();    
		            reader.readAsDataURL(file);    
		            //监听文件读取结束后事件    
		            reader.onloadend = function (e) {
		                // e.target.result就是最后的路径地址 base64 路径
		                event.parent().find('img').prop('src',e.target.result);
		                event.parent().find('span').css({'display':'none'});
		                $('input[name="imgstr"]').val(e.target.result)
		            };    
		        } 
		    })

		    // 需求登记
		    $('body').off('submit','#demandAlert').on('submit','#demandAlert',function(){
				if(!flag){return false;}
		    	var prov = $("#province option:selected").text() == '请选择' ? '':$("#province option:selected").text();  //获取选中的地址
        		var city = $("#city option:selected").text() == '请选择' ? '':$("#city option:selected").text();
        		var county = $("#county option:selected").text() == '请选择' ? '':$("#county option:selected").text();
		    	var addressName = $.trim($('#addressName').val());
		    	var adsHead = prov+city+county;
        		var DeliveryAddress = addressName.indexOf(adsHead) == -1 ? adsHead+addressName:addressName;
		    	$('input[name="DeliveryAddress"]').val(DeliveryAddress);
		    	var memberId = getUser();
        		memberId = memberId ? memberId:'';
        		$('input[name="memberID"]').val(memberId);

		    	var options ={
		            target: '#output', //把服务器返回的内容放入id为output的元素中    
		            beforeSubmit: function(formData, jqForm, options){ //提交前的回调函数
		                // console.log(formData); //formData 提交的数据，jqForm表单对象，options对象
		                var form = jqForm[0]; // form.name.value 获取 某个值
		                
		                var numberTest = /^[0-9]*$/;
		                var phoneTest = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
		                var ageTest = /^[1-9]\d*$/;
		                var carIdTest = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/;

		                if(!numberTest.test(form.qty.value)){
				            $.tips('数量请输入数字',2);
				            $('#demandNum').val(1);
				            return false;
				        }

				        if(form.qty.value < 1){
				        	$.tips('数量至少为1',-1);
				        	$('#demandNum').val(1);
				            return false;
				        }

				        // if(form.qty.value > product.reserves){
				        // 	$.tips('没有更多库存了！',-1);
				        // 	$('#demandNum').val(product.reserves);
				        //     return false;
				        // }

				        if(form.realName.value == ''){
				            $.tips('姓名不能为空',2);
				            return false
				        }

				        if(form.phone.value == ''){
				            $.tips('手机号不能为空',2);
				            return false
				        }

				       	if(!phoneTest.test(form.phone.value)){
				            $.tips('手机格式不正确',2)
				            return false
				        }

				        if(form.age.value != '' && !ageTest.test(form.age.value)){
				            $.tips('年龄请输入正整数',2)
				            return false
				        }

				        if(form.carId.value != '' && !carIdTest.test(form.carId.value)){
				            $.tips('身份证号格式不正确',2)
				            return false
				        }

				        flag = false;
		                // return false
		            },  
		            success: function(res){ //提交后的回调函数
		                // console.log(res);
		                // submitReqGtag(productId);
		          //       requireGtag({title: '提交需求登记',content:{
		          //       	'event_category' : '商品id：' + productId,
      						// 'event_label' : '提交结果：' + res.msg
		          //       }})

		                if(params.path == 5){
		                	requireGtag({title: '提交套餐需求登记',content:{
								'event_category' : '提交套餐需求登记的套餐id：' + meal.packageID,
								'event_label' : '提交结果：' + res.msg
							}})
		                }else{
		                	requireGtag({title: '提交需求登记',content:{
			                	'event_category' : '商品id：' + productId,
	      						'event_label' : '提交结果：' + res.msg
			                }})
		                }
		                $('body').find('#requireAlert333').remove();
		                flag = false;
		                // $.finishTips('需求登记提示',res.msg);
		                if (res.success) {
		                	yesAdd(res.msg);
		                }else{
		                	$.finishTips('需求登记提示',res.msg);
		                }

		                listReload(1);
		            },      
		            // url: $.getGlobalVal().webRoot + '/require/addRequire', //默认是form的action， 如果申明，则会覆盖
		            url: '/require/addRequire', //默认是form的action， 如果申明，则会覆盖
		            // url: 'http://192.168.2.65:8083/AKGW-api/v1/require/addRequire',
		            type: 'post',               //默认是form的method（get or post），如果申明，则会覆盖
		            dataType: 'json',           //html(默认), xml, script, json...接受服务端返回的类型
		            clearForm: true,          //成功提交后，清除所有表单元素的值
		            resetForm: true,          //成功提交后，重置所有表单元素的值
		            timeout: 3000               //限制请求的时间，当请求大于3秒后，跳出请求

		        }

		        // $("#demandAlert").ajaxForm(options);
		        $("#demandAlert").ajaxSubmit(options);
		    })

		    // 返回
		    $('body').off('click','#demandAlert .demand-cancel').on('click','#demandAlert .demand-cancel',function(){
		        // layui.use('layer',function(){
		        //     var layer = layui.layer;
		        //     layer.close(index);
		        // })
		        $('body').find('#requireAlert333').remove();
		        
		        var memberId = getUser();
        		memberId = memberId ? memberId:'';
        		var commodityType = meal ? 2:1;
        		var productID = productId;
        		var packageNo = meal ? meal.packageID : '';
		        demandCancel({memberID: memberId,commodityType:commodityType,productID:productID,packageNo:packageNo});
		        return false;
		    })
		    // 关闭
  			$('body').off('click','#requireAlert333 b').on('click','#requireAlert333 b',function(){
  				$('body').find('#requireAlert333').remove();
  				var memberId = getUser();
        		memberId = memberId ? memberId:'';
        		var commodityType = meal ? 2:1;
        		var productID = productId;
        		var packageNo = meal ? meal.packageID : '';
		        demandCancel({memberID: memberId,commodityType:commodityType,productID:productID,packageNo:packageNo});
  			})


		    // 疗程装
		    var singleDetail = null;
		    if (!meal) {
		    	$.ajax({
			        // url: $.getGlobalVal().webRoot + '/getSingleComboByProductId',
			        url: '/getSingleComboByProductId',
			        // url: 'http://192.168.2.66:8080/AKGW-api/v1/getSingleComboByProductId?productID=120',
			        type: 'POST',
			        dataType:'json',
			        data: {
			            productID: productId
			        },
			        async: false,
			        success: function(res){
			            // console.log(res);
			            if(params.path != 0){ // 疗程装只在详情页
			            	return false;
			            }

			            if (!res.success || res.data.length <= 0 ){
			                $('#requireAlert333 .singleMeal').css({'display': 'none'});
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
			                async: false,
			                success: function(res2){
			                    if (!res2.success || res2.data.length <= 0 ){
			                        $('#requireAlert333 .singleMeal').css({'display': 'none'});
			                        return false;
			                    };
			                    $('#requireAlert333 .singleMeal').css({'display': 'block'});
			                    singleDetail = res2.data;
			                    var singleModule = ''
			                    for (var i = 0; i < singleDetail.length; i++) {
			                        singleModule += '<span packageID="'+singleDetail[i].packageID+'" index="'+i+'" qty="'+singleDetail[i].qty+'" qtyEnd="'+singleDetail[i].qtyEnd+'" oldPrice="'+singleDetail[i].ourPrice+'" newPrice="'+singleDetail[i].price+'">'+(singleDetail[i].detailpackageName?singleDetail[i].detailpackageName:'')+'</span>';
			                    }
			                    $('#requireAlert333 .singleMeal .liaoCheng').html(singleModule);
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
		    }
		    


		    // 选择疗程
		    $('#requireAlert333 .singleMeal').off('click','.liaoCheng span').on('click','.liaoCheng span',function(){
		        //$(this).addClass('active').siblings().removeClass('active');
		        var qty = Number($(this).attr('qty'));
		        
		        if ($(this).hasClass('active')) {
		            $(this).removeClass('active').siblings().removeClass('active');
		            qty = 1;
		        }else{
		            $(this).addClass('active').siblings().removeClass('active');
		            qty = Number($(this).attr('qty'));
		        }

		        // if(qty > product.reserves){
		        //     qty = product.reserves;
		        //     $.tips('没有更多库存了！',-1);
		        // }

		        $('#demandNum').val(qty);
		        totalMoney();
		    });

		    // 点击数量时 判断是那个疗程
		    function singChange(){
		        var singList = $('#requireAlert333 .singleMeal .liaoCheng span');
		        var value = Number($('#demandNum').val());
		        var index = '';
		        for (var i = 0; i < singList.length; i++) {
		            var qty = Number(singList.eq(i).attr('qty'));
		            var qtyEnd = Number(singList.eq(i).attr('qtyEnd'));

		            if(value >= qty && value <= qtyEnd){
		                index = singList.eq(i).attr('index');
		            }else{
		                continue;
		            }
		        }
		        if(index != ''){
		        	singList.eq(index).addClass('active').siblings().removeClass('active');
		        }else if(index == ''){
		        	singList.removeClass('active');
		        }
		        // singList.eq(index).addClass('active').siblings().removeClass('active');
		    }

		    // 合计
		    function totalMoney(){
		        // var oldPrice = oldPrice || 0;
		        // var newPrice = newPrice || 0;
		        // var qty = qty || 1;
		        var isLiao =  $('#requireAlert333 .liaoCheng .active').attr('index');
		        var packageID =  $('#requireAlert333 .liaoCheng .active').attr('packageID');
		        
		        // console.log(packageID,111);

		        if(!isLiao){
		            $('#alLiaoMoney').html('<span>价格：</span><p class="p-pri">￥ <span>'+priceInit(Number(product.ourPrice))+'</span></p>');

		            $('#productSend').html('<input type="hidden" name="productID" value="'+product.productID+'"><input type="hidden" name="productName" value="'+product.productName+'"><input type="hidden" name="productCode" value="'+product.productCode+'">');
		            return false;
		        };
		        $('#productSend').html('<input type="hidden" name="packageID" value="'+packageID+'">');

		        var qty = Number($('#demandNum').val());

		        var oldPrice = Number($('#requireAlert333 .liaoCheng .active').attr('oldPrice')) || productDetail.ourPrice;
		        var newPrice = Number($('#requireAlert333 .liaoCheng .active').attr('newPrice')) || productDetail.ourPrice;
		        
		        // 合计
		        var newMoney = (newPrice*qty).toFixed(2);
		        var oldMoney = (oldPrice*qty).toFixed(2);
		        var discountMoney = (oldMoney - newMoney).toFixed(2);
		        // $('.pro-i .he span').html(newMoney);
		        // $('.pro-i .you span').html('￥'+discountMoney);
		        $('#alLiaoMoney').html('<span>疗程价：</span><div><div class="he p-pri" style="float: left;">￥ <span>'+newMoney+'</span></div><div style="float:left;font-size:14px;color:#a7a7a7;margin-left:20px;">优惠<span>￥'+discountMoney+'</span></div></div>');
		    }


		}
	})
})

// 获取默认地址 会员信息
function getdefault(memberId,demand){
    // 会员信息
    $.ajax({
        // url: $.getGlobalVal().webRoot + '/vipSearchByID',
        url: '/vipSearchByID',
        type: 'POST',
        dataType: 'json',
        data: {
            id: memberId
        },
        success: function(res){
            // console.log('会员信息',res);
            $('.toLogin a').html('欢迎您'+res.memberName+'，以下为您的默认收货地址信息。');
            $(":radio[name='sex'][value='" + res.sex + "']").prop("checked", "checked");
            $('#carId').val(res.cardID);
        }
    })

    // 获取地址
    $.ajax({
        // url: $.getGlobalVal().webRoot + '/delivery/getDeliveryAddress?memberId='+memberId,
        url: '/delivery/getDeliveryAddress?memberId='+memberId,
        // type: 'POST',
        type: 'GET',
        dataType: 'json',
        // data:{},
        success: function(res){
            // console.log('收货地址',res);
            if(res.length > 0){
                var defaultAds = res[0];
                getProv(defaultAds.districtID,'city');
                getProv(defaultAds.city,'county');

                $('#userName').val(defaultAds.contactMan);
                $('#phone').val(defaultAds.mobile);
                $('#province').val(defaultAds.districtID);
                $('#city').val(defaultAds.city);
                $('#county').val(defaultAds.county);
                var adsHead = $("#province option:selected").text()+$("#city option:selected").text()+$("#county option:selected").text();
                var adsName = defaultAds.address;
                if(adsName.indexOf(adsHead) != -1){
                	adsName = adsName.replace(adsHead,'')
                }
                $('#addressName').val(adsName);
            }
        }
    })
}

// 获取省,市，区
function getProv(parentId,area){
    $.ajax({
        // url: $.getGlobalVal().webRoot + '/selectArea',
        url: '/selectArea',
        type: 'POST',
        dataType: 'json',
        data: {
            parentId: parentId
        },
        async: false
    }).done(function(res){
        //console.log(res);
        var list = '<option value="">请选择</option>';
        for (var i = 0; i < res.length; i++) {
            list += '<option value="'+res[i].id+'">'+res[i].name+'</option>'
        }
        $('#'+area).html(list)
    })
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


// 提交失败弹窗
function demandCancel(param){
	var memberID = param.memberID||'';
	var commodityType = param.commodityType||'';
	var productID = param.productID||'';
	var packageNo = param.packageNo||'';
	layui.use('layer',function(){
		var layer = layui.layer;
		layer.open({
		  	type: 1, 
		  	title: '关闭原因',
		  	content: '<div id="cancelLayer"><div class="cancelTips">如果您无法提交登记，建议您使用谷歌浏览器试试，您也可以直接拔打药师咨询电话<span>400-9309-990</span></div><div class="cancelContent">\
		  	<label class="radio_label" for="cancel1"><input checked="" id="cancel1" value="价格偏贵" name="cancelType" type="radio" autocomplete="off"><span class="radio_frame"><i></i></span><span>价格偏贵</span></label>\
		  	<label class="radio_label" for="cancel2"><input id="cancel2" value="需求登记无法提交" name="cancelType" type="radio" autocomplete="off"><span class="radio_frame"><i></i></span><span>需求登记无法提交</span></label>\
		  	<label class="radio_label" for="cancel3"><input id="cancel3" value="担心假货" name="cancelType" type="radio" autocomplete="off"><span class="radio_frame"><i></i></span><span>担心假货</span></label>\
		  	<label class="radio_label" for="cancel4"><input id="cancel4" value="随便看看" name="cancelType" type="radio" autocomplete="off"><span class="radio_frame"><i></i></span><span>随便看看</span></label>\
		  	<label class="radio_label otherReason" for="cancel5"><input id="cancel5" value="其他原因" name="cancelType" type="radio" autocomplete="off"><span class="radio_frame"><i></i></span><span>其他原因</span></label><textarea placeholder="请输入原因" id="otherMsg"></textarea></div></div>',
		  	id: 'cancelAlertID',
		  	area: '400px',
		  	skin: 'cancelAlert',
		  	btn: ['提交原因'],
		  	yes: function(index,layero){
				var causeoffailure = layero.find('input[name="cancelType"]:checked').val();
				causeoffailure = causeoffailure == '其他原因' ? causeoffailure+'：' + layero.find('#otherMsg').val():causeoffailure;
				var data = {
					memberID: memberID,
					commodityType: commodityType,
					// productID: productID,
					causeoffailure: causeoffailure,
					// packageNo: packageNo,
					sysNo: 'pc'
				}
				if(productID && productID != ''){
					data.productID = productID;
				};
				if(packageNo && packageNo != ''){
					data.packageNo = packageNo;
				};
				// console.log(data);
				// return false;
				$.ajax({
					// url: $.getGlobalVal().webRoot + '/require/addfailedRequire',
					url: '/require/addfailedRequire',
					// url: 'http://192.168.2.129:8083/AKGW-api/v1/require/addfailedRequire',
					type: 'POST',
					dataType: 'json',
					data: data,
					success: function(res){
						// console.log(res);
						layer.msg(res.msg);
		  				layer.close(index);
					},
					error: function(err){
						console.log(err);
						layer.msg('提交失败');
						layer.close(index);
					}
				})

		  	}
		});
	});

	// 单选
	$('body').off('change','input[name="cancelType"]').on('change','input[name="cancelType"]',function(){
		// console.log($(this).val());
		var cancelType = $(this).val();
		if (cancelType == "其他原因") {
			$('#otherMsg').css('display','inline-block').val('');
		}else{
			$('#otherMsg').css('display','none').val('');
		}
	})
}

// 提交成功
function yesAdd(msg){
	layui.use('layer',function(){
		var layer = layui.layer;
		layer.open({
			type: 0,
			title: '需求登记',
			area: '400px',
			skin: 'yesAdd',
			id: 'yesAddId',
			content: '<div id="yesAddLayer"><p class="yesCon">您的信息已提交，药师看到后会立即电话回拨为您服务，请留意来电！</p><p class="yesPhone">如紧急，请拨打<span>400-9309-990</span>咨询阿康健康专业药师</P><p class="yesTips">温馨提示：晚上11点后提交的需求登记将在次日早上给您回拨</p></div>'
		})
	})
}