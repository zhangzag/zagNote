require('./style/mem_ind.scss');

import { webRoot, curDate, memberId, memberInfo } from '@/assets/js/globalDefine.js';

import { renderHtml, setLazyLoad } from '@/util/util.js';

import { getFavorite, getRequire, getPrescription, getVipInfo } from 'apis/user.js';
import { getOrderCount } from 'apis/order.js';

import memleftblockHtml from './memleftblock.hbs';


$(function(){
    
    layui.use('layer',function(){
        //左导航
        let memleftblockHtmlString = renderHtml(memleftblockHtml, { curPageId: 1 });
        $('.member_l_block').html(memleftblockHtmlString);

        //获取会员信息
        if(memberInfo){
            // console.log('memberInfo: ', memberInfo)
            let now = new Date(),
                hour = now.getHours();
            
            //会员名称
            let memberName = '';
            if( hour < 9 ){
                memberName = memberInfo.memberName + '<span>早安，新的一天又开始了~</span>';
            }else{
                memberName = memberInfo.memberName;
            }
            $('.mcb_info h3').html(memberName);
            //会员头像
            if( memberInfo.picURL ){
                $('.mcb_img').html( `<img class="lazy" data-original=${memberInfo.picURL} title="我的头像" />` );
                setLazyLoad({
                    el: '.mcb_img img'
                });
            }
            //会员等级
            $('.vip_grade').html( memberInfo.vipGradeName?memberInfo.vipGradeName:'普通会员' );
            //性别
            $('.mcb_infor .sex').html( memberInfo.sex?memberInfo.sex:'保密' );
            //生日
            $('.mcb_infor .bir').html( memberInfo.birthday?memberInfo.birthday:'未填写' )
        }else{
            getVipInfo({
            id: memberId
            })
            .then(res=>{
                // console.log('获取会员信息：', res)
                if(!res || res.msg==="鉴权验证不通过！"){
                    layer.msg('获取会员信息失败', { icon: 2, time: 1000 },function(){ window.location.href= "/"; });
                    return;
                }
            
                let domain = window.location.host;
                domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
                //储存会员信息
                Cookies.set('_mi', JSON.stringify( res ), { expires: 7, path: '/', domain: domain });
                layer.msg('阿康欢迎您！', { icon: 1, time: 1000 },function(){ window.location.href= "/"; });
            })
            .catch(err=>{
            console.log('获取会员信息出错，', err)
            layer.msg('获取会员信息出错', { icon: 2, time: 1000 },function(){ window.location.href= "/"; });
            });
        }

        //获取我的收藏
        getFavorite({
            memberId: memberId
        })
        .then(res=>{
            // console.log('获取我的收藏: ', res)
            if( res.success ){
                $('.num_collect').html(res.date.length);
            }else{
                console.log(res.msg)
            }
        })
        .catch(err=>{
            console.log('获取我的收藏出错，', err);
        });

        //获取我的需求
        getRequire({
            memberId: memberId
        })
        .then(res=>{
            // console.log('获取我的需求: ', res)
            if( res.success ){
                $('.num_need').html(res.data.length);
            }else{
                console.log(res.msg)
            }
        })
        .catch(err=>{
            console.log('获取我的需求出错，', err);
        });

        // 我的处方笺记录
        getPrescription({
            memberId: memberId
        })
        .then(res=>{
            // console.log('我的处方笺记录: ', res)
            if( res.success ){
                $('.num_cjf').html(res.data.length);
            }else{
                console.log(res.msg)
            }
        })
        .catch(err=>{
            console.log('我的处方笺记录出错，', err);
        });

        //我的订单
        getOrderCount({
            memberId: memberId
        })
        .then(res=>{
            console.log('我的订单: ', res)
            if (res.success) {
                let datas = res.data[0];
                let numWait = datas.obligation; //待付款 
                let numWsend = datas.sendTheGoods; //待发货 
                let numWget = datas.waitForReceiv; //待收货 
                let numFinish = datas.complete; //已完成 
                let numCancel = datas.cancel; //已取消 

                //更新各状态数量
                $('.num_wait').text('(' + numWait + ')');
                $('.num_wsend').text('(' + numWsend + ')');
                $('.num_wget').text('(' + numWget + ')');
                $('.num_finish').text('(' + numFinish + ')');
                $('.num_cancel').text('(' + numCancel + ')');
            };
        })
        .catch(err=>{
            console.log('我的订单出错，', err);
        });
    });
});





