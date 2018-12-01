// require('./style/index.css');
require('./style/index.scss');
require('./style/index.scss');
import $ from 'jquery';
require('../../../static/js/jquery.cycle.all.min.js');

import { renderHtml } from '@/util/util.js';
import { getAdvRecom, getProRecom, getProRecomDetail } from 'apis/getRecom.js';
import { getProByProductNumber } from 'apis/product.js';

import bannerHtml from './indexBanner.hbs';
import akRecomHtml from './indexAkRecom.hbs';


// let htmlString2 = renderHtml(source, data);

$(function(){

    //轮播图
    getAdvRecom({
        pageNo: 'indBanners',
    })
    .then(res=>{
        console.log('获取轮播: ' ,res)
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
        console.log('阿康推荐： ', res)
        let datas = res.data;

        if( !res.success || datas.length===0 ){
            return false;
        }
        getProRecomDetail({
            showID: datas[0].showID
        })
        .then(res=>{
            console.log('阿康推荐详情: ', res);
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
                console.log('获取商品详情: ', res)
                if( res.data.length === 0 ){
                    $('.featur_area').hide();
                    return false;
                }
                
                let akRecomHtmlString = renderHtml(akRecomHtml, {datas: res.data});
                //挂载阿康推荐
                $('.featur_pro').html( akRecomHtmlString );
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
});
