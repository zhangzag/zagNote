// require('./style/index.css');
require('./style/index.scss');
require('./style/index.scss');
import $ from 'jquery';
require('../../../static/js/jquery.cycle.all.min.js');

import { webRoot, curDate } from '@/assets/js/globalDefine.js';

import { renderHtml } from '@/util/util.js';
import { getAdvRecom, getProRecom, getProRecomDetail } from 'apis/getRecom.js';
import { getProByProductNumber } from 'apis/product.js';

import bannerHtml from './indexBanner.hbs';
import akRecomHtml from './indexAkRecom.hbs';
import floorProBigHtml from './floorProBig.hbs';
import floorProBottomHtml from './floorProBottom.hbs';
import floorProRightHtml from './floorProRight.hbs';


// let htmlString2 = renderHtml(source, data);

$(function(){
    let memberId = 10299;

    //轮播图
    getAdvRecom({
        pageNo: 'indBanners',
    })
    .then(res=>{
        // console.log('获取轮播: ' ,res)
        if( !res.success || res.data.length === 0 ){
            return false;
        }
        let bannerHtmlString = renderHtml(bannerHtml, {datas: res.data});

        //挂载轮播图
        $('#roteAdv').html( bannerHtmlString );

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
                let count=index;
                if(index==0){
                    return '<span id="c'+count+'"  class="cur"></span>'
                }else{
                    return '<span  id="c'+count+'"></span>'
                }
            },
            after:function(currSlideElement, nextSlideElement, options, forwardFlag){
                // console.log(currSlideElement, nextSlideElement, options, forwardFlag)
                // console.log(nextSlideElement.id)
                let a= $("#roteAdv_nav").find("span").attr("class","");
                $("#c"+nextSlideElement.id).attr("class","cur");
            }
        });
        /*轮换广告 end*/
    })
    .catch(err=>{
        console.log(err)
    })

    //阿康推荐
    getProRecom({
        pageNo: 'pakRecom',
    })
    .then(res=>{
        // console.log('阿康推荐： ', res)
        let datas = res.data;

        if( !res.success || datas.length===0 ){
            return false;
        }
        getProRecomDetail({
            showID: datas[0].showID
        })
        .then(res=>{
            // console.log('阿康推荐详情: ', res);
            let list = res.data;
            //推荐里的商品Id
            let productIdArr = [];
            if ( !res.success || list.length === 0 ){
                return false;
            }

            for( let val of res.data ){
                productIdArr.push( val.productID );
            }

            //获取商品详情
            getProByProductNumber({
                memberId: 10299,
                productNumbers: productIdArr
            })
            .then(res=>{
                // console.log('获取商品详情: ', res)
                if( res.data.length === 0 ){
                    $('.featur_area').hide();
                    return false;
                }
                
                let akRecomHtmlString = renderHtml(akRecomHtml, {datas: res.data});
                //挂载阿康推荐
                $('.featur_pro').html( akRecomHtmlString );

                // 阿康推荐轮播
                // console.log("complete", res)
                let num = res.data.length;
                //页数
                let page = 0;

                if( res.data.length === 0 ){
                    return 
                }
                //分页条长度 -- 暂时不需要
                let activePwidth = 100/Math.ceil(num/5);//长度
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
            })
            .catch(err=>{
                console.log('获取商品详情失败', err)
            });
        })
        .catch(err=>{
            console.log('获取阿康推荐详情失败', err)
        });
    })
    .catch(err=>{
        console.log(err)
    });

    //楼层名称
    getAdvRecom({
        pageNo: 'fName',
    })
    .then(res=>{
        // console.log('楼层名称: ', res)
        if( !res.success || res.data.length === 0 ){
            return false;
        }

        //向楼层插入楼层名称
        for( var i = 0; i < res.data.length; i++ ){
            let advHtml = '';
            advHtml = '<a target="_blank" href="'+ res.data[i].advertisementUrl +'"><img src="'+ res.data[i].advertisementPhoto +'" ></a>';
             $('.floor>.f_title').eq(i).append( advHtml );
        }
    })
    .catch(err=>{
        console.log(err)
    });

    //楼层商品推荐
    getProRecom({
        pageNo: 'pcRecom',
    })
    .then(res=>{
        console.log('楼层信息：', res)
        let datas = res.data;
        let showIdList = [];

        if( !res.success || datas.length===0 ){
            return false;
        }

        getProRecomDetail({
            showID: datas[0].showID
        })
        .then(res=>{
            console.log('获取楼层商品推荐详细: ', res)
            
            if ( !res.success || res.data.length === 0 ){
                return false;
            }
            let productIdArr = [];
            for( let val of res.data ){
                productIdArr.push( val.productID );
            }

            //获取商品详情
            getProByProductNumber({
                memberId: 10299,
                productNumbers: productIdArr
            })
            .then(res=>{
                console.log('楼层获取商品: ', res)
                if( res.data.length === 0 ){
                    return false;
                }

                //产品1
                let floorProBigHtmlString = renderHtml(floorProBigHtml, res.data[0]);

                $('.floor').eq(0).find('.pro_lar').html( floorProBigHtmlString );
                
                // 产品1下边2个产品
                let datasBottom = [];
                for( let i = 1; i<3; i++ ){
                    if(!res.data[i]){break}
                    datasBottom.push( res.data[i] );
                }
                let floorProBottomHtmlString = renderHtml(floorProBottomHtml, {
                    datas: datasBottom
                });

                $('.floor').eq(0).find('.pro_lar_bots').html( floorProBottomHtmlString );

                //产品1右边三个产品
                let datasRight = [];
                for( let i = 3; i<6; i++ ){
                    if(!res.data[i]){break}
                    datasRight.push( res.data[i] );
                }
                let floorProRightHtmlString = renderHtml(floorProRightHtml, {
                    datas: datasRight
                });

                $('.floor').eq(0).find('.floor_lc').html( floorProRightHtmlString );
            })
            .catch(err=>{
                console.log('楼层获取商品失败，', err)
            });
        })
        .catch(err=>{
            console.log('获取楼层商品推荐详细失败', err)
        });
    })
    .catch(err=>{
        console.log('获取楼层商品失败,', err)
    });




});
