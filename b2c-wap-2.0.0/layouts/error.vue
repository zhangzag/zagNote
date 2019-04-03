<template>
  <div>
    <!-- <h1 v-if="error.statusCode === 404">页面不存在</h1> -->
    <main v-if="error.statusCode === 404">
        <img src="~assets/images/404.png" alt="页面出错了">

        <mt-button @click="goBack" size="large" type="default">返回上一页</mt-button>
        <mt-button @click="goHome" size="large" type="primary">返回首页</mt-button>
    </main>

    <h1 v-else>应用发生错误异常 -- {{error.statusCode}}</h1>
    <!-- <nuxt-link to="/">首 页</nuxt-link> -->
  </div>
</template>

<script>
export default {
  name: 'error',
  props: ['error'],
  layout: 'secondPage',
  data (){
      return {
        headTitle: '错误了'  
      }
  },
  created (){
    if( this.error.statusCode == 404 ){
        this.headTitle = '未找到页面'
    }else{
        this.headTitle = '出错了'
    }
  },
  mounted (){
    //   console.log(454545)
  }
}
</script>

<style lang="scss" scoped>
	main {
        padding: 0.46875rem;
        
        &>img {
            margin-bottom: 0.9375rem;
        }
        &>button {
            margin-bottom:0.46875rem;
        }
	}
</style>
