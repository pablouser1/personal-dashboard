import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultConfig = {
  background: '',
  search: 'google',
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
    },
    setDashboard (state, newDashboard) {
      state.dashboard = newDashboard
    },
    setSearch (state, newSearch) {
      state.search = newSearch
    }
  },
  actions: {
  },
  modules: {
  }
})
