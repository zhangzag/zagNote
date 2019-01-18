
$(function(){
    var domain = window.location.host;
    domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
    $.ajax({
        url: $.getGlobalVal().webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data:{
             endDate: $.getGlobalVal().curDate, //结束时间，当前时间
              pageNo: 'pcmanbing', //广告位置
              isValid: 1,//是否有效
        },
        success: function(res){
            //console.log('轮播图：',res);
            $('#roteAdv').html('');
            for (var i = 0; i < res.data.length; i++) {
                var bannerId = i+1;
                var bannerItem = '<li id="'+bannerId+'">';
                    bannerItem +=   '<a target="_blank" href="'+res.data[i].advertisementUrl+'">';
                    bannerItem +=    '<img src="'+imgUrl(res.data[i].advertisementPhoto)+'" alt="">';
                    bannerItem +=   '</a>';
                    bannerItem +='</li>';
                $('#roteAdv').append(bannerItem);
            };

             //轮换广告 start
            $('#roteAdv').after("<div class='slider' id='roteAdv_nav' style=''>").cycle({
                prev: '#turnL',
                next: '#turnR',
                fx:     'fade',
                speed:  '300',
                timeout: 5000,
                pager:  '#roteAdv_nav',
                before: function() { 
                    // if (window.console) {
                    //     console.log(32323233)
                    // }
                //console.log(this.src); 
                },
                pagerAnchorBuilder:function(index,slide){
                    var count=index+1;
                    if(index==0){
                        return '<span id="c'+count+'"  class="cur"></span>'
                    }else{
                        return '<span  id="c'+count+'"></span>'
                    }
                },
                after:function(currSlideElement, nextSlideElement, options, forwardFlag){
                    var a= $("#roteAdv_nav").find("span").attr("class","");
                    $("#c"+nextSlideElement.id).attr("class","cur");
                }
            });
            /*轮换广告 end*/
        }
    });

    // 推荐位置
    $.ajax({
        url: $.getGlobalVal().webRoot + '/seachSt',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: $.getGlobalVal().curDate, //结束时间，当前时间
            pageNo: 'pcChronicTuiJian', //商品推荐位置
            isValid: 1,//是否有效
        },
        async: false,
    }).done(function(res){
        // console.log('慢病推荐名称： ',res)
        if( !res.success || res.data.length===0 ){
            return false;
        };

        // 获取推荐广告图
        $.ajax({
            url: $.getGlobalVal().webRoot + '/seachAd',
            type: 'POST',
            dataType: 'json',
            data: {
                endDate: $.getGlobalVal().curDate, //结束时间，当前时间
                pageNo: 'pcChronicTuiJian', //商品推荐位置
                isValid: 1,//是否有效
            },
            async: false,
        }).done(function(resBanner){
            // console.log('慢病推荐广告',resBanner);
            $('.first .left').html('<a target="_blank" href="'+imgUrl(resBanner.data[0].advertisementUrl)+'"><img src="'+imgUrl(resBanner.data[0].advertisementPhoto)+'" ></a>');
        });
        
        // 获取商品推荐明细
        $.ajax({
            url: $.getGlobalVal().webRoot + '/seachStDetail',
            type: 'POST',
            dataType: 'json',
            data:{
                endDate:  $.getGlobalVal().curDate,//结束时间，当前时间
                showID: res.data[0].showID,///商品推荐位置id
                isValid: 1,//是否有效
            },
            async: false,
        }).done(function(data){
            // console.log('慢病推荐商品id ',data)
            if( !data.success || data.data.length===0 ){
                return false;
            };
            var list = data.data;

            // 获取 推荐里的商品id
            var productIdArr = [];
            for( var i=0; i<list.length; i++ ){
                productIdArr.push(list[i].productID);
            };

            //根据商品ID获取商品详情
            $.ajax({
                url: $.getGlobalVal().webRoot + '/product/getProductByProductNumber',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                  memberId: $.getGlobalVal().memberId,
                  productNumbers: productIdArr,
                }),
                headers: {'Content-Type' : 'application/json;charset=utf-8'},
                async: false,
            })
            .done(function(resDetail) {
                // console.log('慢病推荐商品详情： ',resDetail);
                var productList = resDetail.data;
                // 推荐上层商品
                for (var i = 0; i < 2; i++) {
                    if(!productList[i]){break}
                    var topItem = '<div class="product"><div class="pro-l"><h6>'+proudctNameInit(productList[i].productName)+'</h6><p>'+productList[i].isHelpFor+'</p><div class="btn-wrap"><span class="pri">￥'+productList[i].ourPrice+'</span><a target="_blank" class="det" href="/products/'+productList[i].productNumber+'.html">查看详情</a></div></div><div class="pro-img"><a target="_blank" href="/products/'+productList[i].productNumber+'.html"><img class="lazy" data-original="'+ (productList[i].productPhotos[0]?productList[i].productPhotos[0].photoURL:'') +'" alt="'+ productList[i].productName +'" title="'+ productList[i].productName +'"></a></div></div>';
                    $('.first .right-top').append(topItem);
                };
                // 推荐下层商品
                for (var k = 2; k < 6; k++) {
                    if(!productList[k]){break}
                    var bottomItem = '<div class="pro-list"><a target="_blank" href="/products/'+productList[k].productNumber+'.html"><img class="lazy" data-original="'+ (productList[k].productPhotos[0]?productList[k].productPhotos[0].photoURL:'') +'" alt="'+ productList[k].productName +'" title="'+ productList[k].productName +'"></a><h6><a target="_blank" href="/products/'+productList[k].productNumber+'.html">'+proudctNameInit(productList[k].productName)+'</a></h6><p>'+productList[k].isHelpFor+'</p><span>￥'+productList[k].ourPrice+'</span></div>';
                    $('.first .right-bottom').append(bottomItem);
                };

                // //图片懒加载
                lazyLoad({
                    imgSrc: '/static/images/ak_300x300.jpg',
                });
            })
            .fail(function() {
                console.log("error");
            });

        }).fail(function(err){
            console.log(err)
        });
    });

    
    // 列表
    var resList = null;
    $.ajax({
        url: $.getGlobalVal().webRoot + '/seachSt',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: $.getGlobalVal().curDate, //结束时间，当前时间
            pageNo: 'pManBingList', //商品推荐位置
            isValid: 1,//是否有效
        },
        async: false,
    }).done(function(res){
        // console.log('慢病列表',res)
        if( !res.success || res.data.length===0 ){
            return false;
        };
        // 获取商品推荐明细
        $.ajax({
            url: $.getGlobalVal().webRoot + '/seachStDetail',
            type: 'POST',
            dataType: 'json',
            data:{
                endDate:  $.getGlobalVal().curDate,//结束时间，当前时间
                showID: res.data[0].showID,///商品推荐位置id
                isValid: 1,//是否有效
            },
            async: false,
        }).done(function(data){
            // console.log('列表商品id',data)
            if( !data.success || data.data.length===0 ){
                return false;
            }
            var list = data.data;

            // 获取 推荐里的商品id
            var productIdArr = [];
            for( var i=0; i<list.length; i++ ){
                productIdArr.push(list[i].productID);
            };

            //根据商品ID获取商品详情
            $.ajax({
                url: $.getGlobalVal().webRoot + '/product/getProductByProductNumber',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                  memberId: $.getGlobalVal().memberId,
                  productNumbers: productIdArr,
                }),
                headers: {'Content-Type' : 'application/json;charset=utf-8'},
                async: false,
            })
            .done(function(resDetail) {
                // console.log('列表商品详情： ',resDetail);
                var productList = resDetail.data;
                resList = resDetail.data;
                // 列表
                // console.log(productList.length)
                for (var x = 0; x < productList.length; x++) {
                    var isBuy = null;
                    //console.log(222222)
                    if(productList[x].prescriptionType == 1){
                        isBuy = '<button class="demand-btn">需求登记</button>'
                    }else{
                        isBuy = '<button class="buy-btn">立即购买</button>';
                    };

                    var proItem = '<div class="item" productIndex="'+x+'" productId="'+productList[x].productID+'"><div class="pro-img"><a target="_blank" href="/products/'+productList[x].productNumber+'.html"><img class="lazy" data-original="'+ (productList[x].productPhotos[0]?productList[x].productPhotos[0].photoURL:'') +'" alt="'+ productList[x].productName +'" title="'+ productList[x].productName +'"></a></div><p><a target="_blank" href="/products/'+productList[x].productNumber+'.html"><i class="'+$.imgType(productList[x].prescriptionType)+'"></i>'+productList[x].productName+'</a></p><div class="buy"><div class="pri"><span class="buy-pri">￥'+productList[x].ourPrice+'</span><span class="old-pri">￥'+productList[x].price+'</span></div><div class="num-wrap"><span class="reduce"></span><input class="num" value="1" maxStore="'+productList[x].reserves+'"/><span class="add"></span></div></div>'+isBuy+'</div>';

                    $('.pro-wrap').append(proItem);
                };

                //图片懒加载
                lazyLoad({
                    imgSrc: '/static/images/ak_300x300.jpg',
                });
            })
            .fail(function() {
                console.log("error");
            });
        }).fail(function(err){
            console.log(err)
        });
    });

    $('.pro-wrap').on('click','.reduce',function(){
        var num = Number($(this).next().val());
        if(!/^[0-9]*$/.test(num)){
            tips('请输入数字',2);
            $(this).next().val(1);
            return false;
        };
        num--;
        num = num <= 1 ? 1:num;
        $(this).next().val(num);
    });

    $('.pro-wrap').on('click','.add',function(){ 
        var num = Number($(this).prev().val());
        // console.log(num)
        if(!/^[0-9]*$/.test(num)){
            tips('请输入数字',2);
            $(this).prev().val(1);
            return false;
        };
        num++;
        // if(num > Number($(this).prev().attr('maxStore'))){
        //     num = $(this).prev().attr('maxStore');
        //     tips('没有更多库存了！',null)
        // };
        $(this).prev().val(num);
    });
    
    // 需求弹窗
    $('.pro-wrap').on('click','.demand-btn',function(){
        var count = $.trim($(this).prev().find('.num-wrap .num').val());

        if(!/^[0-9]*$/.test(count)){
            count = 1;
        };
        $(this).prev().find('.num-wrap .num').val(count);
        var productIndex = $(this).parent().attr('productIndex');
        var productInfor = resList[productIndex];
        // console.log(productInfor);
        $.require({path: 2,product: productInfor,qty: count,requireGtag:requireGtag});
        
    });


    // 需求弹窗
    // var demandIndex = null;
    // var productInfor = null;
    // var canDemand = true;
    // $('.pro-wrap').on('click','.demand-btn',function(){
    //     //console.log(111)
    //     canDemand = true;
    //     var count = $.trim($(this).prev().find('.num-wrap .num').val());

    //     if(!/^[0-9]*$/.test(count)){
    //         $(this).prev().find('.num-wrap .num').val(1);
    //     };
    //     $('#userName').val('');
    //     $('#phone').val('');
    //     $('#demandNum').val(count);
    //     $('#demandRemark').val('');
    //     $('#province').val('请选择');
    //     $('#city').val('请选择');
    //     $('#county').val('请选择');
    //     $('#addressName').val('');
    //     $('#age').val('');
    //     $(":radio[name='sex'][value='男']").prop("checked", "checked");
    //     // $("input[type='checkbox'][name='isStore']").prop('checked',false);
    //     $('#carId').val('');
    //     var obj = document.getElementById('file'); 
    //     obj.outerHTML=obj.outerHTML; // 清空上传图片file
    //     $('#upload img').attr({src:''});
    //     $('#upload span').css({'display':'block'});
        
    //     layui.use('layer',function(){
    //         var layer = layui.layer;
    //         demandIndex = layer.open({
    //             type: 1,
    //             area: ['660px','650px'],
    //             title: ['需求登记','background-color: #E8E8E8;'],
    //             content: $('#demandAlert'),
    //             skin: 'demand-alert',
    //             scrollbar: false,
    //             offset: '50px',
    //             cancel: function(){
    //                 $('#demandAlert').css({'display': 'none'})
    //             }
    //         });
    //     });
    //     var _self = this;
    //     var productIndex = $(this).parent().attr('productIndex');
    //     productInfor = resList[productIndex];
    //     // console.log(productInfor)
    //     $('#demandAlert .productInfo>a img').attr({'src': productInfor.productPhotos[0]?productInfor.productPhotos[0].photoURL:'/static/images/ak_300x300.jpg'});
    //     $('#demandAlert .p-text').html(productInfor.productName);
    //     $('#demandAlert .p-pri span').html(productInfor.ourPrice);
    //     $('#demandAlert .p-gui').html(productInfor.spec);

    //     getProv(null,'省');
    //     // 判断是否登录
    //     var memberId = getUser();
    //     if(!memberId){
    //         $('.toLogin a').html('登录阿康会员，可帮助您快速提交需求！');
    //     }else{
    //         getdefault(memberId);
    //     };
    // });

    // // 获取默认地址 会员信息
    // function getdefault(memberId){
    //     // 会员信息
    //     $.ajax({
    //         url: $.getGlobalVal().webRoot + '/vipSearchByID',
    //         type: 'POST',
    //         dataType: 'json',
    //         data: {
    //             id: memberId
    //         },
    //         success: function(res){
    //             // console.log('会员信息',res);
    //             $('.toLogin a').html('欢迎您'+res.memberName+'，以下为您的默认收货地址信息。');
    //             $(":radio[name='sex'][value='" + res.sex + "']").prop("checked", "checked");
    //             $('#carId').val(res.cardID);
    //         }
    //     });

    //     // 获取地址
    //     $.ajax({
    //         url: $.getGlobalVal().webRoot + '/delivery/getDeliveryAddress?memberId='+memberId,
    //         type: 'POST',
    //         dataType: 'json',
    //         data:{},
    //         success: function(res){
    //             // console.log('收货地址',res);
    //             if (res.length > 0) {
    //                 var defaultAds = res[0];
    //                 getProv(defaultAds.districtID,'市');
    //                 getProv(defaultAds.city,'区');

    //                 $('#userName').val(defaultAds.contactMan);
    //                 $('#phone').val(defaultAds.mobile);
    //                 $('#province').val(defaultAds.districtID);
    //                 $('#city').val(defaultAds.city);
    //                 $('#county').val(defaultAds.county);
    //                 $('#addressName').val(defaultAds.address);
    //             };
    //         }
    //     });
    // };

    // // 获取省,市，区
    // function getProv(parentId,area){
    //     $.ajax({
    //         url: $.getGlobalVal().webRoot + '/selectArea',
    //         type: 'POST',
    //         dataType: 'json',
    //         data: {
    //             parentId: parentId
    //         },
    //         async: false
    //     }).done(function(res){
    //         //console.log(res);
    //         if(area == '省'){ // 省
    //             $('#province').html('<option value="请选择">请选择</option>');
    //             for (var i = 0; i < res.length; i++) {
    //                 $('#province').append('<option value="'+res[i].id+'">'+res[i].name+'</option>')
    //             };  
    //         }else if(area == '市'){ // 市
    //             $('#city').html('<option value="请选择">请选择</option>');
    //             for (var i = 0; i < res.length; i++) {
    //                 $('#city').append('<option value="'+res[i].id+'">'+res[i].name+'</option>')
    //             };
    //         }else if (area == '区') {
    //             $('#county').html('<option value="请选择">请选择</option>');
    //             for (var i = 0; i < res.length; i++) {
    //                 $('#county').append('<option value="'+res[i].id+'">'+res[i].name+'</option>')
    //             };
    //         };
    //         //$('#province').val(58)
    //     });
    // };
    // // 获取市
    // $('#province').change(function(){
    //     //console.log($(this).val());
    //     if ($(this).val() == '请选择') {
    //         $('#city').html('<option value="请选择">请选择</option>');
    //         $('#county').html('<option value="请选择">请选择</option>');
    //         return false;
    //     };
    //     $('#city').html('<option value="请选择">请选择</option>');
    //     $('#county').html('<option value="请选择">请选择</option>');
    //     getProv(Number($(this).val()),'市');
    // });
    // // 获取 区
    // $('#city').change(function(){
    //     //console.log($(this).val());
    //     if($(this).val() == '请选择'){
    //         $('#county').html('<option value="请选择">请选择</option>');
    //         return false;
    //     };
    //     $('#county').html('<option value="请选择">请选择</option>');
    //     getProv(Number($(this).val()),'区');
    // });

    // // 上传 处方笺
    // $('#upload').on('change','#file',function(){
    //     var event = $(this);
    //     var file = this.files[0];
    //     if (window.FileReader) {    
    //         var reader = new FileReader();    
    //         reader.readAsDataURL(file);    
    //         //监听文件读取结束后事件    
    //         reader.onloadend = function (e) {
    //             // e.target.result就是最后的路径地址 base64 路径
    //             event.parent().find('img').prop('src',e.target.result);
    //             event.parent().find('span').css({'display':'none'});
    //         };    
    //     };
    // });

    // // 数量 减
    // $('#demandAlert .reduce').click(function(){
    //     var demandNum = $.trim($(this).next().val());
    //     if(!/^[0-9]*$/.test(demandNum)){
    //         tips('请输入数字',2);
    //         $('#demandNum').val(1);
    //         return false;
    //     };
    //     demandNum--;
    //     demandNum = demandNum < 1 ? 1:demandNum;
    //     $(this).next().val(demandNum); 
    // });

    // // 数量 加
    // $('#demandAlert .add').click(function(){
    //     var demandNum = $.trim($(this).prev().val());
    //     if(!/^[0-9]*$/.test(demandNum)){
    //         tips('请输入数字',2);
    //         $('#demandNum').val(1);
    //         return false;
    //     };
    //     demandNum++;
    //     if(demandNum > productInfor.reserves){
    //         demandNum = productInfor.reserves;
    //         tips('没有更多库存了！',null);
    //     };
    //     $(this).prev().val(demandNum);
    // });

    // // 需求登记
    // $('#demandAlert .demand-submit').click(function(){
    //     var userName = $.trim($('#userName').val()),
    //         phone = $.trim($('#phone').val()),
    //         qty = $.trim($('#demandNum').val()),
    //         demandRemark = $.trim($('#demandRemark').val()),
    //         addressName = $.trim($('#addressName').val()),
    //         age = $.trim($('#age').val()),
    //         sex = $("input[name='sex']:checked").val() == '男' ? 1:2,
    //         isStore = $("input[type='checkbox'][name='isStore']").prop('checked') == true ? 1:0,
    //         carID = $.trim($('#carId').val()),
    //         // imgstr = document.getElementById("file").files[0];
    //         imgstr = $('#upload img').prop('src') == window.location.href ? '':$('#upload img').prop('src');

    //     var prov = $("#province option:selected").text() == '请选择' ? '':$("#province option:selected").text();  //获取选中的地址
    //     var city = $("#city option:selected").text() == '请选择' ? '':$("#city option:selected").text();
    //     var county = $("#county option:selected").text() == '请选择' ? '':$("#county option:selected").text();
    //     // console.log(prov,city,county)

    //     var memberId = getUser();

    //     if(!/^[0-9]*$/.test(qty)){
    //         tips('数量请输入数字',2);
    //         $('#demandNum').val(1);
    //         return false;
    //     };
    //     if(userName == ''){
    //         tips('姓名不能为空',2);
    //         return false;
    //     };
    //     if(phone == ''){
    //         tips('手机不能为空',2);
    //         return false;
    //     };
    //     if(!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone)){
    //         tips('手机格式不正确',2);
    //         return false;
    //     };      

    //     // if(prov == '请选择' || city == '请选择' || county == '请选择'){
    //     //     tips('请选择地区',2)
    //     //     return false
    //     // }
    //     // if(addressName == ''){
    //     //     tips('请填写详细地址',2)
    //     //     return false
    //     // }
    //     if (!/^[1-9]\d*$/.test(age) && age!= '') {
    //         tips('年龄请填写正整数',2);
    //         $('#age').val('');
    //         return false;
    //     };

    //     if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/.test(carID) && carID!= '') {
    //         tips('身份证号格式不正确',2);
    //         return false;
    //     };
    //     var adsHead = prov+city+county;
    //     addressName = addressName.indexOf(adsHead) == -1 ? adsHead+addressName:addressName;
        
    //     var formData = new FormData();
    //     formData.append("productID",productInfor.productID);
    //     formData.append("productName",productInfor.productName);
    //     formData.append('productCode',productInfor.productCode);
    //     if(productInfor.detailCodeID != null){
    //         formData.append("detailCodeID",productInfor.detailCodeID);
    //     }
    //     formData.append("qty",qty);
    //     if(memberId){
    //        formData.append("memberID",memberId); 
    //     }
        
    //     formData.append("realName",userName);
    //     formData.append("phone",phone);
    //     formData.append("remark",demandRemark);
    //     formData.append("sysNo",'pc');
    //     formData.append("DeliveryAddress",addressName);
    //     formData.append("sex",sex);
    //     formData.append("carId",carID);
    //     formData.append("isStore", isStore);
    //     formData.append("age", age);
    //     if (imgstr != '') {
    //         formData.append("imgstr", imgstr); 
    //     } ;  
    //     if(canDemand){   
    //         canDemand = false;
    //         $.ajax({
    //             url: $.getGlobalVal().webRoot + '/require/addRequire',
    //             type: 'POST',
    //             dataType: 'json',
    //             data: formData,
    //             processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
    //             contentType: false,
    //             async: false,
    //         }).done(function(res){
    //             gtag('event', '提交需求登记', {
    //               'event_category' : '商品id：' + productInfor.productID,
    //               'event_label' : '提交结果：' + res.msg
    //             });
    //             $.finishTips('需求登记提示',res.msg);
    //             layer.close(demandIndex);
                
    //         }).fail(function(err){
    //             console.log(err)
    //         });
    //     };
    // });

    // // 返回
    // $('#demandAlert .demand-cancel').click(function(){
    //     layui.use('layer',function(){
    //         var layer = layui.layer;
    //         layer.close(demandIndex);
    //     })
        
    // });

    // 立即购买
    $('.pro-wrap').on('click','.buy-btn',function(){
        var count = $.trim($(this).prev().find('.num-wrap .num').val()),
            productId = $(this).parent().attr('productId');
            // console.log(productId,count)

        if(!/^[0-9]*$/.test(count)){
            tips('请输入数字',2);
            $(this).prev().find('.num-wrap .num').val(1);
            return false;
        };
        // 判断是否登录
        var memberId = getUser();
        if(!memberId){
            $.loginAlert();
            // tips('还没登陆喔，请前往登陆！',2);
            return false;
        };
        // if($(this).prev().find('.num').attr('maxStore') == 0){
        //     tips('此商品缺货，紧急备货中！',2);
        //     return false;
        // };
        // if(count >  $(this).prev().find('.num').attr('maxStore')){
        //     tips('库存不足',null);
        //     $(this).prev().find('.num').val($(this).prev().find('.num').attr('maxStore'));
        //     return false;
        // };

        gtag('event', '点击立即购买', {
          'event_category' : '商品id：' + productId
        });
        //window.location.href = '/submitOrder.html?productId='+productId+'&count='+count;
        window.location.href = '/submitOrder.html';
        $.cookie('order',JSON.stringify({orderType:1,productId:productId,qty:Number(count)}),{  path:'/', domain:domain, /*secure:true*/});
    });

    // 登录弹窗 出现
    var loginLayui = null;
    $('#loginShow').click(function(){
        // getdefault(15603);
        if($.getGlobalVal().memberId){
            return false;
        }
        var callback = {};
        callback.getdefault = getdefault;
        $.loginAlert(callback);
    });

});

