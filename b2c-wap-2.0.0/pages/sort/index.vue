<template>
    <section class="contain">
        <!-- 搜索 -->
		<div class="sort_search">
			<form action="javascript:;" @click="jumpSearch">
				<div class="search">	
					<input 
						type="text" 
						placeholder="请输入药品" 
						v-model="searchCon"
						@keyup="searchKeyup" />
					<i v-if="isShowX" @click.stop="clearAll"></i>
				</div>
				<button type="submit"></button>
			</form>
		</div>

		<div class="sort_con" ref="wrapper">
			<div class="s_left">
				<ul :style="{ height: wrapperHeight + 'px' }">
					<li 
						:class="{ 'cur': index+1==curKs }"
						v-for=" (list,index) in allSortList "
						@click="nextSort( list, index )"
                        :key="list.productTypeID">
						<span>{{ list.productTypeName }}</span>
						<div class="sort_childs">
							<div class="sort_two" v-for=" (listTwo,index) in list.productTypeList" :key="listTwo.productTypeID">
								<div 
									class="sort_two_head"
									@click="jumpProduct(listTwo,index)">{{ listTwo.productTypeName }}</div>
								<div class="sort_three" v-for="(listThree,index) in listTwo.products" :key="listThree.productTypeID">
									<a href="javascript:;" @click="jumpDetail(listThree)" v-text="listThree.currentName">	
									</a>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
    </section>
</template>

<script>
import { getSort } from '@/api/sort/'

export default {
    layout: 'secondPage',
    async asyncData({app, params}) {
        let allSortList = [];

        await getSort({app})
        .then(res=>{
            // console.log(res)
			if( res.data.length>0 ){
                for( let val of res.data ){
                    allSortList.push( val );
                }
            }
        })
        .catch(err=>{
            console.log('获取分类失败，', err)
        })

        return {allSortList}
    },
    data (){
        return {
            headTitle: '全部分类',
			isShowX: false, //是否显示清除按钮
			searchCon: '', //搜索内容
			ks: [], //第一级分类
			curKs: 1, //当前科室序号
			childSort: [], //二级分类
			parentName: '',//二级分类的父级
			allSortList: [],//分类数据
			wrapperHeight: '',
        }
    },
    mounted (){
        
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        //跳转到详情页
        // jumpDetail,
        //跳到搜索页
        jumpSearch (){
            // this.$router.replace({ path: '/search' });
            this.$router.push({ path: '/search' });
            // this.$router.go(-1);
        },
        //跳转商品列表
        jumpProduct (cs,index){
            // console.log(cs,index)
            this.$router.push({ path: '/product', query: { ptId: cs.productTypeID } })
        },
        // 点击查看下级分类
        nextSort ( item, index ){
            const _self = this;

            this.curKs = index+1; //当前科室
            // this.$axios({
            //     url: '/productType/getAllTwoLevelProductType',
            //     method: 'post',
            //     data: { parentTypeID: item.productTypeID }
            // }).then(function(res){
            //     // console.log(res)
            //     _self.parentName = item.productTypeName; //父级
            //     _self.childSort = res.data;
            // });
        },
        //监听搜索
        searchKeyup (){ 
            // console.log()
            if( !this.searchCon ){
                this.isShowX = true;
            }
        },
        //清除所有内容
        clearAll (){ 
            this.searchCon = '';
            this.isShowX = false;
        },
    },
}
</script>

<style lang="scss" scoped>
    .sort_search {
        height: 49px;
        line-height: 50px;
        border-top: 1px solid #dadada;
        background-color: #fcfcfc;
        form {
            display: flex;
            justify-content: space-between;
            padding: 10px 10px 0;
            .search {
                width: 272px;
                height: 30px;
                line-height: 30px;
                position: relative;
                input {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    background-color: #f2f2f2;
                    padding: 0 20px 0 10px;
                    color: #a7a7a7;
                    font-size: 14px;
                    box-sizing: border-box;
                    border-radius: 30px;
                }
            }
            button {
                width: 26px;
                height: 30px;
                border: 0;
                background: url('~assets/images/icon_search.png') no-repeat;
                background-size: 18px auto;
                background-position: 100%;
                padding: 0;
            }
        }
    }

    .sort_con {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        height: 100%;
        padding-bottom: 50px;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        
        .s_left {
            width: 100%;
            position: relative;

            ul {
                border-top: 1px solid #f0f0f0;
                overflow: scroll;
                height: 100%;
                background-color: #fff;
            }
            li {
                width: 98px;
                height: 44px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 12px;
                border-left: 3px solid #dadada;
                &.cur {
                    background-color: #fff;
                    color: #262626;
                    border-left-color: #0f904e;
                    span {
                        background-color: #fff;
                    }
                    .sort_childs {
                        display: block;
                    }
                }
                &>span {
                    width: 95px;
                    height: 44px;
                    line-height: 44px;
                    padding-left: 10px;
                    display: block;
                    background-color: #dadada;
                }
            }
        }
    }

    .sort_childs {
        background-color: #fff;
        position: absolute;
        width: 222px;
        height: 100%;
        z-index: 9;
        top: 0;
        right: 0;
        display: none;
        overflow: scroll;
        color: #262626;
    }
    .sort_two_head {
        height: 34px;
        border-top: 1px solid #f0f0f0;
        padding-left: 10px;
        padding-top: 10px;
        font-size: 12px;
        color: #262626;
    }
    .sort_three {
        width: 74px;
        height: 50px;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        display: inline-block;

        a {
            width: 100%;
            word-break: break-all;
            color: gray;
            font-size: 12px;
            text-align: left;
            max-height: 1.5625rem;
        }
    }
</style>