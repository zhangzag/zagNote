<template>
    <section class="contain">
        
        <!-- 售后服务列表 -->
        <div class="server_list setting_list" v-if="showId=='0'">
            <div>
                <!-- <mt-cell to="tel:400-930-9990" value="400-930-9990" title="服务热线" is-link> -->
                <mt-cell value="400-930-9990" title="服务热线" is-link>
                    <a href="tel:400-930-9990" solt="-">400-930-9990</a>
                </mt-cell>
            </div>
            <div @click="showPage('1')"><mt-cell title="关于我们" is-link></mt-cell></div>
        </div>
        <!-- 售后服务列表 end -->

        <!-- 商品签收 -->
        <div class="pro_sigh" v-if="showId=='1'">
            <!-- <p>阿康健康药房网始终致力于慢病药房的建设，为了给更多的慢病患者带来最便捷的药品供应，和优质的慢病药学服务，拥有实体门店更有保障</p>
            <h3 style="line-height: 0.75rem;padding: 0 0.375rem;">门店信息：</h3>
            <div style="font-size: 0.375rem;line-height: 0.75rem;margin-bottom: 0.75rem;padding: 0 0.375rem;">
                广州总店地址：广东省广州市越秀区中山三路店（省人民医院对面）
                <br>
                <br>
                广州先烈南路店地址：广东省广州市越秀区青龙坊139号（中山肿瘤医院附近）
                广州番禺店地址：广东省广州市番禺区桥南街福愉东路39号（番禺中心医院对面）
                <br>
                <br>
                江门分店地址：广东省江门市蓬江区锦桥雅苑街2幢109室（江门中心医院附近）
                <br>
                <br>
                揭阳分店地址：广东省揭阳市榕城区东环城路以东临江南路以南岭南明珠一期30-31（揭阳市人民医院附近）
                <br>
                <br>
                梅州店地址：广东省梅州市中高峰广梅路17号一楼（黄塘医院对面）
                <br>
                <br>
                广州花都人民医院店：广东省广州市花都区新华镇新华路79号101号铺
                <br>
                <br>
                广东阿康药店连锁有限公司六十七店：广东省广州市越秀区瑶台西街221号101房
                <br>
                <br>
                广东阿康药店连锁有限公司六十九店：广东省广州市花都区秀全街马溪村12队市场自编28号首层
                <br>
                <br>
                广东阿康药店连锁有限公司从化分店：广东省广州市从化区江埔街利源路91、93号
                <br>
                <br>
                广东阿康药店连锁有限公司温泉分店：广东省广州市从化区温泉镇碧泉路一横街二巷之3号104房
                <br>
                <br>
                广东阿康药店连锁有限公司城郊分店：广东省广州市从化区明珠工业园区明珠大道中路95号之一、之二
                <br>
                <br>
                广州市天河区武警总医院分店：广东省广州市天河区燕岭路268号首层
                <br>
                <br>
                广东阿康药店连锁有限公司中山大学第二附属医院分店：广东省广州市海珠区盈丰路英豪花园临街铺面
                <br>
                <br>
                广东阿康药店连锁有限公司广东省中医院分店：广东省广州市越秀区海珠中路电力公司宿舍临街铺面
                <br>
                <br>
                更多分店地址，请致电400-930-9990咨询！
            </div> -->
            <img v-for="(item, index) in aboutImgs" :key='index' v-lazy="item.advertisementPhoto" alt="">
        </div>
        <!-- 商品签收 end -->
    </section>
</template>

<script>
import { curDate } from '@/utils/utils.js'
import { searchAdvs } from '@/api/recommend/'

export default {
    name: 'setting',
    layout: 'secondPage',
    async asyncData({app}) {
        let aboutImgs = [];
    
        await searchAdvs({app, data: {
            endDate: curDate,
            pageNo: 'aboutAk',
            isValid: 1
        }})
        .then(res=>{
            if( res.success ){
                for(let val of res.data){
                    this.aboutImgs.push(val)
                }
            }
        })
        .catch(err=>{
            console.log('获取阿康图片出错了， ', err)
        })

        return {aboutImgs}
    },
    data (){
        return {
            headTitle: '设置',
			isShowMore: false, // 是否显示更多
			showId: this.$route.query.id || '0', //显示的服务详情ID
			isDetailPage: false,// 是否打开服务详情
			aboutImgs: [],//关于阿康图片
        }
    },
    mounted (){
		if( this.showId == 1 ){
			this.headTitle = '关于我们';
			// this.showId = pageId ;

			//获取关于我们的广告内容
		    this.getAboutAdv();
		}
    },
    methods: {
		// 显示服务详情
		showPage (pageId){
			const _self = this;

			if( pageId == '1' ){ 
				this.headTitle = '关于我们';
				this.showId = pageId ;
			}
			this.isDetailPage = true;
		},
    }
}
</script>