function imgUrl(imgUrl){
// "http://113.108.163.210:9999/upLoadProduct/15317125707382018-07-16-11-42-50.png"

    // if(imgUrl.indexOf('http://113.108.163.210:9999') != -1){
    //     return imgUrl.replace('http://113.108.163.210:9999','http://192.168.2.250:8081')
    // }
    // if(imgUrl.indexOf('http://localhost:8081') != -1){
    //     return imgUrl.replace('http://localhost:8081','')       
    // }
    // if(imgUrl.indexOf('http://localhost:80') != -1){
    //     return imgUrl.replace('http://localhost:80','http://113.108.163.210:9999')
    // }
    return imgUrl;
};

function proudctNameInit(productName){
    // 【RX】【多盒优惠】新港 依斯坦 依西美坦片 25mg*10片*1瓶/盒
    // if(productName.indexOf('】') != -1){
    //    //console.log(productName.lastIndexOf('】'))
    //    productName = productName.substring(productName.lastIndexOf('】')+1)
    // }
    return $.trim(productName);
};

function tips(tipsText,icon){
    layui.use('layer',function(){
        layer.msg(tipsText,{
            icon: icon,
            time: 1000
        })
    })
};

// 获取cookie 会员id
function getUser(){
    var arrstr = document.cookie.split("; ");
    //console.log(arrstr)
    for(var i = 0;i < arrstr.length;i ++){
        var temp = arrstr[i].split("=");
        if(temp[0] == 'memberId' && temp[1] != 'null') return unescape(temp[1]);
    }
};

// 需求统计
function requireGtag(param){
    var title = param.title || '提交需求登记';
    var content = param.content || {};
    // console.log(param)
    gtag('event', title , content);
}