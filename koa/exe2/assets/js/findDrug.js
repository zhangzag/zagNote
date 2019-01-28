$(function(){
    $('.drug-w').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        // console.log($(this).attr('productId'))
        var _self = this
        $.ajax({
            url: $.getGlobalVal().webRoot + '/product/getProductByProductId',
            type: 'POST',
            dataType: 'json',
            data: {
                productId: $(_self).attr('productId')
            }
        })
        .done(function(res){
            // console.log(res)
            if(!res.data){
                layui.use('layer',function(){
                    layer.msg('商品不存在，或已下架！',{
                        icon: 2,
                        time: 1000
                    }); 
                })
                return false;
            }
            window.location.href = '/products/'+$(_self).attr('productId')+'.html';
        })
    })
    $('.drug-w').on('mouseover','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        // ./productDetails.html?productId='+productId+'
        var _self = this
        layui.use('layer',function(){
            layer.tips($(_self).html(), _self); //在元素的事件回调体中，follow直接赋予this即可
        })
    })
})