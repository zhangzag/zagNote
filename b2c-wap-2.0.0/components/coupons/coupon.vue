<template>
	<div class="coupon_item_block" ref="wrapper" :style="{height:countHeight?(countHeight + 'rem'):(wrapperHeight + 'px')}">
		<div class="item d_flex" v-for="(item, index) in couponList" @click="getCoupon(item, index)">
			<div class="item_l">
				<div class="pricedec d_flex r_color">
					<div class="price"><i>¥</i><em>{{item.faceValue}}</em></div>
					<div class="dec">
						<!-- <span>{{item.couponactiveName}}</span> -->
						<div><span>{{item.couponactiveName}}</span></div>
						<p>{{item.isAll==1?'全场可用':'限部分商品'}}</p>
					</div>
				</div>
				<div class="time">{{item.usestartDatetime | timeToYMD}}-{{item.useendDatetime | timeToYMD}}</div>
			</div>
			<div class="item_r"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'couponItemList',
	data (){
		return {
			wrapperHeight: 0,
		}
	},
	props: {
		remHeight: Array,
		couponList: Array,
	},
	computed: {
		countHeight (){
			//remHeight数组第一个值为原px高度,第二个值为rem换算单位,默认32
			if(!this.remHeight && this.remHeight.length<0){return false;}

			let px = this.remHeight[0];
			let rem = this.remHeight[1] || 32;

			return (px/rem).toFixed(2);
		},
	},
	mounted (){
		if(!this.countHeight){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	},
 	methods: {
 		//领优惠券
 		getCoupon (item, index){
 			if(this.flag){return}
			this.flag = true;

			if(!this.$store.state.memberId){
	      		Toast({
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
		    	// console.log('领取券111： ', res)
	      		Toast({
		        	message: res.data.msg,
			        position: 'center',
			        duration: 2000
		      	});
		      	this.flag = false;
		      	if( !res.data.success ){
			    	this.$emit('closeCouponBlock')
			    }
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
	.coupon_item_block {
		overflow-y: scroll;
		/*padding: 0 0.31rem 0.31rem;*/
		padding: 0.31rem 0.31rem 0;
		box-sizing:border-box;
	}
	.coupon_item_block .item {
		/*margin-top: 0.31rem;*/
		margin:0 auto 0.31rem;
		max-width: 507px;
	}

	.coupon_item_block .item_l {
		width: 6.72rem;
		height: 2.66rem;
		background-image: url(../../../static/images/coupon_il.png);
		-webkit-background-size: 6.72rem auto;
		background-size: 6.72rem auto;
		background-repeat: no-repeat;
		background-position: left center;
		/*padding:0 0.47rem;*/
		/*padding:0 2.03rem 0 0.47rem;*/
		padding:0 1.30rem 0 0.31rem;
		box-sizing: border-box; 
		position:relative;
	}
	.coupon_item_block .used .item_l::after {
		content: '';
		position: absolute;
		right: 0.31rem;
		top:0;
		width:1.56rem;
		height: 100%;
		background-image: url(../../../static/images/coupon_ig.png);
		-webkit-background-size: 1.56rem auto;
		background-size: 1.56rem auto;
		background-position: left center;
		background-repeat: no-repeat;
	}
	.coupon_item_block .item_r {
		width: 2.66rem;
		height: 2.66rem;
		background-image: url(/images/coupon_iru.png);
		-webkit-background-size: 2.66rem auto;
		background-size: 2.66rem auto;
		background-repeat: no-repeat;
		background-position: left center;
	}
	.coupon_item_block .used .item_r {
		background-image: url(/images/coupon_ir2.png);
	}
	.coupon_item_block  .pricedec {
		justify-content: flex-start;
		margin-top: 0.5rem;
		overflow: hidden;
	}
	.coupon_item_block  .pricedec .price {
		font-size: 0;
		margin-right: 0.22rem;
	}
	.coupon_item_block .used .pricedec .price {
		color:#999;
	}
	.coupon_item_block  .pricedec .price>i {
		font-size: 0.38rem;
		font-style: normal;
		display: inline-block;
		margin-right: 0.12rem;
	}
	.coupon_item_block  .pricedec .price>em {
		font-size: 1.12rem;
		font-style: normal;
		display: inline-block;
		line-height: 0.94rem;
	}
	/*.coupon_item_block  .pricedec .dec>span {
		font-size: 0.31rem;
		padding:0 0.25rem;
		display: inline-block;
		line-height: 0.56rem;
		background-color: #ffcfd8;
	}*/
	.coupon_item_block  .pricedec .dec>div {
		font-size: 0.31rem;
		padding:0 0.25rem;
		display: inline-block;
		line-height: 0.56rem;
		background-color: #ffcfd8;
		max-width: 1.56rem;
		white-space: nowrap;
	}
	.coupon_item_block  .pricedec .dec>div>span {
		display: block;
		width: 100%;
		overflow: hidden;
	}
	.coupon_item_block .used .pricedec .dec>span {
		color:#999;
	}
	.coupon_item_block  .pricedec .dec>p {
		font-size: 0.38rem;
		color:#999;
	}
	.coupon_item_block  .item_l>.time {
		margin-top:0.31rem;
	}
</style>