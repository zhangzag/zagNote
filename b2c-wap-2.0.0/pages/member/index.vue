<template>
    <section class="contain">
        <!-- 个人信息 -->
        <div class="my_info">
            <div class="m_img">
                <router-link to="myinfo/info">
                    <img v-lazy="memberInfo?memberInfo.picURL:''"  alt="">
                </router-link>
            </div>
            <router-link class="m_info" to="myinfo/info">
                <em>{{ memberInfo?memberInfo.memberName:'' }}</em>
                <span>{{ memberInfo?(memberInfo.vipGradeName?memberInfo.vipGradeName:'普通会员'):'' }}</span>
            </router-link>
        </div>
        <!-- 个人信息 end -->
        <!-- 订单操作 -->
        <div class="order_fun">
            <a class="item" href="/order/pay">
                <div>
                    <mt-badge size="small" type="error">{{pendingPaymentNum?pendingPaymentNum:'0'}}</mt-badge>
                </div>
                <p>待付款</p>
            </a>
            <div class="line"></div>
            <a class="item wait_send" href="/order/deliver">
                <div></div>
                <p>待发货</p>
            </a>
            <div class="line"></div>
            <a class="item wait_take" href="/order/receive">
                <div></div>
                <p>待收货</p>
            </a>
            <div class="line"></div>
            <a class="item finished" href="/order/complete">
                <div></div>
                <p>已完成</p>
            </a>
        </div>
        <!-- 订单操作 end -->
        <div class="lists all_order">
            <router-link to="/order" ><i></i>全部订单</router-link>	
        </div>
        <div class="lists coupons">
            <router-link to="/coupons" ><i></i>优惠券</router-link>
        </div>
        <div class="lists collect">
            <router-link to="myinfo/collect" ><i></i>我的收藏</router-link>
        </div>
        <div class="lists register">
            <router-link to="myinfo/register" ><i></i>需求登记</router-link>
        </div>
        <div class="lists cfj">
            <router-link to="prescript" ><i></i>处方笺</router-link>
        </div>
        <div class="lists address">
            <router-link to="myinfo/address" ><i></i>收货地址</router-link>
        </div>
        <div class="lists consult ">
            <a href="http://vipwebchat.tq.cn/pageinfo.jsp?version=vip&admiuin=9815275&ltype=1&iscallback=0&page_templete_id=122543&is_message_sms=0&is_send_mail=0&action=acd&acd=1&type_code=123" ><i></i>在线咨询</a>
        </div>
        <div class="lists server">
            <router-link to="myinfo/sale_server" ><i></i>售后服务</router-link>
        </div>
        <div class="lists setup">
            <router-link to="/serve/setting" ><i></i>设置</router-link>
        </div>

    </section>
</template>

<script>
import { mapGetters } from 'vuex'

import Vue from 'vue'
if(process.browser){
const { Badge } = require('mint-ui')

    Vue.component(Badge.name, Badge);
}

export default {
    layout: 'secondPage',
    middleware: 'userAuth',
    // transition: 'fade',
    data (){
        return {
            headTitle: '个人中心',
            pendingPaymentNum: '',//待付款数量
        }
    },
    head (){
        return {
            title: this.headTitle,
            meta: [
                { hid: 'description', name: 'description', content: '阿康大药房，会员中心，个人中心' }
            ]
        }
    },
    computed: {
        ...mapGetters('userModule', ['memberInfo', 'memberId']),
    },
    mounted (){
        console.log('memberInfo: ', this.memberInfo)
        console.log('memberId: ', this.memberId)
    },
}
</script>

