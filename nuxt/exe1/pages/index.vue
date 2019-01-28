<template>
  <section class="container">
    {{datas}}
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  asyncData (context){
    console.log(123, axios)
    return axios({
      url: 'http://192.168.2.254:8080/AKGW-api/v1/productType/getProductTypeList'
    })
    .then(res=>{
      // console.log(res)
      return { datas: res.data.data }
    })
  },
  data (){
    return {
      datas: '没有数据'
    }
  },
  components: {
    Logo
  },
  mounted (){
    
  },
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
