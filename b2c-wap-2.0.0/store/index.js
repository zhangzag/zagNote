import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './user/' 

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        counter: 0,
        num: 1001
    },
    mutations: {
        increment (state) {
            state.counter++
        }
    },
    modules: {
        userModule
    }
})

export default store