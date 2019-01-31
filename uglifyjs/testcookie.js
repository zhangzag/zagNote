var coo = document.cookie;
console.log(document.cookie)

$('.list-shou').click(function(){
    if($(this).children('span').html() == '收起'){
        console.log(document.cookie)
        $(this).children('span').html('展开').next().addClass('layui-icon-down').removeClass('layui-icon-up');
        $(this).parent().css({'height': '42px','overflow': 'hidden'})
    }else{
        $(this).children('span').html('收起').next().addClass('layui-icon-up').removeClass('layui-icon-down');
        $(this).parent().css({'height': '200px','overflow': 'hidden'})
        $(this).prev().css({'height': '200px','overflow': 'auto'})
        //console.log($(this).parent().css('overflow'))
    }
})