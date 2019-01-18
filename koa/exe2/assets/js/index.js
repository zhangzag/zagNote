$(function(){
    //请求地址
    // var webRoot = 'http://113.108.163.210:9999/AKGW-api/v1';
    var webRoot = $.getGlobalVal().webRoot;
    //源地址
    var webOrigin = $.getGlobalVal().webOrigin;
    //当前时间
    var curDate = $.getGlobalVal().curDate;
    //会员Id
    var memberId = $.getGlobalVal().memberId;

    //banner indBanners
    $.ajax({
        url: webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: curDate,
            pageNo: 'indBanners',
            isValid: 1
        },
    })
    .done(function(res) {
        // console.log("banners",res);
        if( !res.success || res.data.length === 0 ){
            return false;
        }

        var htmlText = '';
        //banner
        for( var i = 0; i < res.data.length; i++ ){
            htmlText += '<li id="'+ (i+1) +'"><a target="_blank" href="'+ res.data[i].advertisementUrl +'"><img src="'+ res.data[i].advertisementPhoto +'"></a></li>'
            // $('#roteAdv').append('<li id="'+ (i+1) +'"><a href="'+ res.data[i].advertisementUrl +'"><img src="'+ res.data[i].advertisementPhoto +'"></a></li>');        
        }
        $('#roteAdv').append(htmlText);

        //轮换广告 start
        $('#roteAdv').after("<div class='slider' id='roteAdv_nav' style=''>").cycle({
            prev: '#turnL',
            next: '#turnR',
            // fx:     'slideX',
            fx:     'fade',
            speed:  '300',
            pause: true,
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
    });

    //阿康推荐
    $.ajax({
        url: webRoot + '/seachSt',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: curDate,
            pageNo: 'pakRecom',
            isValid: 1,
        },
        success: function(res){
            // console.log('阿康推荐: ', res)
            var datas = res.data;

            if( !res.success || datas.length===0 ){
                return false;
            }
            //获取商品推荐明细
            $.ajax({
                url: webRoot + '/seachStDetail',
                type: 'POST',
                dataType: 'json',
                data: {
                    endDate: curDate,
                    showID: datas[0].showID,
                    isValid: 1
                },
            })
            .done(function(res) {
                // console.log('阿康推荐明细: ', res);
                var list = res.data;
                //推荐里的商品Id
                var productIdArr = [];
                if ( !res.success || list.length === 0 ){
                    return false;
                }

                for( var i=0; i<list.length; i++ ){
                    productIdArr.push(list[i].productID);
                }
                //根据商品ID获取商品详情
                $.ajax({
                    url: webRoot + '/product/getProductByProductNumber',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                      memberId: memberId,
                      productNumbers: productIdArr,
                    }),
                    headers: {'Content-Type' : 'application/json;charset=utf-8'}
                })
                .done(function(res) {
                    // console.log(res);
                    if( res.data.length === 0 ){
                        $('.featur_area').hide();
                        return false;
                    }

                    var htmlText = '';
                    for( var i=0; i<res.data.length; i++ ){ 

                        htmlText += '<li><a target="_blank" href="/products/'+ res.data[i].productNumber +'.html"><img src="'+ photosFilter(res.data[i].productPhotos) +'?200*200"></a><div class="pro_info"><h2>'+ res.data[i].productName +'</h2><div class="pro_price"><span class="c_orange"><em>'+ $.priceFilter(res.data[i].ourPrice) +'</em></span></div></div></li>';
                    };
                    $('.featur_pro').append( htmlText );
                })
                .fail(function() {
                    // console.log("error");
                })
                .always(function(res) {
                    // 阿康推荐轮播
                    // console.log("complete", res)
                    var num = res.data.length;
                    //页数
                    var page = 0;

                    if( res.data.length === 0 ){
                        return 
                    }

                    //分页条长度 -- 暂时不需要
                    var activePwidth = 100/Math.ceil(num/5);//长度
                    $('.paginations .active_p').css('width', activePwidth+'%');

                    // var paginationsHtml = '';
                    // for( var i=0; i<Math.ceil(num/5); i++ ){
                    //     paginationsHtml += '<span style="width:'+ activePwidth +'%;" class="paginaSpan" data-cp="'+ i +'"></span>';
                    // }
                    // $('.paginations').append( paginationsHtml );
                    
                    //分页
                    $('.paginations').on('click', '.paginaSpan', function(){
                        page = $(this).attr('data-cp');

                        $('.active_p').animate({left: activePwidth*page+'%'},0);
                        $('.featur_pro').animate({left: -1205*page},300);
                    });    

                    //下一页
                    $('#feature_next').click(function(event) {
                        // console.log('下一页: ', page)
                        if( page+1 >= Math.ceil(num/5) ){return}
                        page++;

                        $('.active_p').animate({left: activePwidth*page+'%'},0);
                        $('.featur_pro').animate({left: -1205*page},300);
                    });
                    //上一页
                    $('#feature_prev').click(function(event) {
                        // console.log('上一页: ', page)
                        if( !page ){return}
                        page--;

                        $('.active_p').animate({left: activePwidth*page+'%'},0);
                        $('.featur_pro').animate({left: -1205*page},300);
                    });
                });
                
                // console.log(productIdArr)
            });
            
        }
    });

    //楼层名称
    $.ajax({
        url: webRoot + '/seachAd',
        data: {
            endDate: curDate,
            pageNo: 'fName',
            isValid: 1
        }
    })
    .done(function(res) {
        // console.log("success",res);
        if( !res.success || res.data.length === 0 ){
            return false;
        }

        var advHtml = '';
        //向楼层底部插入广告图
        for( var i = 0; i < res.data.length; i++ ){
            
            advHtml = '<a target="_blank" href="'+ res.data[i].advertisementUrl +'"><img src="'+ res.data[i].advertisementPhoto +'" ></a>';
             $('.floor>.f_title').eq(i).append( advHtml );
        }
    });
    

    //楼层底部广告 
    $.ajax({
        url: webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: curDate,
            pageNo: 'pFloorAdv',
            isValid: 1
        }
    })
    .done(function(res) {
        // console.log("success",res);
        if( !res.success || res.data.length === 0 ){
            return false;
        }
        //向楼层底部插入广告图
        for( var i = 0; i < res.data.length; i++ ){
            $('.hasBotAdv').eq(i).after(
                '<div class="floor_bot_adv"><a target="_blank" href="'+ res.data[i].advertisementUrl +'"><img class="lazy" data-original="'+ res.data[i].advertisementPhoto +'" ></a></div>'
            );
        }

        //图片懒加载
        lazyLoad({
            imgSrc: '/static/images/i_placeholder.gif',
        });
    });

    //楼层商品推荐
    $.ajax({
        url: webRoot + '/seachSt',
        data: {
            endDate: curDate,
            pageNo: 'pcRecom',//分区代码
            isValid: 1,
        },
        success: function(res){
            // console.log('楼层信息：', res)
            var datas_1 = res.data;

            if( !res.success || datas_1.length===0 ){
                return false;
            }

            for( var x=0; x<datas_1.length; x++ ){
                var datas = datas_1[x];

                getProList( datas.showID, x );
            }
            
        }
    });

    //楼层1大图广告
    $.ajax({
        url: webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: curDate,
            pageNo: 'fAdvImgL',
            isValid: 1
        }
    })
    .done(function(res) {
        // console.log("success",res);
        if( !res.success || res.data.length === 0 ){
            return false;
        }
        //各楼层大图广告
        for( var i = 0; i < res.data.length; i++ ){
            $('.floor_ladv').eq(i).append(
                '<a target="_blank" href="'+ res.data[i].advertisementUrl +'" ><img class="lazy" data-original="'+ res.data[i].advertisementPhoto +'" alt=""></a>'
            );
        }
        //图片懒加载
        lazyLoad({
            imgSrc: '/static/images/bg_fadv.jpg',
        });
    });

    //楼层1小图广告
    $.ajax({
        url: webRoot + '/seachAd',
        type: 'POST',
        dataType: 'json',
        data: {
            endDate: curDate,
            pageNo: 'fAdvImgS',
            isValid: 1
        }
    })
    .done(function(res) {
        // console.log("success",res);
        if( !res.success || res.data.length === 0 ){
            return false;
        }
        //插入广告图
        for( var i = 0; i < res.data.length; i++ ){
            $('.fr_adv').eq(i).append(
                '<a target="_blank" href="'+ res.data[i].advertisementUrl +'" ><img class="lazy" data-original="'+ res.data[i].advertisementPhoto +'" alt=""></a>'
            );
        }
        //图片懒加载
        lazyLoad({
            imgSrc: '/static/images/bg_fads.jpg',
        });
    });
    
    //获取楼层品牌推荐
    $.ajax({
        url: webRoot + '/searchShowBrand',
        data: {
            endDate: curDate,//格式为 2018-05-26 00:00:00
            pageNo: 'akBrands',
            isValid: 1
        },
    })
    .done(function(res) {
        // console.log("akBrands: ", res);
        if( res.success && res.data.length>0 ){
            //循环
            for( var i=0; i<res.data.length;i++ ){
                var showBrandId = res.data[i].showBrandID;
                 
                getBrandList( showBrandId, i );
            }
        }
    });

    // 获取每层楼的推荐列
    function getProList( showId, floorIndex ){
        //获取商品推荐明细
        $.ajax({
            url: webRoot + '/seachStDetail',
            type: 'POST',
            dataType: 'json',
            data: {
                endDate: curDate,
                showID: showId,
                isValid: 1
            }
        })
        .done(function(res) {
            // console.log('明细：', res);

            var list = res.data;
            //推荐里的商品Id
            var productIdArr = [];
            if ( !res.success || list.length === 0 ){
                return false;
            }

            for( var p=0; p<list.length; p++ ){
                productIdArr.push(list[p].productID);
            }
            getProDetail( productIdArr, floorIndex );
        });
    }

    // 获取每列的商品
    function getProDetail( productIdArr, floorIndex ){
        //根据商品ID获取商品详情
        $.ajax({
            url: webRoot + '/product/getProductByProductNumber',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
              memberId: memberId,
              productNumbers: productIdArr,
            }),
            headers: {'Content-Type' : 'application/json;charset=utf-8'},
        })
        .done(function(res) {
            // console.log('产品详情：', res);
            if( res.data.length === 0 ){
                $('.featur_area').hide();
                return false;
            }

            //产品1
            var proLarHtml = '<div class="fl"><h3>'+ res.data[0].productName +'</h3><span>'+ (res.data[0].sellingPoint?res.data[0].sellingPoint:'') +'</span><p class="c_orange">'+ $.priceFilter(res.data[0].ourPrice) +'</p></div><div class="fr"><a target="_blank" href="/products/'+ res.data[0].productNumber +'.html"><img class="lazy" data-original="'+ (res.data[0].productPhotos?res.data[0].productPhotos[0].photoURL:'') +'?240*240" alt="'+ res.data[0].productName +'" title="'+ res.data[0].productName +'"></a></div>';
            $('.floor').eq(floorIndex).find('.pro_lar').append( proLarHtml );
            
            // 产品1下边2个产品
            var proLarBotsHtml = '';
            for( var i = 1; i<3; i++ ){
                if(!res.data[i]){break}
                
                proLarBotsHtml += '<div class="fl"><h3>'+ res.data[i].productName +'</h3><p class="c_orange">'+ $.priceFilter(res.data[i].ourPrice) +'</p><div><a target="_blank" href="/products/'+ res.data[i].productNumber +'.html"><img class="lazy" data-original="'+ (res.data[i].productPhotos?res.data[i].productPhotos[0].photoURL:'') +'?160*160" alt="'+ res.data[i].productName +'" title="'+ res.data[i].productName +'"></a></div></div>';
            }
            $('.floor').eq(floorIndex).find('.pro_lar_bots').append( proLarBotsHtml );

            //产品1右边三个产品
            var floorLcHtml = '';
            for( var i = 3; i<6; i++ ){
                if(!res.data[i]){break}

                floorLcHtml += '<div class="l_item"><h3>'+ res.data[i].productName +'</h3><a target="_blank" href="/products/'+ res.data[i].productNumber +'.html"><span class="fl c_orange">'+ $.priceFilter(res.data[i].ourPrice) +'</span><span class="fr"><img class="lazy" data-original="'+ (res.data[i].productPhotos?res.data[i].productPhotos[0].photoURL:'') +'?120*120" alt="'+ res.data[i].productName +'" title="'+ res.data[i].productName +'"></span><span class="clear"></span></a></div>';
            }
            $('.floor').eq(floorIndex).find('.floor_lc').append( floorLcHtml );

            //图片懒加载
            lazyLoad({
                imgSrc: '/static/images/ak_300x300.jpg',
            });
        });
    };
    
    //获取每层楼品牌列
    function getBrandList( showBrandId, floorIndex ){
        //获取品牌详情
        $.ajax({
            url: webRoot + '/searchShowBrandDetail',
            data: {
                endDate: curDate,
                showBrandID: showBrandId,
                isValid: 1,
            },
            // async: false,
        })
        .done(function(res) {
            // console.log("akBrands详情： ", res);
            if( res.success && res.data.length>0 ){
                for( var y=0; y<res.data.length; y++ ){
                    //只显示6个
                    if( y>5 ){ break; }
                    getBrandDetail( res.data, floorIndex, y );
                }

                //图片懒加载
                lazyLoad({
                    imgSrc: '/static/images/ak_200x200.jpg',
                });
            }
        });
    };

    //获取品牌列详情
    function getBrandDetail( datas, floorIndex, detailIndex ){
        $('.fr_brandlist>ul').eq(floorIndex).append('<li><a target="_blank" href="/list.html?productName='+ datas[detailIndex].brandName +'"><img class="lazy" data-original="'+ datas[detailIndex].largePhoto +'" alt="'+ datas[detailIndex].brandName +'"></a></li>');
    };
});

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
    
};

//图片过滤
function photosFilter( data ){
    if ( !data || data.length<0 ){
        return '/static/images/ak_300x300.jpg';
    }else{
        return data[0].photoURL;
    }
};