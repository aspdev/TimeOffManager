import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Form from '@/components/Form'
import Print from '@/components/Print'
// import store from '@/store/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/form',
      name: 'Form',
      component: Form,
      meta: {requiresAuth: true}
    },
    {
      path: '/print',
      name: 'Print',
      component: Print,
      meta: {requiresAuth: true}
    },
    {
      path: '/',
      name: 'Form',
      component: Form,
      meta: {requiresAuth: true}
    }
  ]
})
