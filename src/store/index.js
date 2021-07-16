import Vue from 'vue'
import Vuex from 'vuex'
import city from '@/data/city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city
  },
  mutations: {
    selectCity (state, newCity) {
      state.city = {...newCity}
    }
  },
  actions: {
    changeCity ({ commit }, payload) {
      commit('selectCity', payload)
    }
  },
  getters: {
    
  },
  modules: {
  }
})
