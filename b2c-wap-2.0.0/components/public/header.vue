<template>
<div class="header" :class='{isNewsPage: isNewsPage}'>
	<!-- 另一种风格 -->
	<slot name="style-def">
		<mt-header :title="titles">
	      <mt-button 
	      	icon="back" 
	      	slot="left" 
	      	@click.prevent="goBack"></mt-button>
		  <mt-button 
		  	icon="more" 
		  	slot="right"
		  	@click.prevent="showMore"></mt-button>
		</mt-header>
	</slot>	
	<!-- 另一种风格 -->
    
    <!-- 咨询页 -->
    <slot name="style-zx" v-if="isNewsPage">
		<div class="search_from">
			<form class="d_flex" action="javascript:;">
				<input type="text" placeholder="请输入搜索资讯关键字" v-model.trim="searchCon">
				<button @click="jumpSearch('topSearch')">搜索</button>
			</form>
		</div>
    </slot>
    <!-- 咨询页 end -->

	<mt-popup
		ref="headPopup"
		class="more_block"
		v-model="isShowMore"
		position="top">
		<router-link to="/">首页</router-link>
		<router-link :to="{path: '/sort', query: {i: Math.random().toFixed(2)}}">分类</router-link>
		<router-link :to="{path: '/myinfo', query: {i: Math.random().toFixed(2)}}">个人中心</router-link>
	</mt-popup>

</div>
</template>

<script>

export default {
	name: 'comHeader',
	data (){	
		return {
			isShowMore: false, // 是否显示更多
		}
	},	
	props: [
		'titles',
		'clearData',
		'isNewsPage',
		'toregister',//是否为需求登记页面
	],
	components: {
		// 'mt-header': Header,
		// 'mt-button': Button,
		// 'mt-popup': Popup
	},
	created (){

	},
	mounted (){
		
	},
	methods: {
		// 后退
		goBack (){	
			// return false
			if( this.clearData ){
				this.$emit('clearData');
			}

			if( window.history.length<2 ){
				if( this.toregister ){
					let cmmodityType = this.$parent.union?(this.$parent.union.packageId?2:1) : (this.$parent.$route.query.packageId?2 : 1);
					let packageNo = this.$parent.union?(this.$parent.union.packageId?this.$parent.union.packageId : '') : (this.$parent.$route.query.packageId?this.$parent.$route.query.packageId : '');

					failedRequire({
						memberID: this.$parent.memberId,//会员ID  
						// CommodityType: this.$parent.union.packageId?2 : 1,//商品类型。1.普通商品 2.套餐商品
						commodityType: cmmodityType,//商品类型。1.普通商品 2.套餐商品
						productID: this.$parent.productData.productID,//商品ID  
						causeoffailure: '返回上一步',//失败原因  
						packageNo: packageNo,//套餐商品ID  
						sysNo: 'wap'//终端ID
					});
					return false;
				}
				this.$router.replace({path: '/'});
				return false;
			}

			//需求登记页面 后退时提示提交失败
			if( this.toregister ){
				
				//默认为普通商品
				let cmmodityType = 1;
				if( this.$parent.union ){
					//多套餐
					cmmodityType = this.$parent.union.packageId?2:1;
				}else if( this.$parent.isHasCure ){
					//疗程套装 并且 有选择疗程
					cmmodityType = this.$parent.$route.query.packageId?2 : 1;
				}

				let packageNo = this.$parent.union?(this.$parent.union.packageId?this.$parent.union.packageId : '') : (this.$parent.$route.query.packageId?(this.$parent.isHasCure?this.$parent.$route.query.packageId : '') : '');

				failedRequire({
					memberID: this.$parent.memberId,//会员ID  
					commodityType: cmmodityType,//商品类型。1.普通商品 2.套餐商品
					productID: this.$parent.productData.productID,//商品ID  
					causeoffailure: '',//失败原因  
					packageNo: packageNo,//套餐商品ID  
					sysNo: 'wap'//终端ID
				});
			}else{
				this.$router.go(-1);
			}
		},
		//显示更多
		showMore (){
			this.isShowMore = true;
		},
	}
}
</script>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top:0;
		left:0;
		height: 40px;
		width: 100%;
		z-index: 10;
	}
</style>

