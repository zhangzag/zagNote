$(function(){
    // 新增编辑地址
     var addressIndex = null;
     $('.address-table h3 span').click(function(){
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
    
    // 获取 地址
    function getAddress(){
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/delivery/getDeliveryAddress?memberId=' + $.getGlobalVal().memberId,
            url: '/delivery/getDeliveryAddress?memberId=' + $.getGlobalVal().memberId,
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(res){
                //console.log(res);
                if(res.length <= 0){
                    $('.nothing').css({'display': 'block'});
                    $('.list-body').css({'display': 'none'});
                    return false;
                }
                $('.nothing').css({'display': 'none'});
                $('.list-body').html('').css({'display': 'block'});
                for (var i = 0; i < res.length; i++) {
                    var addressPhone = res[i].mobile == '' ? res[i].telephone : res[i].mobile;
                    var addressItem = '<div class="item" addressID="'+res[i].addressID+'"><div class="consignee">'+res[i].contactMan+'</div><div class="address-name">'+res[i].address+'</div><div class="phone">'+addressPhone+'</div><div class="options"><span class="modifyAddress">修改</span><span class="delAddress">删除</span></div></div>';
                    $('.list-body').append(addressItem);

                    if(res[i].isDefault == 1){
                        $('.list-body').find('.address-name').eq(i).prepend('<span class="isDefault" isDefault="'+res[i].isDefault+'">默认地址</span>')
                    }else{
                        $('.list-body').find('.options').eq(i).prepend('<span class="defaAds">设为默认地址</span>')
                    }
                }
            },
            error: function(err){
                console.log(err)
            }
        })
    }
    getAddress();

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

    // 增加 编辑 
    function modifyChange(addressID){
        //console.log(addressID,222)
        var memberID = $.getGlobalVal().memberId,
            districtID = $('#province').val(),
            city = $('#city').val(),
            county = $('#county').val(),
            address = $.trim($('#addressAlert .address-detail').val()),
            mobile = $.trim($('#addressAlert .phone').val()),
            tel = $.trim($('#addressAlert .tel-area').val()) + '-' + $.trim($('#addressAlert .tel').val())
            contactMan = $.trim($('#addressAlert .address-name').val()),
            addressID = addressID ? addressID:null;
        var isDefault = $('#addressAlert').attr('isDefault') ? $('#addressAlert').attr('isDefault'):0;
            //console.log(mobile)
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
                isDefault:isDefault, //是否默认地址
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
                //console.log(res);
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

    $('.modify-btn').click(function(){
        //$('#addressAlert').css({'display': 'none'})
        //layer.close(addressIndex);
        //console.log($('#addressAlert').attr('alertType'))
        if($('#addressAlert').attr('alertType') == '0'){  // 0 增加，1 编辑
            modifyChange();
        }else if($('#addressAlert').attr('alertType') == '1'){ 
            //console.log($('#addressAlert').attr('addressID'))
            modifyChange($('#addressAlert').attr('addressID'));
        }
    })

    // 编辑弹窗
    $('.list-body').on('click','.modifyAddress',function(){
        //console.log($(this).parent().parent().attr('addressID'));
        
        $.ajax({
            // url:  $.getGlobalVal().webRoot + '/delivery/getDeliveryAddressByMemberID?memberID='+$.getGlobalVal().memberId+'&addressID='+$(this).parent().parent().attr('addressID'),
            url: '/delivery/getDeliveryAddressByMemberID?memberID='+$.getGlobalVal().memberId+'&addressID='+$(this).parent().parent().attr('addressID'),
            type: 'GET',
            data: 'json',
            data: {},
            success: function(res){
                // console.log(res);
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
                console.log(err)
            }
        })
    })

    // 删除
    $('.list-body').on('click','.delAddress',function(){
        var _self = this
        layui.use('layer',function(){
            layer.confirm('您确定删除该地址吗?', {icon: 3, title:'删除提示',area:'300px'}, function(index){ // 确定
                // console.log($(_self).parent().parent().attr('addressID'));
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
                        console.log(res);
                        if(res.success){
                            tipsMsg('删除地址成功',1)
                        }else{
                            tipsMsg(res.msg||'除地址成功',2)
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


    // 设为默认地址
    $('.list-body').on('click','.defaAds',function(){
        var addressID = $(this).parent().parent().attr('addressID');
        // console.log(addressID);
        var _self = this
        layui.use('layer',function(){
            layer.confirm('您确定把该地址设为默认地址吗?', {icon: 3, title:'默认地址提示',area:'300px'}, function(index){ // 确定
                layer.close(index);
                $.ajax({
                    // url: $.getGlobalVal().webRoot + '/delivery/isDefualt',
                    url: '/delivery/isDefualt',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        memberID: $.getGlobalVal().memberId,//会员id
                        addressID: addressID,//地址id
                        isDefault: 1 // 默认地址 1，非默认地址 0
                    },
                    success: function(res){
                        // console.log(res);
                        if(res.success){
                            tipsMsg('默认地址设置成功',1)
                        }
                        getAddress();
                    },
                    err: function(err){
                        console.log(err)
                    }
                })
            },function(index){ // 取消
               //console.log($(_self).parent().parent().attr('addressID'));
               layer.close(index);
            });
        })
    })

    // 信息提示
    var tipsMsg = function(tips,icon){
        layui.use('layer',function(){
            layer.msg(tips,{
                icon: icon,
                time: 1000
            })
        })
    }
})