<template>
    <section class="contain">
        <!-- banner -->
        <div class="banner-2">
            <div class="banner-2-in" v-for="(bn,index) in banners" :key="bn.advertisementID">
                <a :href="bn.advertisementUrl">
                    <img :src="bn.advertisementPhoto">
                </a>
            </div>
        </div>
        <!-- banner end -->

        <!-- 优惠券 -->
        <coupons v-on:getCoupon="toggleCouponLayout" :isTj="true" :pageNo="'couponsTjMan'"></coupons>
        <!-- 优惠券 end -->
        
        <!-- 产品列表 -->
        <div class="pros" v-if="recomList.length">
            <ul class="d_flex">
                <li 
                    v-for="(rl,index) in recomList"
                    @click="jumpDetail(rl,index)"
                    :key="rl.productID">
                    <img v-lazy="rl.productPhotos&&rl.productPhotos.length>0?rl.productPhotos[0].photoURL + '?120*120':''" :alt="rl?rl.productName:''">
                    <h3>{{ rl?rl.productName:'' }}</h3>
                    <span>{{ rl?rl.spec:'' }}</span>
                    <h2 ><span class="r_color">{{ rl?rl.ourPrice:'' | priceFilter }}</span></h2>
                    <!-- 暂时不需要 
                    <div class="activitys">
                        <span class="inlie_block">套餐</span> 
                        <span class="inlie_block">秒杀</span> 
                        <span class="inlie_block">满减</span>
                    </div> -->
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
    name: 'cmale',
    async asyncData({app, params}) {
        let banners = [], recomFloor = [];
        let recomProIdList = [];
        let recomList = [];

        await Promise.all([
            searchAdvs({app, data: {
                endDate: curDate,
                pageNo: 'channelMaBanner',
                isValid: 1
            }}),
            searchSt({app, data: {
                endDate: curDate,
                pageNo: 'channelNkTj',
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
            //商品推荐
            if( res[1].success && res[1].data.length>0 ){
                for( let val of res[1].data ){
                    recomFloor.push(val);
                }
            }
        })

        await Promise.all([
            getStDetail({app, data: !recomFloor[0]?'':{
                endDate: curDate,
                showID: recomFloor[0].showID,
                isValid: 1
            }}),
        ])
        .then(res=>{
            if( res[0] && res[0].success && res[0].data.length>0 ){
                for( let val of res[0].data ){
                    recomProIdList.push(val.productID);
                }
            }
        })

        await Promise.all([
            getProductByProductNumber({app, data: !recomProIdList[0]?'':{
                productNumbers: recomProIdList,
            }}),
        ])
        .then(res=>{
            if(res[0] && res[0].success && res[0].data.length>0){
                for( let val of res[0].data ){
                    recomList.push(val)
                }
            }
        })


        return {banners, recomList}
    },
    data (){
        return {
            headTitle: '男性频道',
            banners: [],//轮播图
            recomList: [],//商品推荐
        }
    },
	components: {
		coupons,
	},
}
</script>

<style lang="scss" scoped>
    @import url(./Css/channel.scss);
</style>
