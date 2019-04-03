<template>
<section class="contain">
			
    <!-- banner -->
    <div class="banner">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(it,index) in banners"  :key="it.advertisementID">
            <a :href="it.advertisementUrl">
                <img :src="it.advertisementPhoto" alt="">
            </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- banner end -->

    <!-- 优惠券 -->
    <coupons :isTj="true" :pageNo="'couponsTjManb'"></coupons>
    <!-- 优惠券 end -->

    <!-- 爆款特惠 -->
    <div class="bkth" v-show="hlTl.length">
        <h2><span>肿瘤科爆款特惠</span></h2>
        <p>为癌症患者助力</p>
    </div>
    
    <div class="bkth_list" v-if="hlTl.length>0">
        <div class="top d_flex">
            <div class="tl" @click="jumpDetail(hlTl[0])">
                <img v-lazy="(hlTl[0].productPhotos || hlTl[0].productPhotos.length>0)?hlTl[0].productPhotos[0].photoURL:''" alt="">
                <h3>{{ hlTl[0].sellingPoint?hlTl[0].sellingPoint:'' }}</h3>
                <span>{{ hlTl[0].productName }}</span>
            </div>
            <div class="tr" v-if="hlTr.length>0">
                <div 
                    class="d_flex" 
                    v-for="(htr,index) in hlTr"
                    @click="jumpDetail(htr)"
                    :key="htr.productID">
                    <div>
                        <h3>{{ htr.sellingPoint?htr.sellingPoint:'' }}</h3>
                        <span>{{ htr.productName }}</span>
                        <h2><span class="r_color">{{ htr.ourPrice | priceFilter }}</span></h2>
                    </div>
                    <div>
                        <img v-lazy="htr.productPhotos.length>0?htr.productPhotos[0].photoURL + '?120*120':''" :alt="htr.productName">
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <ul class="d_flex">
                <li 
                    class="d_flex" 
                    v-for="(hlb,index) in hlBottom"
                    @click="jumpDetail(hlb)"
                    :key="hlb.productID">
                    <div>
                        <h3>{{ hlb.sellingPoint?hlb.sellingPoint:'' }}</h3>
                        <span>{{ hlb.productName }}</span>
                        <h2><span class="r_color">{{ hlb.ourPrice | priceFilter }}</span></h2>
                    </div>
                    <div>
                        <img v-lazy="hlb.productPhotos.length>0?hlb.productPhotos[0].photoURL + '?120*120':''" :alt="hlb.productName">
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- 爆款特惠 end -->
    
    <!-- 产品列表 -->
    <div class="pros"  v-if="recomList.length">
        <ul class="d_flex">
            <li v-for="(rl,index) in recomList"  @click="jumpDetail(rl)" :key="rl.productID">
                <!-- <img v-if="rl.productPhotos && rl.productPhotos.length>0" v-lazy="rl.productPhotos[0].photoURL" :alt="rl.productName">
                <img v-if="rl.productPhotos && rl.productPhotos.length<=0" src="/images/ak.png" :alt="rl.productName"> -->
                <img v-lazy="rl.productPhotos&&rl.productPhotos.length>0?rl.productPhotos[0].photoURL + '?120*120':''" :alt="rl.productName">
                <h3>{{ rl.productName }}</h3>
                <span>{{ rl.spec }}</span>
                <h2><span class="r_color">{{ rl.ourPrice | priceFilter }}</span></h2>
                <!-- 套餐暂不需要 -->
                <div v-if="false" class="activitys">
                    <span class="inlie_block">套餐</span> 
                    <span class="inlie_block">秒杀</span> 
                    <span class="inlie_block">满减</span>
                </div>
            </li>
        </ul>
    </div>
    <!-- 产品列表 end -->

</section>
</template>

<script>
import { searchAdvs, searchSt, getStDetail } from '@/api/recommend/'
import { getProductByProductNumber } from '@/api/product/'
import { curDate } from '~~/utils/utils.js'
import coupons from '@/components/coupons/'

export default {
    layout: 'secondPage',
    name: 'manbing',
    async asyncData({app, params}) {
        let banners = [], bkLists = [], recomFloor = [];
        let bkFloor = [];
        let bkProIdList = [], recomProIdList = [];
        let hlTl = [], hlTr = [], hlBottom = [], recomList = [];

        await Promise.all([
            searchAdvs({app, data: {
                endDate: curDate,
                pageNo: 'channelMzBanner',
                isValid: 1
            }}),
            searchSt({app, data: {
                endDate: curDate,
                pageNo: 'channelMzBk',
                isValid: 1
            }}),
            searchSt({app, data: {
                endDate: curDate,
                pageNo: 'channelMzTj',
                isValid: 1
            }}),
        ])
        .then(res=>{
            // console.log(res[0])
            if( res[0] && res[0].success && res[0].data.length>0 ){
                for(let val of res[0].data){
                    banners.push(val)
                }
            }
            // console.log(res[1])
            //爆款推荐
            if( res[1].success && res[1].data.length>0 ){
                for( let val of res[1].data ){
                    bkFloor.push(val);
                }
            }
            //产品推荐
            if( res[2].success && res[2].data.length>0 ){
                for( let val of res[2].data ){
                    recomFloor.push(val);
                }
            }
        })
        .catch(err=>{
            console.log('获取慢病频道数据出错了， ', err)
        })

        await Promise.all([
            getStDetail({app, data: !bkFloor[0]?'':{
                endDate: curDate,
                showID: bkFloor[0].showID,
                isValid: 1
            }}),
            getStDetail({app, data: !recomFloor[0]?'':{
                endDate: curDate,
                showID: recomFloor[0].showID,
                isValid: 1
            }}),
        ])
        .then(res=>{
            // console.log(res[0])
            if( res[0] && res[0].success && res[0].data.length>0 ){
                for( let val of res[0].data ){
                    bkProIdList.push(val.productID);
                }
            }
            if( res[1] && res[1].success && res[1].data.length>0 ){
                for( let val of res[1].data ){
                    recomProIdList.push(val.productID);
                }
            }
        })

        await Promise.all([
            getProductByProductNumber({app, data: !bkProIdList[0]?'':{
                productNumbers: bkProIdList,
            }}),
            getProductByProductNumber({app, data: !recomProIdList[0]?'':{
                productNumbers: recomProIdList,
            }}),
        ])
        .then(res=>{
            // console.log(res[0])
            if(res[0] && res[0].success && res[0].data.length>0){
                for( let index in res[0].data ){
                    if( index == 0 ) {
                        hlTl.push(res[0].data[index])
                    }else if ( index >=1 && index < 3 ){
                        hlTr.push(res[0].data[index])
                    }else {
                        hlBottom.push(res[0].data[index])
                    }
                }
            }
            if(res[1] && res[1].success && res[1].data.length>0){
                for( let val of res[1].data ){
                    recomList.push(val)
                }
            }
        })

        return {banners, hlTl, hlTr, hlBottom, recomList}
    },
    data (){
        return {
            headTitle: '慢病药馆',
            banners: [],//轮播图
            BaoKuan: [],//否是为爆款类型推荐楼层
            hlTl: [],//左上位
            hlTr: [],//右上位
            hlBottom: [],//下推荐
            recomList: [],//商品推荐
        }
    },
	components: {
		coupons,
	},
    mounted (){
        
    },
}
</script>

<style lang="scss" scoped>
    @import url(./Css/channel.scss);
</style>