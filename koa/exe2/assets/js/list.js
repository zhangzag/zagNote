
$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	//搜索内容
	var searchCon = getQueryString('ser_con') || null;
	
	//图片懒加载
	lazyLoad({
		imgSrc: '/images/ak_300x300.jpg',
	});

	var productTypeOne = getQueryString('productTypeOne'),productTypeTwo = getQueryString('productTypeTwo'),productNameUrl = getQueryString('productName');
	//console.log(productTypeOne,productTypeTwo,productNameUrl)
	
	var domain = window.location.host;
	domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
	
	$('.list-shou').click(function(){
		if($(this).children('span').html() == '收起'){
			$(this).children('span').html('展开').next().addClass('layui-icon-down').removeClass('layui-icon-up');
			$(this).parent().css({'height': '42px','overflow': 'hidden'})
		}else{
			$(this).children('span').html('收起').next().addClass('layui-icon-up').removeClass('layui-icon-down');
			$(this).parent().css({'height': '200px','overflow': 'hidden'})
			$(this).prev().css({'height': '200px','overflow': 'auto'})
			//console.log($(this).parent().css('overflow'))
		}
	})

	$('.tab-card .sortType').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})

	// 获取渲染 数据
	var loadIndex = null;
	var resList = null;
	function getList(curr,tabPage){
		layui.use('layer',function(){
			var layer = layui.layer;
			loadIndex = layer.load(2);
		})
		var lowestPrice = $('.tab-card .input-w input').eq(0).val();
		var highest = $('.tab-card .input-w input').eq(1).val();
		var productDrugType = $('.pro-type .productDrugType').find('.productDrugActive').html();
		var brandId = $('.pro-type .brandList').find('.brandActive').attr('brandId');
		var listProName = $.trim($('#productName').val());	
					
		lowestPrice = lowestPrice ? lowestPrice:null;
		highest = highest ? highest:null;
		productDrugType = productDrugType ? productDrugType:null;
		brandId = brandId ? brandId:null;
		listProName = listProName ? listProName: null;
		var productName = listProName == null ? productNameUrl:listProName
		var countData = {
			page: curr,
			limit: 20,
			productName: productName, //产品名称
			isImport: null, //是否进口
			productDrugType: productDrugType, // 剂型
			brandId: brandId, //品牌
			lowestPrice: lowestPrice,//最低价格
			highest: highest,//最高价格
			productType_one: productTypeOne,//父级ID
			productType_two: productTypeTwo,//当前科室ID
			sysNo: 'wap', //终端
		}
		$.ajax({
			// url: $.getGlobalVal().webRoot + '/product/getProductList',
			url: '/product/getProductList',
			type: 'POST',
			dataType: 'json',
			data: countData,
			// async: false,
			success: function(res){
				//console.log(res);
				$('.crumbs-bar .cru-s p span').html(res.count);
				$('.tab-card .page .tabCount').html(Math.ceil(res.count/20));
				$('.pro-wrap').html('');
				resList = res.data;
				if(res.data.length <= 0){
					layui.use('layer',function(){
						var layer = layui.layer;
						layer.close(loadIndex);
					})
					$('.pro-wrap').html('<h5>没有更多数据了！</h5>');
				}else{
					var eleItem = '';
					for (var i = 0; i < res.data.length; i++) {
						var isBuy = null;
						if(res.data[i].prescriptionType == 1){
							isBuy = '<button class="demandBtn">需求登记</button>'
						}else{
							isBuy = '<button class="buyBtn">立即购买</button>'
						}

						eleItem += '<div class="item" productIndex="'+i+'" productId="'+res.data[i].productID+'"><a target="_blank" class="product-info" href="/products/'+res.data[i].productNumber+'.html"><img class="lazy" data-original="'+ (res.data[i].defaultPhoto?res.data[i].defaultPhoto:'') +'" alt="'+ res.data[i].productName +'" title="'+ res.data[i].productName +'"><p><i class="'+$.imgType(res.data[i].prescriptionType)+'"></i>'+ res.data[i].productName +'</p></a><div class="buy"><div class="pri"><span class="buy-pri">' + $.priceFilter(res.data[i].ourPrice) + '</span><span class="old-pri">' + $.priceFilter(res.data[i].price) + '</span></div><div class="num-wrap"><span class="reduce"></span><input class="num" value="1" maxStore="'+res.data[i].reserves+'"/><span class="add"></span></div></div>'+isBuy+'</div>'
						
					}
					$('.pro-wrap').html(eleItem)
				}
				
				layui.use('layer',function(){
					var layer = layui.layer;
					layer.close(loadIndex);
				})
				//图片懒加载
                lazyLoad({
                    imgSrc: '/static/images/ak_300x300.jpg',
                });

				if(curr <= 1 || tabPage){
					layui.use('laypage', function(){
						var laypage = layui.laypage;
						//执行一个laypage实例
						laypage.render({
							elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
							count: res.count, //数据总数，从服务端得到
							limit: 20, //每页显示的条数
							curr: curr,
							layout: ['page', 'prev', 'next'], //自定义排版
							theme: '#a7a7a7', // 主题
							jump: function(obj,first){ //切换分页的回调
								$('.tab-card .page .tabCurr').html(obj.curr)
								if(!first){
									getList(obj.curr);
								}
							}
						})
					})
				}
			}
		})
	}
	// getList(1);
	//页数
	if( $('.pro-wrap .item').length>0 ){
		var items = $('.pro-wrap .item');

		layui.use('laypage', function(){
			var laypage = layui.laypage;
			//执行一个laypage实例
			laypage.render({
				elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
				count: $('#prosCount').attr('data-count') || 0, //数据总数，从服务端得到
				limit: 20, //每页显示的条数
				curr: 1,
				layout: ['page', 'prev', 'next'], //自定义排版
				theme: '#a7a7a7', // 主题
				jump: function(obj,first){ //切换分页的回调
					$('.tab-card .page .tabCurr').html(obj.curr)
					if(!first){
						getList(obj.curr);
					}
				}
			})
		})
	};

	// 数量
	$('.pro-wrap').on('click','.reduce',function(){
		var num = Number($(this).next().val());
		if(!/^[0-9]*$/.test(num)){
            tips('请输入数字',2)
            $(this).next().val(1)
            return false;
        }
		num--;
		num = num <= 1 ? 1:num;
		$(this).next().val(num);
	})

	$('.pro-wrap').on('click','.add',function(){
		var num = Number($(this).prev().val());
		if(!/^[0-9]*$/.test(num)){
            tips('请输入数字',2)
            $(this).prev().val(1)
            return false;
        }
		num++;
		// if(num > Number($(this).prev().attr('maxStore'))){
		// 	num = $(this).prev().attr('maxStore');
		// 	tips('没有更多库存了！',null)
		// }
		$(this).prev().val(num);
	})

	// 品牌刷选
	$('.pro-type .brandList').on('click','a',function(){
		$('.crumbs').find('.crumbBrand').remove();
		$('.crumbs').append('<span class="crumbBrand" brandId="'+$(this).attr('brandId')+'">'+$(this).html()+'</span>');
		$(this).addClass('brandActive').parent().siblings().find('a').removeClass('brandActive');

		getList(1); //分页
	})
	
	// 剂型
	$('.pro-type .productDrugType').on('click','a',function(){
		$(this).addClass('productDrugActive').parent().siblings().find('a').removeClass('productDrugActive');
		var productDrugType = $(this).html();
		var brandId = $('.pro-type .brandList').find('.brandActive').attr('brandId');
		// console.log(productDrugType);
		
		getList(1); // 获取 分页商品
	})

	// 价格弹窗
	$('.priAlert input').click(function(){
		$(this).parent().parent().addClass('pri').children('.pri-btn').css({'display': 'block'});
	})
	$('.priAlert .pri-ok').click(function(){
		var lowestPrice = $('.tab-card .input-w input').eq(0).val();
		var highest = $('.tab-card .input-w input').eq(1).val();
		//console.log(lowestPrice,highest)
		if(Number(lowestPrice) > Number(highest)){
			layui.use('layer',function(){
				layer.msg('请填写正确的价格区间',{
					icon:2
				})
			})
		}else{
			$(this).parent().css({'display': 'none'}).parent().removeClass('pri');
			var productDrugType = $('.pro-type .productDrugType').find('.productDrugActive').html();
			var brandId = $('.pro-type .brandList').find('.brandActive').attr('brandId');
			productDrugType = productDrugType ? productDrugType:null;
			brandId = brandId ? brandId:null;
			
			getList(1); //分页 商品
		}
	})
	$('.priAlert .pri-cle').click(function(){
		$(this).parent().css({'display': 'none'}).siblings('.input-w').children('input').val('').parent().parent().removeClass('pri');
		getList(1)
	})

	// 搜索
	$('#searchBtn').click(function(){
		var productName = $.trim($('#productName').val());
		var brandId = $('.crumbs .crumbBrand').attr('brandId') ? $('.crumbs .crumbBrand').attr('brandId'): null;
		
		getList(1);  //分页 商品
	})

	// 导航条分页
	var timeKong = true;
	$('#tabPageNext').click(function(){
		if(timeKong){
			var pageCurr = Number($('.tab-card .page .tabCurr').html()),
			tabCount = Number($('.tab-card .page .tabCount').html());
			pageCurr++;
			pageCurr = pageCurr > tabCount ? tabCount:pageCurr
			$('.tab-card .page .tabCurr').html(pageCurr);
			getList(pageCurr,'tabPage')
		}
	})
	$('#tabPagePrev').click(function(){
		var pageCurr = Number($('.tab-card .page .tabCurr').html()),
			tabCount = Number($('.tab-card .page .tabCount').html());
		pageCurr--;
		pageCurr = pageCurr < 1 ? 1:pageCurr
		$('.tab-card .page .tabCurr').html(pageCurr);
		getList(pageCurr,'tabPage')
	})


	// 需求弹窗
    // $('.pro-wrap').on('click','.demandBtn',function(){
    // 	var count = $.trim($(this).prev().find('.num-wrap .num').val());

    // 	if(!/^[0-9]*$/.test(count)){
    //         count = 1
    //     }
    //     $(this).prev().find('.num-wrap .num').val(count);
    //     var productIndex = $(this).parent().attr('productIndex')
    //     var productInfor = resList[productIndex];
    //     // console.log(productInfor)
    //     $.require({path: 1,product:productInfor,qty: count,requireGtag:requireGtag})
    //     // return false;
	// })
	$('.demandBtn').click(function(){
		var productNumber = $(this).attr('data-proNum') || '';

		if(!productNumber&&productNumber!=0){
			tips('获取商品信息失败',2);
			return;
		}
		
		var count = $.trim($(this).siblings('.buy').find('.num-wrap .num').val());
		if(!/^[0-9]*$/.test(count)){
            count = 1
		}
		$(this).siblings('.buy').find('.num-wrap .num').val(count);
		
		$.ajax({
			// url: $.getGlobalVal().webRoot + '/product/findProductByProductNumber',
			url: '/product/findProductByProductNumber',
			data: {
				productNumber: productNumber
			}
		})
		.done(function(res){
			// console.log(res)
			if(res.data == null){    
				tips(res.msg, 2);
				return false;
			}

			var productInfor = res.data;
			$.require({path: 1,product:productInfor,qty: count,requireGtag:requireGtag})
		})
	});


    // 立即购买
    var canBuy = true;
    $('.pro-wrap').on('click','.buyBtn',function(){
    	var count = $.trim($(this).prev().find('.num-wrap .num').val()),
    		productId = $(this).parent().attr('productId');
    		// console.log(productId,count)

    	if(!/^[0-9]*$/.test(count)){
            tips('请输入数字',2)
            $(this).prev().find('.num-wrap .num').val(1)
            return false;
        }

        // 判断是否登录
    	var memberId = getUser();
        if(!memberId){
            $.loginAlert();
            // tips('还没登陆喔，请前往登陆！',2);
            return false;
		}
		
		gtag('event', '点击立即购买', {
		  'event_category' : '商品id：' + productId
		});

    	window.location.href = '/submitOrder.html';
        $.cookie('order',JSON.stringify({orderType:1,productId:productId,qty:Number(count)}),{  path:'/', domain:domain, /*secure:true*/});
    })


    // 登录 弹窗 出现
    var loginLayui = null;
    $('#loginShow').click(function(){
        // getdefault(15603);
        if($.getGlobalVal().memberId){
            return false;
        }
        var callback = {}
        callback.getdefault = getdefault;
        $.loginAlert(callback);
    })

})

function tips(tipsText,icon){
	layui.use('layer',function(){
        layer.msg(tipsText,{
        	icon: icon,
            time: 1000
        })
    })
}

//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
    
}

//获取url参数 -- 中文
function getQueryString(name) { 
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	  var r = window.location.search.substr(1).match(reg); 
	  if (r != null) return decodeURI(r[2]); return null; 
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

// 需求统计
function requireGtag(param){
    var title = param.title || '提交需求登记';
    var content = param.content || {};

	gtag('event', title , content);
}