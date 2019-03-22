<template>
    <section id="footer" class="foot">
        <div class="f_top">
        <div class="logins">
            <router-link to="/login">登录</router-link>
            <!-- <router-link to="/login?np=2">注册</router-link> -->
            <!-- 已经登录的时候显示  -->
            <a 
            v-if="$store.state.memberId" 
            href="javascript:;">欢迎您：{{ $store.state.memberInfo.memberName }}</a>
            <a 
            v-if="$store.state.memberId" 
            href="javascript:;"
            @click="singOut">退出</a>
        </div>
        <div class="abouts">
            <router-link to="/">首页</router-link>
            <router-link to="/myinfo/setting?id=1">关于阿康</router-link>
        </div>
        </div>
        <div class="f_bottom">
        <p>订购热线  400-9309-990</p>
        <p>售后专线 020-3705-1000</p>
        <p>copyright？2011-2017 阿康 版权所有</p>
        <p><a href="http://www.miitbeian.gov.cn/ ">粤ICP备16078801号-1</a></p>
        </div>
    </section>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
/*** 底部foot ***/
.foot {
    background-color: #fff;
    //   padding: 0.3125rem;
    padding: 10px;

    .f_top {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-box;
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .logins  {
            width: 160px;
            font-size: 0;
            a:nth-of-type(1) {
                padding-right: 6px;
                border-right: 1px solid #a7a7a7;
            }
            a:nth-of-type(2) {
                padding-left: 6px;
                border-left: 1px solid #c4c4c4;
            }
        }
        .abouts  {
            width: 100px;
            font-size: 0;
            text-align: right;
            a:nth-of-type(1) {
                padding-right: 6px;
                border-right: 1px solid #a7a7a7;
            }
            a:nth-of-type(2) {
                padding-left: 6px;
                border-left: 1px solid #c4c4c4;
            }
        }
        a {
            display: inline-block;
            color: #a7a7a7;
            // font-size: 0.34375rem;
            font-size: 12px;
            // height: 0.3125rem;
            height: 12px;
            line-height: 12px;
        }
    }

    .f_bottom {
        padding-top: 20px;
        padding-bottom: 30px;

        p {
            text-align: center;
            font-size: 10px;
            color: #a7a7a7;
            line-height: 18px;
            a {
                color: #a7a7a7;
            }
        }
    }
}
</style>
