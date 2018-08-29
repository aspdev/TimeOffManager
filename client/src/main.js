// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Login from './components/Login'
import Register from './components/Register'
import Form from './components/Form'
import Print from './components/Print'
import VueSweetalert2 from 'vue-sweetalert2'
import Reset from './components/Reset'
import AuthenticatePasswordReset from './components/AuthenticatePasswordReset'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

sync(store, router)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (JSON.parse(localStorage.getItem('store'))) {
      const localStore = JSON.parse(localStorage.getItem('store'))
      if (localStore.isUserLoggedIn) {
        next()
      } else {
        next({name: 'Login'})
      }
    } else if (JSON.parse(sessionStorage.getItem('store'))) {
      const sessionStore = JSON.parse(sessionStorage.getItem('store'))
      if (sessionStore.isUserLoggedIn) {
        next()
      } else {
        next({name: 'Login'})
      }
    } else {
      next({name: 'Login'})
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    Login,
    Register,
    Form,
    Print,
    Reset,
    AuthenticatePasswordReset
  },
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  template: '<App/>'
})

// Funkcja jest uruchamiana, kiedykolwiek zmieniają sie wartości zmiennych  w store
store.subscribe((mutation, state) => {
  var customStore = {
    token: state.token,
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn
  }
  if (store._modules.root.state.rememberMe) {
    localStorage.setItem('store', JSON.stringify(customStore))
  } else {
    if (localStorage.getItem('store')) {
      localStorage.removeItem('store')
    }
    sessionStorage.setItem('store', JSON.stringify(customStore))
  }
})
