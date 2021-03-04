import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultConfig = {
  background: '',
  dashboard: []
}

export default new Vuex.Store({
  state: defaultConfig,
  mutations: {
    setConfig (state, config) {
      for (const [key, value] of Object.entries(config)) {
        state[key] = value
      }
    },
    setBackground (state, newBackground) {
      state.background = newBackground
    }
  },
  actions: {
  },
  modules: {
  }
})
