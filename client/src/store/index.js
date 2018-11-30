import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import menuholic from './menuholic'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    menuholic
  }
})

export default store