<style lang="scss" scoped>
/* my_info */
.my_info {
	height: 2.421875rem;
	background-image: url(~assets/images/my_info_bg.jpg);
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	background-size: cover;
	background-position: center;
	display: flex;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;

	flex-wrap: wrap;
	justify-content: start;
	padding: 0.4375rem 0.3125rem 0 0.3125rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	-o-box-sizing: border-box;
}
.my_info .m_img {
	width: 1.54rem;
	height: 1.54rem;
	border-radius: 50%;
	border: 0.09375rem solid #fff;
	background-color: #65ca90;
	margin-right: 0.15625rem;
	overflow: hidden;
}
.my_info .m_img img {
	width: 100%;
}
.my_info .m_info {
	color: #FFF;
	padding-top: 0.375rem;
	width: 7.43rem;
	background-image: url(~assets/images/my_arr_right.png);
	background-position: right center;
	background-repeat: no-repeat;
	-webkit-background-size: 0.28125rem 0.46875rem;
	background-size: 0.28125rem 0.46875rem;
}
.my_info .m_info>em {
	font-size: 0.46875rem;
	font-weight: normal;
	color:#fff;
	font-style:normal;
	display: block;
}
.my_info .m_info>span {
	font-size: 0.3125rem;
	display: block;
}

/* order_fun */
.order_fun {
	padding: 0.3125rem 0.3125rem;
	background-color: #fff;
	display: box;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	border-bottom: 0.03125rem solid #f0f0f0;
}
.order_fun .line {
	height: 0.78125rem;
	width: 0.03125rem;
	background: #f0f0f0;
}
.order_fun .item {
	width: 2.3125rem;
	font-size: 0.40625rem;
	text-align: center;
	position: relative;
}
.order_fun .item>div {
	width: 0.75rem;
	height: 0.8125rem;
	margin: 0 auto;
	position: relative;
	background-image: url(~assets/images/icnos_orderFun.png);
	background-repeat: no-repeat;
	-webkit-background-size: 1.96875rem 5.59375rem;
	background-size: 2.0rem auto;
	background-position: -0.625rem -1.15625rem;
}
.order_fun .item.wait_send>div {
	background-position: -0.625rem -2.875rem;
}
.order_fun .item.wait_take>div {
	background-position: -0.625rem -4.5625rem;
}
.order_fun .item.finished>div {
	background-position: -0.625rem -6.25rem;
}
.order_fun .item .mint-badge {
    position: absolute;
    font-size: 0.34375rem;
    font-weight: lighter;
    border-radius: 0.21875rem;
    top: -0.21875rem;
    right: -0.21875rem;
}

/*** lists ***/
.lists {
	height: 1.5625rem;
	line-height: 1.5625rem;
	background-color: #fff;
	padding: 0 0.3125rem;
	border-bottom: 0.03125rem solid #f0f0f0;
}
.all_order, .setup {
	border-bottom: 0.3125rem solid #f0f0f0;
}
.lists a {
	font-size: 0.4375rem;
	color: #262626;
	background-image: url(~assets/images/arr_r_my.png);
	background-repeat: no-repeat;
	-webkit-background-size: 0.21875rem;
	background-size: 0.21875rem;
	background-position: right center;
}
.lists a i {
	display: inline-block;
	vertical-align: middle;
	width: 0.6875rem;
	height: 0.6875rem;
	background-image: url(~assets/images/icons_lists.png);
	background-repeat: no-repeat;
	-webkit-background-size: 2.0625rem auto;
	background-size: 2.0625rem auto;
	background-position: -0.6875rem -0.53125rem;
	margin-right: 0.09375rem;
}
.lists.collect a i {
	background-position: -0.6875rem -1.78125rem;
}
.lists.register a i {
	background-position: -0.6875rem -3.0rem;
}
.lists.cfj a i {
	background-position: -0.6875rem -4.21875rem;
}
.lists.address a i {
	background-position: -0.6875rem -5.5rem;
}
.lists.consult a i {
	background-position: -0.6875rem -6.6875rem;
}
.lists.server a i {
	background-position: -0.6875rem -7.9375rem;
}
.lists.setup a i {
	background-position: -0.6875rem -9.15625rem;
}
.lists.coupons a i {
	background-position: -0.6875rem -10.31rem;
}

</style>

