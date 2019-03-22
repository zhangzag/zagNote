<template>
    <!-- <section class="coupons" v-if="couponList.length>0">
        <slot name="title">
        <div class="r_header">
			<h3>阿康优惠券</h3>
        </div>
        </slot>

        <div class="r_con d_flex">
			<div class="item" v-for="(item, index) in couponList" @click="getCoupon(item, index)" :class="{isget: item.receiveedQty>=item.totalQty}">
				<div class="f_left">
					<div class="item_price">
						<i>¥</i><em>{{item.faceValue}}</em> <span>{{item.couponactiveName}}</span>
					</div>
					<div class="item_time">
						<div>{{item.isAll==1?'全场可用':'限部分商品'}}</div>
						<span>{{item.usestartDatetime | timeToYMD}}-{{item.useendDatetime | timeToYMD}}</span>
					</div>
				</div>
				<div class="f_right"></div>
			</div>
        </div>
    </section> -->

    <section class="coupons" v-if="allCoupons.length>0">
    	<div v-for="(items, indexs) in allCoupons" v-show="items.couponList.length>0" class="item_wrap">
	        <slot name="title">
		        <div class="r_header">
					<p class="zone_title">{{ items.name }}</p>
		        </div>
	        </slot>
	        <div class="r_con d_flex">
				<div class="item" v-for="(item, index) in items.couponList" :class="{isget: item.receiveedQty>=item.totalQty}">
					<div class="f_left">
						<div class="item_price">
							<i>¥</i><em>{{item.faceValue}}</em> <span>{{item.couponactiveName}}</span>
						</div>
						<div class="item_time">
							<div>{{item.isAll==1?'全场可用':'限部分商品'}}</div>
							<span>{{item.usestartDatetime | timeToYMD}}-{{item.useendDatetime | timeToYMD}}</span>
						</div>
					</div>
					<div class="f_right" @click="getCoupon(item, index, indexs)"></div>
				</div>
	        </div>
        </div>
    </section>
</template>

<script>
// import { Toast, MessageBox  } from 'mint-ui'; 
import { curDate } from '~~/utils/utils.js'

export default {
 	data (){
 		return {
 			flag: false,
 			// couponList: [],
 			allCoupons: [],
 		}
 	},   
 	props: {
 		isTj: {
 			default: false,
 			type: Boolean
 		},
 		pageNo: {
 			default: '',
 			type: String
 		}
 	},
 	mounted (){
 		if( this.isTj ){
	 		//首页优惠券推荐
		    this.$axios({
		      url: '/searchShowCoupon',
              method: 'post',
		      data: {
		        endDate: curDate,// 商品的ID（查询当前商品是否存在优惠券）
		        pageNo: this.pageNo || 'couponsTj',
		        isValid: '1',// 终端标识（wap，pc，表示请求终端）
		      }
		    })
		    .then(res=>{
		    	console.log('优惠券推荐: ', res)
		    	// let idList = [];
		    	if( res.success && res.data.length>0 ){
		    		for( let val of res.data ){
		    			// idList.push( val.couponCommendID )
		    			if( !val || !val.couponCommendID ){return}
	    				let couponItem = {};
		    			couponItem.name = val.couponCommendName || ''; 	
		    			couponItem.couponList = []; 	
		    			
					    this.$axios({
                          url: '/searchShowCouponDetail',
                          method: 'post',
					      data: {
					        endDate: curDate,// 商品的ID（查询当前商品是否存在优惠券）
					        showID: val.couponCommendID,
					        isValid: '1',// 终端标识（wap，pc，表示请求终端）
					      }
					    })
						.then(lres=>{
							console.log('优惠券列表: ', lres)
							if(!lres.success || lres.data.length<=0){return}
							for( let val of lres.data ){
								// this.couponList.push(val)
								this.$axios({
							      url: '/coupon/getCoupon',
                                  method: 'post',
							      data: {
							        couponactiveid: val.couponActiveId,
							      }
							    })
							    .then(dres=>{
							    	console.log('优惠券明细： ', dres)
							    	if(!dres.success){return}
							    	// this.couponList.push(dres.data.data);	
							    	couponItem.couponList.push(dres.data);	
							    })
							    .catch(err=>{
							    	console.log('优惠券明细出错了， ', err)
							    })
							}
						})
						.catch(derr=>{
							console.log('优惠券列表出错了，', derr)
						})
						this.allCoupons.push(couponItem)
		    		}
		    	}
		    })
		    .catch(err=>{
		    	console.log(err)
		    })
	    }else{
	 		//获取优惠券
		    this.$axios({
		      url: '/coupon/getCouponApi',
              method: 'post',
              data: {
		        productId: '',// 商品的ID（查询当前商品是否存在优惠券）
		        sysNo: 'wap',// 终端标识（wap，pc，表示请求终端）
		      }
		    })
		    .then(res=>{
		    	console.log('获取优惠券2： ', res)
		    	if(!res.success){
		      		this.$Toast({
			        	message: res.msg,
				        position: 'center',
				        duration: 1500
			      	});
		    		return false;
		    	}
		    	if( res.data.length<=0 ){return}

	    		for( let val of res.data ){
	    			this.couponList.push(val)
	    		}
		    })
		    .catch(err=>{
		    	console.log('获取优惠券出错了', err)
		    })
	    }
 	},
 	methods: {
 		//领优惠券
 		getCoupon (item, index, indexs){
 			let totalQty = item.totalQty, receiveedQty = item.receiveedQty;

 			//已抢光
 			if(item.receiveedQty>=item.totalQty){return}
 			if(this.flag){return}
			this.flag = true;

			if(!this.$store.state.memberId){
	      		this.$Toast({
		        	message: '请先登录',
			        position: 'center',
			        duration: 1500
		      	});
				this.flag = false;
				return ;
			}

	 		//获取优惠券
		    this.$axios({
		      url: '/coupon/addCouponToMemberApi',
              method: 'post',
              data: {
		        couponactiveid: item.couponactiveid,// 优惠券的ID
		        memberId: this.$store.state.memberId,// 会员的ID
		      }
		    })
		    .then(res=>{
		    	// console.log('领取券： ', res)
	      		this.$Toast({
		        	message: res.msg,
			        position: 'center',
			        duration: 1500
		      	});
		      	this.flag = false;
		    	if( !res.success ){
			      	return;
		    	}
		    	//更新已领取数量
		    	receiveedQty++;
		    	this.allCoupons[indexs].couponList[index].receiveedQty++;

		    	this.$emit('getCoupon')
		    })
		    .catch(err=>{
		    	console.log('领取券出错： ', err)
		    	Toast('领券出错了');
		    });
 		},
 	},
}
</script>

<style scoped>
	@import './Css/coupons.scss';
	
	.item_wrap:not(:first-of-type) {
		margin-top: 0.31rem;
	}
</style>