<template>
  <section class="container">
    <div>
      <mt-button type="default">default</mt-button>
      <p>store --- {{num}}</p>
      <p>用户 --- {{user}}</p>

      <nuxt-link to="/product">商品页</nuxt-link>

      <nuxt-link to="/member">会员中心</nuxt-link>


      <ul class="333333333333333333333333333333">
        <li v-for="(item, index) in asyncList">{{item.productName}}</li>
      </ul>
      <hr/>
      <hr/>
      <hr/>
      <ul class="7777777777777777777777777777">
        <li v-for="(item, index) in list">{{item.productName}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    asyncData ({ app, params }){
      return app.$axios({
        url: '/product/getProductList',
        method: 'post',
        data: {
          page: 1,
          limit: 20,
          sysNo: 'wap'
        }
      })
        .then(res=>{
          // console.log(321, res.data)
          let asyncList = [];
          for(let val of res.data){
            asyncList.push(val)
          }
          return { asyncList }
        })
        .catch(err=>{console.log(321,err)});
    },
    data (){
      return {
        list: [],
        asyncList: [],
        title: '云药库-首页'
      }
    },
    head (){
      return {
        title: this.title,
        meta: [
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },
    components: {

    },
    computed: {
      ...mapState({
        num: state=>state.num
      }),
      ...mapState('userModule', {
        user: state=>state.user
      }),
    },
    mounted(){
      let a = 111;
      this.$Toast('提示信息');
      // this.$axios({
      //     url: '/product/getProductList',
      //     method: 'post',
      //     data: {
      //         page: 1,
      //         limit: 20,
      //         sysNo: 'wap'
      //     }
      // })
      // .then(res=>{
      //   console.log(321, res)
      // })
      // .catch(err=>{console.log(321,err)});

      // getPro({})
      // .then(res=>{
      //   console.log('获取列表: ', res)
      //   for(let val of res.data.data){
      //     this.list.push(val)
      //   }
      // })
      // .catch(err=>{
      //   console.log('出错了', err)
      // })
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

<style lang="scss">
  .test {
    height: 31px;
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }
</style>
