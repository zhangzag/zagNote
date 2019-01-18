$(function(){
    // 轮播
    $.ajax({
        url: $.getGlobalVal().webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data:{
             endDate: $.getGlobalVal().curDate, //结束时间，当前时间
              pageNo: 'pcManBanner', //广告位置
              isValid: 1,//是否有效
        },
        success: function(res){
            //console.log('轮播图：',res);
            $('#roteAdv').html('');
            for (var i = 0; i < res.data.length; i++) {
                var bannerId = i+1
                var bannerItem = '<li id="'+bannerId+'">'
                    bannerItem +=   '<a target="_blank" href="'+res.data[i].advertisementUrl+'">'
                    bannerItem +=    '<img src="'+imgUrl(res.data[i].advertisementPhoto)+'" alt="">'
                    bannerItem +=   '</a>'
                    bannerItem +='</li>'
                $('#roteAdv').append(bannerItem)
            }

             //轮换广告 start
            $('#roteAdv').after("<div class='slider' id='roteAdv_nav' style=''>").cycle({
                prev: '#turnL',
                next: '#turnR',
                fx:     'slideX',
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
    })

    // 获取楼层
    $.ajax({
        url: $.getGlobalVal().webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data:{
             endDate: $.getGlobalVal().curDate, //结束时间，当前时间
              pageNo: 'pcManFloorName', //广告位置
              isValid: 1,//是否有效
        },
        async: false,
        success: function(res){
            //console.log('楼层名称',res);
            if( !res.success || res.data.length===0 ){
                return false;
            }
            var flist = res.data
            for (var i = 0; i < flist.length; i++) {
                var floor = '<div class="floor"><h3><a target="_blank" href="'+flist[i].advertisementUrl+'"><img src="'+flist[i].advertisementPhoto+'" width="282" height="28"></a></h3><div class="flContent"><div class="left"></div><div class="right"><div class="right-top"></div><div class="right-bottom"></div></div></div></div>';
                $('.man-main').append(floor);
            }
        }
    })

    // 获取 楼层广告
    $.ajax({
        url: $.getGlobalVal().webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data:{
             endDate: $.getGlobalVal().curDate, //结束时间，当前时间
              pageNo: 'pcManFloorBanner', //广告位置
              isValid: 1,//是否有效
        },
        async: false,
        success: function(res){
            //console.log('楼层广告',res);
            if( !res.success || res.data.length===0 ){
                return false;
            }
            var fBList = res.data
            for (var i = 0; i < fBList.length; i++) {
               $('.man-main').find('.floor .left').eq(i).html('<a target="_blank" href="'+fBList[i].advertisementUrl+'"><img src="'+imgUrl(fBList[i].advertisementPhoto)+'" ></a>')
            }
        }
    })


    // 楼层商品
    $.ajax({
        url: $.getGlobalVal().webRoot + '/seachSt',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: $.getGlobalVal().curDate, //结束时间，当前时间
            pageNo: 'pcManProduct', //商品推荐位置
            isValid: 1,//是否有效
        },
        // async: false
    }).done(function(res){
        // console.log('男性楼层名称：',res);
        if( !res.success || res.data.length===0 ){
            return false;
        }
        var floorList = res.data;
        for (var i = 0; i < floorList.length; i++) { // 楼层
            // console.log(floorList.length)
            // 获取 推荐商品ID
            $.ajax({
                url: $.getGlobalVal().webRoot + '/seachStDetail',
                type: 'POST',
                dataType: 'json',
                data:{
                    endDate:  $.getGlobalVal().curDate,//结束时间，当前时间
                    showID: floorList[i].showID,///商品推荐位置id
                    isValid: 1,//是否有效
                },
                async: false
            }).done(function(resTwo){
                // console.log('男性商品id 楼层 '+i,resTwo);
                if( !resTwo.success || resTwo.data.length===0 ){
                    return false;
                }
                var resData = resTwo.data;
                var proIdList = [];
                for( var x=0; x<resData.length; x++ ){
                    proIdList.push(resData[x].productID);
                }

                // 获取 商品详情
                $.ajax({
                    url: $.getGlobalVal().webRoot + '/product/getProductByProductNumber',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                      memberId: $.getGlobalVal().memberId,
                      productNumbers: proIdList,
                    }),
                    headers: {'Content-Type' : 'application/json;charset=utf-8'},
                    async: false
                }).done(function(resPro){
                    // console.log('男性商品详情 楼层 '+i,resPro)
                    var productList = resPro.data;

                    // 上边产品
                    var topItem = '';
                    for (var y = 0; y < 2; y++) {
                        if(!resPro.data[y]){break}
                        //console.log(i)
                        topItem += '<div class="product"><div class="pro-l"><h6>'+productList[y].productName+'</h6><p>'+productList[y].isHelpFor+'</p><div class="btn-wrap"><span class="pri">￥'+productList[y].ourPrice+'</span><a target="_blank" class="det" href="/products/'+productList[y].productNumber+'.html">查看详情</a></div></div><div class="pro-img"><a target="_blank" href="/products/'+productList[y].productNumber+'.html"><img class="lazy" data-original="'+ (productList[y].productPhotos[0]?productList[y].productPhotos[0].photoURL:'') +'" alt="'+ productList[y].productName +'" title="'+ productList[y].productName +'"></a></div></div>';
                    }
                    $('.floor').eq(i).find('.right-top').append(topItem);

                    // 下边产品
                    var bottomItem = '';
                    for (var k = 2; k < 6; k++) {
                        if(!resPro.data[k]){break}
                        bottomItem += '<div class="pro-list"><a target="_blank" href="/products/'+productList[k].productNumber+'.html"><img class="lazy" data-original="'+ (productList[k].productPhotos[0]?productList[k].productPhotos[0].photoURL:'') +'" alt="'+ productList[k].productName +'" title="'+ productList[k].productName +'"></a><h6><a target="_blank" href="/products/'+productList[k].productNumber+'.html">'+productList[k].productName+'</a></h6><p>'+productList[k].isHelpFor+'</p><span>￥'+productList[k].ourPrice+'</span></div>';
                    }
                    $('.floor').eq(i).find('.right-bottom').append(bottomItem)
                    
                    //图片懒加载
                    lazyLoad({
                        imgSrc: '/static/images/ak_300x300.jpg',
                    });
                })
            })

        }
    })
})

function floorNameInit(floorName){
    // if(floorName.indexOf('pc男性商品推荐-') != -1){
    //     floorName = floorName.replace('pc男性商品推荐-','')
    // }
    return floorName;
}

function imgUrl(imgUrl){
// "http://113.108.163.210:9999/upLoadProduct/15317125707382018-07-16-11-42-50.png"

    // if(imgUrl.indexOf('http://113.108.163.210:9999') != -1){
    //     imgUrl = imgUrl.replace('http://113.108.163.210:9999','http://192.168.2.250:8081')
    // }else if(imgUrl.indexOf('http://localhost:8081') != -1){
    //     imgUrl = imgUrl.replace('http://localhost:8081','')       
    // }else if(imgUrl.indexOf('http://localhost:80') != -1){
    //     imgUrl = imgUrl.replace('http://localhost:80','http://113.108.163.210:9999')
    // }
    return imgUrl;
}