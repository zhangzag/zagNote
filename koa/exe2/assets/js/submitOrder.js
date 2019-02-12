$(function(){
    var domain = window.location.host;
    domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
    
    var order = $.cookie('order') ? JSON.parse($.cookie('order')):null;
    if(!order || order == 'null'){ // 是否有订单
        window.history.go(-1);
    };
    if(!$.getGlobalVal().memberId){ // 是否登录
        window.history.go(-1);
    }
    var productId = order.productId;
    var productDetail = null;
    // console.log('productBuy:',productBuy);
    // console.log('singleBuy:',singleBuy);
    // console.log('mealBuy:',mealBuy);
    // console.log('productId:',productId);

    // console.log(typeof $.getGlobalVal().memberId);


    if(order.orderType == 3){
        // 套餐 商品
        $.ajax({
            // url: $.getGlobalVal().webRoot + "/getComboByProductId",
            url: "/getComboByProductId",
            type: 'POST',
            dataType: 'json',
            data: {
                productID: productId
            },
            async: false,
            success: function(res){
                // console.log('套餐',res);
                productDetail = res.data[order.index];
            },
            error: function(err){
                console.log(err);
            }
        })


        $.ajax({
            // url: $.getGlobalVal().webRoot + '/getComboDetailByPackageId',
            url: '/getComboDetailByPackageId',
            type: 'POST',
            dataType: 'json',
            data: {
                packageID: order.packageID
            },
            async: false,
            success: function(res){
                // console.log('套餐详情',res);
                var mealList = res.data;
                var orderItem = '';
                var proMoneyXiao = 0;
                for (var i = 0; i < mealList.length; i++) {
                    // productIdList.push(mealList[i].productID)
                    var packagePhoto = ''
                    var packagePhoto = mealList[i].photodURL ? mealList[i].photodURL:'/images/ak_200x200.jpg';
                    // 商品小计
                    var productMoney = mealList[i].price * mealList[i].qty;
                    productMoney = productMoney.toFixed(2);
                    
                    orderItem += '<li><div class="p-info"><div class="p-img"><img src="'+packagePhoto+'" ></div><div class="p-text"><p class="p-name"><i class="'+$.imgType(mealList[i].prescriptionType)+'"></i> '+mealList[i].productName+'</p><p class="p-gui">'+mealList[i].spec+'</p></div></div><div  class="p-pri"><p class="new-pri" style="padding-top:20px;">'+mealList[i].price+'</p></div><div class="p-num">'+mealList[i].qty+'</div><div class="p-subtotal">'+productMoney+'</div></li>'
                }

                proMoneyXiao = productDetail.oldCost;
                
                $('.order-list').html(orderItem);
                $('.submit-w .proMoney').html(proMoneyXiao); // 商品总计
            }
        })
    }else if (order.orderType == 2){
        $.ajax({
            // url: $.getGlobalVal().webRoot + "/getSingleComboByProductId",
            url: "/getSingleComboByProductId",
            type: 'POST',
            dataType: 'json',
            data: {
                productID: productId
            },
            async: false,
            success: function(res){
                // console.log('套餐',res);
                productDetail = res.data[0];
            },
            error: function(err){
                console.log(err);
            }
        })

        $.ajax({
            // url: $.getGlobalVal().webRoot + '/getComboDetailByPackageId',
            url: '/getComboDetailByPackageId',
            type: 'POST',
            dataType: 'json',
            data: {
                packageID: order.packageID
            },
            async: false,
            success: function(res){
                // console.log('套餐详情',res);
                var mealList = res.data;
                var orderItem = '';
                var proMoneyXiao = 0;
                singleDetail = mealList[order.index];
                var packagePhoto = singleDetail.photodURL ? singleDetail.photodURL:'/static/images/ak_200x200.jpg';
                var productMoney = singleDetail.ourPrice * order.qty;
                productMoney = productMoney.toFixed(2)
                orderItem += '<li><div class="p-info"><div class="p-img"><img src="'+packagePhoto+'" ></div><div class="p-text"><p class="p-name"><i class="'+$.imgType(singleDetail.prescriptionType)+'"></i> '+singleDetail.productName+'</p><p class="p-gui">'+singleDetail.spec+'</p></div></div><div  class="p-pri"><p class="new-pri" style="padding-top:20px;">'+singleDetail.ourPrice+'</p></div><div class="p-num">'+order.qty+'</div><div class="p-subtotal">'+productMoney+'</div></li>'
                proMoneyXiao = productMoney
                $('.order-list').html(orderItem);
                $('.submit-w .proMoney').html(proMoneyXiao); // 商品总计
            }
        })
    }else{
        // 商品
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/product/getProductByProductId',
            url: '/product/getProductByProductId',
            type: 'POST',
            dataType: 'json',
            data: {
                productId: productId
            },
            async: false,
            success: function(res){
                //console.log('商品',res);
                productDetail = res.data
                var productMoney = res.data.ourPrice * order.qty;
                productMoney = productMoney.toFixed(2)
                $('.order-list').html('');
                var orderItem = '<li><div class="p-info"><div class="p-img"><img src="'+(res.data.photodURL?res.data.photodURL:"/static/images/ak_300x300.jpg")+'" ></div><div class="p-text"><p class="p-name"><i class="'+$.imgType(res.data.prescriptionType)+'"></i> '+res.data.productName+'</p><p class="p-gui">'+res.data.spec+'</p></div></div><div  class="p-pri"><p class="old-pri">'+res.data.price+'</p><p class="new-pri">'+res.data.ourPrice+'</p></div><div class="p-num">'+order.qty+'</div><div class="p-subtotal">'+productMoney+'</div></li>'
                
                $('.order-list').append(orderItem);
                $('.submit-w .proMoney').html(productMoney); // 商品总计
            },
            error: function(err){
                // console.log(err)
            }
        })
    }

    // 获取 地址
    function getAddress(){
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/delivery/getDeliveryAddress?memberId=' + $.getGlobalVal().memberId,
            url: '/delivery/getDeliveryAddress?memberId=' + $.getGlobalVal().memberId,
            type: 'GET',
            dataType: 'json',
            data: {},
            async: false,
            success: function(res){
                // console.log('地址',res);
                $('.address-list').html('');
                for (var i = 0; i < res.length; i++) {
                    var phone = res[i].mobile == '' ? res[i].telephone : res[i].mobile
                    if(res[i].isDefault == 1){
                        var addressItem = '<li addressID="'+res[i].addressID+'"><button class="choice" addressID="'+res[i].addressID+'">'+res[i].address.substring(0,4)+'</button><div class="address-name"><span>('+res[i].contactMan+' 收)</span><span class="addressDetail">'+res[i].address+'</span><span>'+phone+'</span><span class="def-address">默认地址</span></div><div class="operation"><span class="modifyAlert">修改</span><span class="delAddress">删除</span></div></li>'
                    }else{
                        var addressItem = '<li addressID="'+res[i].addressID+'"><button class="choice" addressID="'+res[i].addressID+'">'+res[i].address.substring(0,4)+'</button><div class="address-name"><span>('+res[i].contactMan+' 收)</span><span class="addressDetail">'+res[i].address+'</span><span>'+phone+'</span></div><div class="operation"><span class="set-up-def">设为默认地址</span><span class="modifyAlert">修改</span><span class="delAddress">删除</span></div></li>'
                    }
                    $('.address-list').append(addressItem);
                }
                $('.address-list').find('.choice').eq(0).addClass('choice-active');

                var logisticsId = $('.distribution .type .logisticsActive').attr('logisticsId')
                var index = $('.distribution .type .logisticsActive').attr('logIndex');
                if(logisticsId){
                    getCalculateFreight(res[0].addressID,null,index)
                }
            },
            error: function(err){
                console.log(err)
            }
        })
    }
    getAddress();

    // 地址 收起 展开
    $('.address-foot .take-up').click(function(){
        if($(this).find('span').html() == '显示全部地址'){
            $(this).find('span').html('收起部分地址').next().removeClass('layui-icon-down').addClass('layui-icon-up');
            $('.address-list').removeClass('address-active');
        }else{
            $(this).find('span').html('显示全部地址').next().removeClass('layui-icon-up').addClass('layui-icon-down');
            $('.address-list').addClass('address-active');
        }
    })
    
    // 默认地址
     $('.address-w').on('click','.set-up-def',function(){
        var _self = this;
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/delivery/isDefualt',
            url: '/delivery/isDefualt',
            type: 'POST',
            dataType: 'json',
            data: {
                memberID: $.getGlobalVal().memberId,//会员ID
                addressID: $(_self).parent().parent().attr('addressID'),//地址ID
                isDefault: 1,//是否为默认地址
            },
            success: function(res){
                //console.log(res);
                if(!res.success){
                    return false;
                }
                $('.address-w .def-address').remove();
                $(_self).parent().prev().append('<span class="def-address">默认地址</span>');
                $(_self).parent().parent().siblings().find('.set-up-def').remove()
                $(_self).parent().parent().siblings().find('.operation').prepend('<span class="set-up-def">设为默认地址</span>');
                $(_self).remove()
            },
            error: function(err){
                // console.log(err)
            }
        })
     })

     // 新增地址
     var addressIndex = null;
     $('.new-add').click(function(){
        $('#addressAlert').attr({'alertType': '0'});
        $('#province').val('请选择');
        $('#city').val('请选择');
        $('#county').val('请选择');
        $('#addressAlert .address-detail').val('');
        $('#addressAlert .phone').val('');
        $('#addressAlert .tel-area').val('');
        $('#addressAlert .tel').val('');
        $('#addressAlert .address-name').val('');
        layui.use('layer',function(){
            addressIndex = layer.open({
                type: 1,
                area: '590px',
                title: ['新增收货地址','background-color: #E8E8E8;'],
                content: $('#addressAlert'),
                cancel: function(){
                    //$('#addressAlert').css({'display': 'none'})
                }
            })
        })
        getProv(null,'省');
    })
    //  编辑地址
    $('.address-list').on('click','.modifyAlert',function(){
        // $('#addressAlert').attr({'alertType': '1','addressID': $(this).parent().parent().attr('addressID')})
        $.ajax({
            // url:  $.getGlobalVal().webRoot + '/delivery/getDeliveryAddressByMemberID?memberID='+$.getGlobalVal().memberId+'&addressID='+$(this).parent().parent().attr('addressID'),
            url:  '/delivery/getDeliveryAddressByMemberID?memberID='+$.getGlobalVal().memberId+'&addressID='+$(this).parent().parent().attr('addressID'),
            // type: 'POST',
            type: 'GET',
            data: 'json',
            data: {},
            success: function(res){
                //console.log(res);
                $('#addressAlert').attr({'alertType': '1','addressID':  res.data.addressID,'isDefault': res.data.isDefault});

                getProv(null,'省');
                getProv(res.data.districtID,'市');
                getProv(res.data.city,'区');
                $('#province').val(res.data.districtID);
                $('#city').val(res.data.city);
                $('#county').val(res.data.county);
                $('#addressAlert .address-detail').val(res.data.address);
                $('#addressAlert .phone').val(res.data.mobile);
                if(res.data.telephone != '' && res.data.telephone != null){
                    $('#addressAlert .tel-area').val(res.data.telephone.split('-')[0]);
                    $('#addressAlert .tel').val(res.data.telephone.split('-')[1]);
                }
                $('#addressAlert .address-name').val(res.data.contactMan);
                
                layui.use('layer',function(){
                    addressIndex = layer.open({
                        type: 1,
                        area: '590px',
                        title: ['修改收货地址','background-color: #E8E8E8;'],
                        content: $('#addressAlert'),
                        cancel: function(){
                            //$('#addressAlert').css({'display': 'none'})
                        }
                    })
                })
            },
            error: function(err){
                // console.log(err)
            }
        })
    })


     // 获取省
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
            if(area == '省'){ // 省
                 $('#province').html('<option value="请选择">请选择</option>');
                for (var i = 0; i < res.length; i++) {
                    $('#province').append('<option value="'+res[i].id+'">'+res[i].name+'</option>')
                }  
            }else if(area == '市'){ // 市
                 $('#city').html('<option value="请选择">请选择</option>');
                for (var i = 0; i < res.length; i++) {
                    $('#city').append('<option value="'+res[i].id+'">'+res[i].name+'</option>')
                }
            }else if (area == '区') {
                 $('#county').html('<option value="请选择">请选择</option>');
                for (var i = 0; i < res.length; i++) {
                    $('#county').append('<option value="'+res[i].id+'">'+res[i].name+'</option>')
                }
            }
            //$('#province').val(58)
        })
    }
    // 获取市
    $('#province').change(function(){
        //console.log($(this).val());
        if ($(this).val() == '请选择') {
            $('#city').html('<option value="请选择">请选择</option>');
            $('#county').html('<option value="请选择">请选择</option>');
            return false;
        }
        $('#city').html('<option value="请选择">请选择</option>');
        $('#county').html('<option value="请选择">请选择</option>');
        getProv(Number($(this).val()),'市')
    })
    // 获取 区
    $('#city').change(function(){
        //console.log($(this).val());
        if($(this).val() == '请选择'){
            $('#county').html('<option value="请选择">请选择</option>');
            return false;
        }
        $('#county').html('<option value="请选择">请选择</option>');
        getProv(Number($(this).val()),'区')
    })

    // 增加 编辑 地址
    function modifyChange(addressID){
        // console.log(addressID,222)
        var memberID = $.getGlobalVal().memberId,
            districtID = $('#province').val(),
            city = $('#city').val(),
            county = $('#county').val(),
            address = $.trim($('#addressAlert .address-detail').val()),
            mobile = $.trim($('#addressAlert .phone').val()),
            tel = $.trim($('#addressAlert .tel-area').val()) + '-' + $.trim($('#addressAlert .tel').val());
            contactMan = $.trim($('#addressAlert .address-name').val()),
            addressID = addressID ? addressID:null;
            //console.log(mobile)
        var isDefault = $('#addressAlert').attr('isDefault') ? $('#addressAlert').attr('isDefault'):0;
        var phoneTest = /^1[3|4|5|6|7|8|9][0-9]{9}$/,
            telTest = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
        if(districtID == '请选择' || city == '请选择' || county == '请选择'){
            tipsMsg('请选择省市区',2);
            return false;
        }
        if(address == ''){
            tipsMsg('请填写详细地址',2);
            return false;
        }
        if(contactMan == ''){
            tipsMsg('请填写收货人',2);
            return false;
        }
        if(mobile == '' && tel == '-'){
            tipsMsg('请填写联系电话',2);
            return false;
        }
        if(!phoneTest.test(mobile) && !telTest.test(tel)){
            tipsMsg('电话号码格式不正确！',2);
            return false;
        }

        tel = tel == '-' ? null:tel
        mobile = mobile == '' ? null: mobile;
        var phone = mobile == null ? tel:mobile;
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/delivery/addDeliveryAddress',
            url: '/delivery/addDeliveryAddress',
            type: 'POST',
            dataType: 'json',
            data:{
                 memberID: memberID,//会员id
                isDefault: isDefault, //是否默认地址
                countryID: 1, //国家编码, 默认中国
                districtID: districtID, //省、直辖市
                city: city, //市县
                county: county, //区、县
                address: address,//街道地址
                mobile: mobile,//移动电话
                telephone: tel, //固定电话
                phone: phone,
                contactMan: contactMan,//联系人
                addressID: addressID,//编辑地址ID 不是编辑时不传
            },
            success: function(res){
                // console.log(res);
                if(res.success){
                    layer.close(addressIndex);
                    if(addressID){
                        tipsMsg('修改地址成功',1)
                    }else{
                        tipsMsg('添加地址成功',1)
                    }
                }

                getAddress();
            },
            error: function(err){
                console.log(err)
            }
        })
    }
    // 地址 确认
    $('.modify-btn').click(function(){
        if($('#addressAlert').attr('alertType') == '0'){  // 0 增加，1 编辑
            modifyChange();
        }else if($('#addressAlert').attr('alertType') == '1'){ 
            //console.log($('#addressAlert').attr('addressID'))
            modifyChange($('#addressAlert').attr('addressID'));
        }
    })

    // 删除
    $('.address-list').on('click','.delAddress',function(){
        //console.log($(this).parent().parent().attr('addressID'));
        var _self = this
        layui.use('layer',function(){
            layer.confirm('您确定删除该地址吗?', {icon: 3, title:'删除提示'}, function(index){ // 确定
                //console.log($(_self).parent().parent().attr('addressID'));
                layer.close(index);
                $.ajax({
                    // url: $.getGlobalVal().webRoot + '/delivery/delDeliveryAddress',
                    url: '/delivery/delDeliveryAddress',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        memberID: $.getGlobalVal().memberId,//会员id
                        addressID: $(_self).parent().parent().attr('addressID'),//地址id
                    },
                    success: function(res){
                        //console.log(res);
                        if(res.success){
                            tipsMsg('删除地址成功',1)
                        }
                        getAddress();
                    },
                    err: function(err){
                        console.log(err)
                    }
                })
            },function(index){ // 取消
               // console.log($(_self).parent().parent().attr('addressID'));
               layer.close(index);
            });
        })
    })

    // 支付方式
    $('.pay .type a').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
    
    // console.log($('.submit-w .proMoney').html());
    var orderAMT = $('.submit-w .proMoney').html();
    var addressId = $('.address-list .choice-active').attr('addressId')
    // 获取 运费模板
    $.ajax({
        // url: $.getGlobalVal().webRoot + '/order/getLogisticsCharge',
        url: '/order/getLogisticsCharge',
        type: 'POST',
        dataType: 'json',
        data: {
            addressId: addressId,
            orderAMT: orderAMT,
            timestamp: $.getGlobalVal().curDate,
            sysNo: 'pc'
        },
        async: false,
        success:function(res){
            // console.log('运费模板',res);
            for (var i = 0; i < res.length; i++) {
                var distributionItem = '<a charge="'+res[i].byWeight.charge+'" logisticsId="'+res[i].logisticsID+'" logIndex="'+i+'" href="javascript:void(0)">'+res[i].logisticsName+'</a>'
                $('.distribution .type').append(distributionItem);
            }
            $('.distribution .type a').eq(0).addClass('logisticsActive')
        },
        error: function(err){
            console.log(err);
        }
    })

    // 获取 运费
    function getCalculateFreight(addressId,logisticsId,choiceLogisticsIndex){
        var addressId = addressId;
        var orderAMT = $('.submit-w .proMoney').html();
        if(!addressId){return false;}
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/order/getLogisticsCharge',
            url: '/order/getLogisticsCharge',
            // url: 'http://192.168.2.67:8082/AKGW-api/v1/order/getLogisticsCharge',
            type: 'POST',
            dataType: 'json',
            data: {
                addressId: addressId,
                orderAMT: orderAMT,
                timestamp: $.getGlobalVal().curDate,
                sysNo: 'pc'
            },
            async: false,
            success:function(res){
                // console.log('运费',res);
                var choiceLogistics = res[choiceLogisticsIndex];
                // console.log(choiceLogistics)
                var freightValue = choiceLogistics.expressfeeName ? choiceLogistics.expressfeeName:('￥ ' + choiceLogistics.byWeight.charge);
                $('.distribution .freight span').html(freightValue).attr({'freight':choiceLogistics.byWeight.charge});
                $('.submit-w .logisticsMoney').html(choiceLogistics.byWeight.charge)
            },
            error: function(err){
                console.log(err);
            }
        })
    }
    var addressId = $('.choice-active').attr('addressID');
    var logisticsId = $('.distribution .type .logisticsActive').attr('logisticsId');
    getCalculateFreight(addressId,logisticsId,0)

    // 选择 运费
    $('.distribution .type').on('click','a',function(){
        $(this).addClass('logisticsActive').siblings().removeClass('logisticsActive');
        var addressId = $('.choice-active').attr('addressID'),
            logisticsId = $(this).attr('logisticsId');
        //console.log(addressId,logisticsId)
        getCalculateFreight(addressId,logisticsId,$(this).index());
        getOrderMoney();
    })

    // 选择 地址
    $('.address-w').on('click','.choice',function(){
        $('.address-w .choice').removeClass('choice-active');
        $(this).addClass('choice-active');
        var addressId = $(this).attr('addressID');
        var logisticsId = $('.distribution .type .logisticsActive').attr('logisticsId')
        //console.log(addressId,logisticsId)
        var index = $('.distribution .type .logisticsActive').attr('logIndex');
        getCalculateFreight(addressId,logisticsId,index);
        getOrderMoney();
    })

    // console.log(order)
    // // 获取优惠
    function getDiscountsPrice(){
        var pro = $('.submit-w .proMoney').html(); // 商品总计
        var dis = order.orderType == 2 ? order.discountMoney:0;
        var totalPrice = pro-dis;
        var data = {
            productId: productId,
            totalPrice: totalPrice,
            qty: order.qty,
            sysNo: 'pc',
        }
        if (order.orderType == 2) {
            data.packageID = order.packageID
        }
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/order/getDiscountsPrice',
            url: '/order/getDiscountsPrice',
            type: 'POST',
            dataType: 'json',
            data: data,
            async: false,
            success: function(res){
                // console.log(res);
                if (order.orderType == 2) {
                    $('.submit-w .discountMoney').html((res.discountsPrice+dis).toFixed(2));
                }else{
                    $('.submit-w .discountMoney').html(res.discountsPrice.toFixed(2));
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    getDiscountsPrice();

    // 金额计算
    function getOrderMoney(){
        var pro = $('.submit-w .proMoney').html(); // 商品总计
        var log = $('.submit-w .logisticsMoney').html(); // 运费
        var dis = $('.submit-w .discountMoney').html(); // 优惠
            // console.log(pro,log,dis);
        if(order.orderType == 3){
            // 套餐优惠 金额
            dis = productDetail.oldCost - productDetail.afterBenefitCost;
            $('.submit-w .discountMoney').html(dis.toFixed(2));
        }else if(order.orderType == 2){
            // dis = order.discountMoney; // 优惠
            // getDiscountsPrice(pro - dis);
        }else{
            // getDiscountsPrice(pro);
        }

        var orderMoney = Number(pro) + Number(log) - Number(dis);
        orderMoney = orderMoney.toFixed(2);
        //console.log(pro,log,dis)
        $('.submit-w .orderMoney').html(orderMoney); // 订单金额
    }
    getOrderMoney();

    // 提交订单
    var canBuy = true;
    $('.subOrder').click(function(){
        // console.log($('.choice-active').attr('addressID'))
        if(!$('.choice-active').attr('addressID')){
            $.tips('请选择收货地址！',2);
            return false;
        }
        if(order.orderType == 1){
            // 单个商品
            var data = {
                productId: productId,//订单ID
                memberId: $.getGlobalVal().memberId,//会员ID
                detailCodeId: productDetail.detailCodeID,//多规格id
                qty: Number(order.qty),//商品数量
                addressID: $('.choice-active').attr('addressID'),//地址编号
                deliveryAddress: $('.choice-active').next().find('.addressDetail').html(),//配送详细地址
                logisticsID: $('.logisticsActive').attr('logisticsId'),//物流公司
                payType: 4,//支付方式 目前固定为 4 - 货到付款
                orderRemark: $.trim($('.remark textarea').val()),//客户留言
                sysNo:  'pc'
            } 
            if(canBuy){
                canBuy = false;
                $.ajax({
                    // url: $.getGlobalVal().webRoot + '/order/addorder',
                    url: '/order/addorder',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    async: false,
                    success: function(res){
                        // console.log(res)
                        if(res.success === true){
                            gtag('event', '提交订单', {
                              'event_category' : '购买的订单id：' + productDetail.productID,
                              'event_label' : '成功'
                            });
                            window.location.href = '/submitSuccess.html';
                            
                        }else{
                            $.tips('提交订单失败！',2);
                        }
                        canBuy = true;
                    },
                    error: function(err){
                        // console.log(err)
                        gtag('event', '提交订单', {
                          'event_category' : '购买的订单id：' + productDetail.productID,
                          'event_label' : '失败'
                        });
                        canBuy = true;
                    }
                })

                setTimeout(function(){canBuy = true;},1000)
            }
        }else if(order.orderType == 3){
            // 套餐 商品
            // console.log(packageID,productId)
            var data = {
                packageID: order.packageID,//订单ID
                memberId: $.getGlobalVal().memberId,//会员ID
                qty: order.qty,
                addressID: $('.choice-active').attr('addressID'),//地址编号
                deliveryAddress: $('.choice-active').next().find('.addressDetail').html(),//配送详细地址
                logisticsID: $('.logisticsActive').attr('logisticsId'),//物流公司
                payType: 4,//支付方式 目前固定为 4 - 货到付款
                orderRemark: $.trim($('.remark textarea').val()),//客户留言
                sysNo:  'pc'
            }
            if(canBuy){
                canBuy = false;
                $.ajax({
                    // url: $.getGlobalVal().webRoot + '/order/addComboOrder',
                    url: '/order/addComboOrder',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    async: false,
                    success: function(res){
                        // console.log(res);
                        if(res.success === true){
                            window.location.href = '/submitSuccess.html';
                            gtag('event', '提交套餐订单', {
                              'event_category' : '购买的订单套餐id：' + order.packageID,
                              'event_label' : '成功'
                            });
                        }else{
                            $.tips('提交订单失败！',2);
                        }
                        canBuy = true;
                    },
                    error: function(err){
                        console.log(err);
                        canBuy = true;
                        gtag('event', '提交套餐订单', {
                          'event_category' : '购买的订单套餐id：' + order.packageID,
                          'event_label' : '失败'
                        });
                    }
                })
                setTimeout(function(){canBuy = true;},1000)
            }
        }else if(order.orderType == 2){
            // 疗程装
            var data = {
                packageID: order.packageID,//疗程ID
                productId: productId,//订单ID
                memberId: $.getGlobalVal().memberId,//会员ID
                qty: order.qty,
                addressID: $('.choice-active').attr('addressID'),//地址编号
                deliveryAddress: $('.choice-active').next().find('.addressDetail').html(),//配送详细地址
                logisticsID: $('.logisticsActive').attr('logisticsId'),//物流公司
                payType: 4,//支付方式 目前固定为 4 - 货到付款
                orderRemark: $.trim($('.remark textarea').val()),//客户留言
                sysNo:  'pc'
            }
            if(canBuy){
                canBuy = false;
                $.ajax({
                    // url: $.getGlobalVal().webRoot + '/order/addorder',
                    url: '/order/addorder',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    async: false,
                    success: function(res){
                        // console.log(res);
                        if(res.success === true){
                            $.tips('提交订单成功！',1);
                            window.location.href = '/submitSuccess.html';
                            gtag('event', '提交疗程装订单', {
                              'event_category' : '购买的订单疗程装id：' + order.packageID,
                              'event_label' : '成功'
                            });
                        }else{
                            $.tips('提交订单失败！',2)
                        }
                        canBuy = true
                    },
                    error: function(err){
                        // console.log(err);
                        canBuy = true;
                        gtag('event', '提交疗程装订单', {
                          'event_category' : '购买的订单疗程装id：' + order.packageID,
                          'event_label' : '失败'
                        });
                    }
                })
                setTimeout(function(){canBuy = true;},1000)
            }
        }
    })

    // 提示
    var tipsMsg = function(tips,icon){
        layui.use('layer',function(){
            layer.msg(tips,{
                icon: icon,
                time: 1000
            })
        })
    }
    

})


//获取url参数 -- 中文
function getQueryString(name) { 
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
      var r = window.location.search.substr(1).match(reg); 
      if (r != null) return decodeURI(r[2]); return null; 
}

// 图片格式化
function imgSrcInit(imgSrc){
    // if(imgSrc.indexOf('http://192.168.2.250:8081') == -1){
    //     return 'http://192.168.2.250:8081' + imgSrc
    // }
    return imgSrc;
}