<template>
    <section class="contain">
		<div class="order_tabs" ref="orderTabs">
			<ul>
				<li :class="{cur: selected==='1'}" @click="tabClick('1')">
					<span>全部</span>
				</li>
				<li :class="{cur: selected==='2'}" @click="tabClick('2')">
					<span>待付款</span>
				</li>
				<li :class="{cur: selected==='3'}" @click="tabClick('3')">
					<span>待发货</span>
				</li>
				<li :class="{cur: selected==='4'}" @click="tabClick('4')">
					<span>待收货</span>
				</li>
				<li :class="{cur: selected==='5'}" @click="tabClick('5')">
					<span>已完成</span>
				</li>
				<li :class="{cur: selected==='6'}" @click="tabClick('6')">
					<span>已取消</span>
				</li>
			</ul>
		</div>
		<!-- tab-container -->
		<div v-show="isNothing" id="nothing">
  			<p>
  				<span>还没有相关订单哦</span>
  				<router-link to="/product">去逛逛</router-link>
  			</p>
  		</div>

		<main class="order_items" v-model="selected" id="orderItems" ref="viewBox">
			<!-- 全部 -->
			<section ref="itemCon">
			  <div class="item" v-for="(ol,index) in orderList">
			  	<a href="javascript:;" @click="jumpDetail(ol,index)" >
			      	<div class="item_top">
			      		<span>订单编号：{{ ol.orderCode }}</span>
			      		<span :class="{ c_wran: ol.orderStatus !=5 && ol.orderStatus !=6 && ol.orderStatus !=7 && ol.orderStatus !=8 }">{{ ol.orderStatus | orderStatusFilter }}</span>
			      	</div>
			      	<div class="item_list" v-for="olds in ol.orderDetails">
			      		<div class="list_img">
			      			<img v-lazy="olds.productUrl" alt="">
			      		</div>
			      		<div class="list_info">
			      			<div class="li_top">
			      				<h3>{{ olds.productName }}</h3>
			      				<p>￥{{ olds.amt }}</p>
			      			</div>
			      			<div class="li_bottom">
			  					<span>{{ olds.productProperty }}</span>
			  					<span>{{ olds.qty?'X'+olds.qty:'' }}</span>
			      			</div>
			      		</div>
			      	</div>
			      	<div class="item_counts">
			      		<span>共{{ ol.qty }}件商品</span>
			      		<span>实付款：<i class="r_color">{{ ol.factAmt | priceFilter }}</i></span>
			      	</div>
			  	</a>
			  	<div class="item_btns">
			  		<a href="http://vipwebchat.tq.cn/pageinfo.jsp?version=vip&admiuin=9815275&ltype=1&iscallback=0&page_templete_id=122543&is_message_sms=0&is_send_mail=0&action=acd&acd=1&type_code=123">在线咨询</a>
			  		<mt-button v-if="ol.orderStatus != 8 && ol.orderStatus != 1 && ol.orderStatus != 2 && ol.orderStatus != 3"  @click="jumpExpress(ol)" type="default" size="small" plain>查看物流</mt-button>
			  		<mt-button v-if="ol.orderStatus == 1" type="primary" size="small">支付</mt-button>
			  		<mt-button v-if="ol.orderStatus == 4" @click="takeDelivery(ol)" type="primary" size="small">确认收货</mt-button>
			  	</div>
			  </div>

				<!-- 加载更多动画 -->
				<section class='loadMore' ref="loadMore" style="visibility: visible;">
					<div ref="lm" style="display: block;" v-show="orderList.length>5">
						<mt-spinner type="triple-bounce"></mt-spinner>
					</div>
					<div ref="lmn" style="display: none;">没有更多数据了</div>
				</section>
				<!-- 加载更多动画 end -->
			</section>
		</main>
    </section>
</template>

<script>
import { getOrder } from '@/api/order/'
import { mapGetters } from 'vuex'

