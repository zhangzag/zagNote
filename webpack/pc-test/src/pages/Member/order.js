require('./style/mem_ind.scss');
require('./style/order.scss');

import { webRoot, curDate, memberId, memberInfo } from '@/assets/js/globalDefine.js';

import { renderHtml, setLazyLoad, getQueryString } from '@/util/util.js';

import { getVipInfo, updateMemberInfo } from 'apis/user.js';

import memleftblockHtml from './memleftblock.hbs';


$(function(){
layui.use('layer',function(){
    //左导航
    let memleftblockHtmlString = renderHtml(memleftblockHtml, { curPageId: 2 });
    $('.member_l_block').html(memleftblockHtmlString);
    
	let flag = false;
	//当前页数
	let page = 1;
	//每页显示的条数
	let limit = 10;
	//按时间搜索订单
	let recentDate = '';
	//按订单编号或商品名称搜索订单
	let orderCodeOrProName = '';
	// 1 待付款 、2 待发货、 3 待发货、4 已完成、5 已取消、 all 全部订单
	let orderTypeStatus =  getQueryString('status') || 'all';

    
});
});





