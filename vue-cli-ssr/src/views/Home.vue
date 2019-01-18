<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>hot loading test</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <ul>
    	<li v-for="item in listItems">{{ item.productName }} --- </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { pro } from '@/api/product'

export default {
  name: 'home',
  asyncData ({ store, route }) {
  	console.log(1233)
  	pro()
  	.then(res=>{
  		console.log(111, res)
  		let list = res.data.data;
	    
	    // 触发 action 后，会返回 Promise
	    return store.dispatch('fetchItem', list)
  	})
  	.catch(err=>{
  		console.log(err)
  	});
  },
  data (){
    console.log(21233)
  	return {
  		list: this.$store.state.items,
  	}
  },
  computed: {
    listItems (){
      return this.$store.state.items;
    }
  },
  components: {
    HelloWorld
  },
  created(){
  	// pro()
  	// .then(res=>{
  	// 	console.log(res)
  	// 	// this.list = res.data.data;
  	// })
  	// .catch(err=>{
  	// 	console.log(err)
  	// });
    pro()
    .then(res=>{
      let list = res.data.data;
      console.log('获取数据：', res.data.data)
      // 触发 action 后，会返回 Promise
      this.$store.dispatch('fetchItem', res.data.data)
    })
    .catch(err=>{
      console.log(err)
    });
  },
  mounted (){
    console.log('vuex: ', this.$store.state)
  }
}
</script>