export default {
    name: 'order',
    layout: 'secondPage',
    data (){
        return {
            headTitle: '全部订单',
			flag: false,
			selected: '1', //
			isShowMore: false,//显示更多
			isUnscRollable: false, //是否页面不可滚动
			backParentPage: false, //是否回到父页面
			isNothing: false,//是否显示无数据
			pid: this.$route.query.pid,//传递的页面ID
			orderList: [], //订单列表
			curOl: '',//当前选中的订单
			curOrderList: '', //物流查询 当前订单
			limit: 10,//每页显示条数
			page: 1,//当前页数
			noMore: false,//是否没有更多, 到底部时为true
        }
    },
    computed: {
        ...mapGetters('userModule', ['memberInfo', 'memberId']),
    },
    mounted(){
        this.getAllList();
    },
    methods: {
	    //切换tab
	    tabClick(index){ 
	    	if( this.flag || this.selected === index ){return};

			this.selected = index;
			// console.log(123, this.$refs.lm)
			this.$refs.lm.style.display = 'block';
			this.$refs.lmn.style.display = 'none';
			
			switch ( index )
			{
				case '1':
					this.$router.replace({path: '/order/all'});
					break;
				case '2':
					this.$router.replace({path: '/order/pay'});
					break;
				case '3':
					this.$router.replace({path: '/order/deliver'});
					break;
				case '4':
					this.$router.replace({path: '/order/receive'});
					break;
				case '5':
					this.$router.replace({path: '/order/complete'});
					break;
				case '6':
					this.$router.replace({path: '/order/cancel'});
					break;
				default :
					this.$router.replace({path: '/order/all'});
			}
	    },
	    //跳转物流详情
	    jumpExpress ( data ){
	    	// console.log('订单详情：', data)
	    	this.$store.commit('saveOrderInfo', data);
	    	this.$router.push({ path: '/order/express'});
	    	// this.$router.push({ path: '/myinfo/express'});
	    },
	    //跳转订单详情
	    jumpDetail ( data, index ){
	    	// console.log(data)
	    	// return 
	    	// this.curOrderList = data;
	    	this.curOl = index;//当前选中的订单
	    	this.$store.commit('saveOrderInfo', data);

	    	this.$router.push({ path: '/order/'+ this.$route.params.orderType +'/order_detail'});
	    	// this.$router.push({ path: '/myinfo/order_detail', query: {'staus': staus}});
	    	// console.log(this.$store.state.orderInfo)
	    },
	    //确认收货
	    takeDelivery ( item ){
	    	const _self = this;

	    	if( this.flag ){return false}
    		MessageBox.confirm('确定执行此操作?').then(action => {
		    	_self.flag = true;	
		    	_self.$ajax({
		    		url: _self.webRoot + '/order/updateOrderStatusByConfirmReceipt',
		    		data: {
		    			orderId: item.orderID
		    		}
		    	})
		    	.then(function(res){
		    		// console.log(res)
		    		if( !res.data.success ){
		    			_self.$options.methods.showToast( res.data.msg );
		    			_self.flag = false;
		    			return false;
		    		}
					_self.$options.methods.showToast( res.data.msg );
					setTimeout(function(){
						_self.$router.go(0);
						_self.flag = false;
					},1000);

		    	})
		    	.catch(function(err){
		    		console.log(err)
		    	})
	    	}).catch(function(cancel){

	    	});
	    },
	    //获取全部订单
	    getAllList (){
			if( this.flag ){return};
			this.flag = true;

			getOrder({
                app: this,
				data: {
					memberId: this.memberId,
					page: this.page,
					limit: this.limit
				}
			})
			.then((res)=>{
				// console.log(res)
				if( res.success ){
					if(res.data.length == 0){
						if( res.count == 0 ){ 
							this.isNothing = true;
							//清空列表
							this.orderList = []; 
						}
						// _self.$options.methods.showToast('没有更多数据!');
						// console.log('没有更多数据!', _self.$refs.loadMore)
						//显示-隐藏加载动画
						// _self.$refs.loadMore.style.visibility = 'hidden';
						this.$refs.lm.style.display = 'none';
						this.page>1?this.$refs.lmn.style.display = 'block':'';
						this.flag = false;
						return false;
					}
					// _self.orderList = res.data.data;
					for( let i=0; i<res.data.length; i++ ){
						this.orderList.push(res.data[i]);
					}
					//少于5条记录不显示加载动画
					if( res.data.length<5 ){
						this.$refs.lm.style.display = 'none';
					}
					//更改可以加载更多
					this.noMore = false;
					this.flag = false;
				}else{
					this.$options.methods.showToast( res.msg );
					this.flag = false;
				}
			})
			.catch(function(err){
				console.log(err)
			})
	    },
    }
}
</script>

