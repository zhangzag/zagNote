$(function(){
    var imgHead = 'http://113.108.163.210:9999'

    var demandData = null;
    function getDemand(page){
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/require/getRequire',
            url: '/require/getRequire',
            // url: 'http://192.168.2.65:8083/AKGW-api/v1' + '/require/getRequire',
            type: 'POST',
            dataType: 'json',
            data: {
                memberId: $.getGlobalVal().memberId,
                page: page,
                limit: 10
            },
            success: function(res){
                // console.log(res);
                demandData = res.data;
                $('#demandCount').html(res.count);
                if(!res.success || res.count <= 0){
                    $('.nothing').css({'display': 'block'});
                    $('.list-body').css({'display': 'none'});
                    $('#page').css({'display': 'none'});
                    $('#demandCount').html(res.count);
                    return false;
                }
                $('.nothing').css({'display': 'none'});
                $('.demand-main .list-body').html('').css({'display': 'block'});
                
                var listElement = ''; // 需求登记列表模板
                for (var i = 0; i < demandData.length; i++) {
                    var num = i+1; // 序号
                    var productElement = ''; // 商品信息模板
                    var optionElement = ''; // 操作模板
                    if(demandData[i].product == null){ // 返回商品为空
                        productElement = '<div class="p-img"><a style="" href="javascript:void(0)"><img src="'+demandData[i].photodURL+'"></a></div><div class="p-text"><p class="p1">'+demandData[i].productName+'</p><p class="p3" style="color: #e00000">该商品不存在，或已下架！</p></div>';

                        optionElement = '<p class="op2">删除</p>';
                    }else{
                        productElement = '<div class="p-img"><a href="/products/'+demandData[i].product.productID+'.html"><img src="'+ imgSrcInit(demandData[i].product.photodURL)+'"></a></div><div class="p-text"><p class="p1">'+demandData[i].productName+'</p><p class="p2">'+demandData[i].product.spec+'</p><p class="p3">￥'+demandData[i].product.ourPrice+' <span>x '+demandData[i].qty+'</span></p></div>';

                        optionElement = '<p class="op1" demandIndex="'+i+'">重新提交需求</p><p class="op2">删除</p>';
                    }

                    // 需求登记 信息模板
                    var cdmInfoElement = '<p><span>登记人：</span>'+demandData[i].realName+'</p><p><span>手机号：</span>'+demandData[i].phone+'</p><p><span>性别：</span>'+(demandData[i].sex == 1?'男':'女')+'</p><p><span>年龄：</span>'+(demandData[i].age == null?'':demandData[i].age)+'</p><p><span>身份证号：</span>'+(demandData[i].carId==null?'':demandData[i].carId)+'</p><p><span>送货地址：</span>'+(demandData[i].deliveryAddress==null?'':demandData[i].deliveryAddress)+'</p><p><span>留言：</span>'+(demandData[i].remark==null? '':demandData[i].remark)+'</p><p><span>门店配送：</span>'+(demandData[i].isStore == 1?'是':'否')+'</p><p><span>处方图：</span><img width="160" src="'+(demandData[i].pictureURL==null?'':demandData[i].pictureURL)+'"></p>';
                    
                    // 需求登记列表模板
                    listElement += '<div class="item" requireID="'+demandData[i].requireID+'"><div class="number">'+num+'</div><div class="info">'+productElement+'</div><div class="dem-info">'+cdmInfoElement+'</div><div class="dem-time">'+demandData[i].operationDate+'</div><div class="options">'+optionElement+'</div></div>';
      
                }
                $('.demand-main .list-body').html(listElement);
                
                // 分页
                if(page <= 1){ 
                    layui.use('laypage', function(){
                        var laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                            count: res.count, //数据总数，从服务端得到
                            limit: 10, //每页显示的条数
                            layout: ['page', 'prev', 'next'], //自定义排版
                            theme: '#a7a7a7', // 主题
                            jump: function(obj,first){ //切换分页的回调
                                //console.log(obj);
                                //console.log(first);
                                if(!first){
                                    getDemand(obj.curr);
                                }
                            }
                        });
                    });
                }
            },
            error: function(err){
                console.log(err)
            }
        })
    }
    getDemand(1)

    // 修改需求
    $('.demand-main .list-body').on('click','.op1',function(){
        var index = Number($(this).attr('demandIndex'));
        var productInfor = demandData[index];
        var qty = productInfor.qty;
        // console.log(productInfor)
        $.require({path: 4,product:productInfor,qty: qty,requireGtag:requireGtag,listReload:getDemand})
        
    })


    // 删除
    $('.demand-main .list-body').on('click','.op2',function(){
        //console.log($.getGlobalVal().memberId);
        //console.log($(this).parent().parent().attr('requireID'));

        var _self = this
        layui.use('layer',function(){
            layer.confirm('您确定删除该条需求吗?', {icon: 3, title:'删除提示'}, function(index){ // 确定
                //console.log($(_self).parent().parent().attr('requireID'));
                layer.close(index);
                $.ajax({
                    //url: $.getGlobalVal().webRoot + '/require/delRequire',
                    url: '/require/delRequire',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        memberId: $.getGlobalVal().memberId,//会员id
                        requireId: $(_self).parent().parent().attr('requireID'),//地址id
                    },
                    success: function(res){
                        //console.log(res);
                        if(res.success){
                             layui.use('layer',function(){
                                 layer.msg(res.msg,{
                                     time: 1000
                                 })
                            })
                            
                            getDemand(1);
                        }
                    },
                    err: function(err){
                        console.log(err)
                    }
                })
            },function(index){ // 取消
               //console.log($(_self).parent().parent().attr('requireID'));
               layer.close(index);
            });
        })
    })
})

function tips(msg,icon){
    layui.use('layer',function(){
        layer.msg(msg,{
            icon: icon,
            time: 1000
        })
    })
}

function imgSrcInit(imgSrc){
    // if(imgSrc.indexOf('http://www.ak1ak1.com') != -1){
    //     return imgSrc
    // }
    // if(imgSrc.indexOf('http://192.168.2.250:8081') != -1){
    //     return imgSrc
    // }
    // if(imgSrc.indexOf('http://113.108.163.210:9999') != -1){
    //     return imgSrc.replace('http://113.108.163.210:9999','http://192.168.2.250:8081')
    // }
    // if(imgSrc.indexOf('http://113.108.163.210:9999') == -1){
    //     return 'http://113.108.163.210:9999' + imgSrc
    // }
    return imgSrc;
}

// 需求统计
function requireGtag(param){
    var title = param.title || '提交需求登记';
    var content = param.content || {};
    // console.log(param)
    gtag('event', title , content);
}