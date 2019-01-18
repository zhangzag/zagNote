import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
		  items: ''
    },
    mutations: {
      setItem (state, data) {
        // Vue.set(state.items, data)
        console.log('mutations里的data: ', data)
        state.items = data;
      }
    },
    actions: {
      fetchItem ({ commit }, data) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        // return fetchItem(data).then(item => {
        //   commit('setItem', data)
        // })
        console.log('actions里的data: ', data)
        commit('setItem', data)
      }
    }
  })
}