<style lang="scss" scoped>

.contain {
	background-color: #fff;
    height: 100vh;
}

.mint-header {
	z-index: 2;
}

.order_tabs {
	height: 1.5625rem;
	line-height: 1.5625rem;
	border-bottom: 0.03125rem solid #f0f0f0;
	z-index: 2;
	position: fixed;
	top:1.25rem;
	left: 0;
	width: 100%;
}
.order_tabs ul {
	display: box;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;

	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 0.3125rem;
	background-color: #fff;
	max-width: 640px;
	margin: 0 auto;
	box-sizing: border-box;
}
.order_tabs ul li {
	font-size: 0.40625rem;
}
.order_tabs ul li span {
	display: inline-block;
	height: 100%;
	position: relative;
}
.order_tabs ul li.cur {
	color: #278f50;
}
.order_tabs ul li.cur span::after {
	content: '';
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	height: 0.03125rem;
	background-color: #278f50;
}
/* order_items */
.order_items .item {
	background-color: #fff;
	border-bottom: 0.3125rem solid #f0f0f0;
}
.order_items .item:last-of-type {
	border-bottom: 0;
}
.order_items .item .item_top {
	padding: 0 0.3125rem;
	height: 1.25rem;
	line-height: 1.25rem;
	font-size: 0.375rem;
	display: box;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	color: #555
}
.item_list {
	display: box;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0.3125rem;
	background-color: #fafafa;
	margin-bottom: 0.15625rem;
	border-top: 0.03125rem solid #f0f0f0;
	border-bottom: 0.03125rem solid #f0f0f0;
}
.item_list .list_img {
	width: 2.03125rem;
	padding-right: 0.1875rem;
}
.item_list .list_info {
	width: 7.15625rem;
}
.list_info>div {
	display: box;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	font-size: 0.40625rem;
}
.list_info>div>*:first-child {
	width: 5.0rem;
}
.list_info>div>*:last-child {
	width: 1.84375rem;
	padding-left: 0.3125rem;
	text-align: right;
	color: #555
}
.list_info .li_top h3 {
	font-weight: normal;
	font-size: 0.40625rem;
	line-height: 0.46875rem;
	color: #555;
}
.list_info .li_bottom {
	color: #a7a7a7;
	margin-top: 0.25rem;
}
.list_info .li_bottom span:nth-of-type(1) {
	font-size: 0.375rem;
}
.item .item_counts {
	text-align: right;
	padding: 0 0.3125rem;
	height: 0.65625rem;
	border-bottom: 0.03125rem solid #f0f0f0;
	padding-top: 0.125rem;
	font-size: 0.375rem;
	color: #555
}
.item .item_btns {
	padding: 0.25rem 0.3125rem;
	font-size: 0;
	text-align: right;
	border-bottom: 0.03125rem solid #f0f0f0;
}
.item .item_btns .mint-button {
	margin-left: 0.28125rem;
	vertical-align: middle;
}
.item .item_btns>a {
	color: #555;
    border-color: #555;
    font-size: 0.40625rem;
    padding: 0 0.4375rem;
    height: 0.875rem;
    line-height: 0.875rem;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #5a5a5a;
    border-radius: 4px;
}	

/*order_items*/
.order_items {
	overflow: scroll;
    height: 100%;
    padding-top: 1.59375rem;
    box-sizing: border-box;
    z-index: 1;
}

/* loadMore */
.loadMore {
	text-align: center;
	padding: 0.3125rem 0;
}

</style>