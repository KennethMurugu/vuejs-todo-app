import Vue from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSpinner,
  faExclamationCircle,
  faEdit,
  faTrashAlt,
  faPlusCircle,
  faSync
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSpinner,
  faExclamationCircle,
  faEdit,
  faTrashAlt,
  faPlusCircle,
  faSync
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
import Vuex from 'vuex'

import '@/assets/css/theme.css'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(require('vue-moment'))
Vue.config.devtools = true
Vue.config.productionTip = false
const guestUser = {
  username: 'Guest'
}
export const store = new Vuex.Store({
  state: {
    isAuthenticated: true,
    currentUser: guestUser
  },
  mutations: {
    login(state, user) {
      console.log('state login', user)
      state.isAuthenticated = true
      state.currentUser = user
      console.log('setting isAuthenticated=true', state.isAuthenticated)
      console.log('currentUser', state.currentUser)
    },
    logout(state) {
      state.isAuthenticated = false
      state.currentUser = guestUser
      console.log('setting isAuthenticated=false', state.isAuthenticated)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
