import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index'
import { sync } from 'vuex-router-sync'
import routes from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import auth from '@websanova/vue-auth'
import tinymce from 'vue-tinymce-editor'

Vue.use(VueRouter)
Vue.component('tinymce', tinymce)
// Vue.http.options.root = process.env.API

Vue.router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build.env.VUE_ROUTER_MODE
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// Sync Vuex and vue-router;
sync(store, Vue.router)

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = process.env.API
// Vue.axios.defaults.headers.common = {
//   'X-Requested-With': 'XMLHttpRequest'
// }

Vue.router.beforeEach((to, from, next) => {
  if (to.meta) {
    store.commit('menuholic/updatePageMeta', to.meta)
  }

  next()
})

Vue.use(auth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  fetchData: { url: '/check', method: 'GET', enabled: false },
  refreshData: { url: '/auth/refresh', method: 'GET', enabled: false },
  rolesVar: 'role'
})

export default Vue.router
