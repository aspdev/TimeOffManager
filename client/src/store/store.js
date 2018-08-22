import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    dateFrom: null,
    dateTo: null,
    requestDate: null,
    numberOfDays: null,
    rememberMe: false
  },
  mutations: {
    initialiseStore (state) {
      if (localStorage.getItem('store')) {
        var localStore = JSON.parse(localStorage.getItem('store'))
        state.token = localStore.token
        state.user = localStore.user
        state.isUserLoggedIn = !!localStore.token
        this.replaceState(state)
      } else {
        if (sessionStorage.getItem('store')) {
          var sessionStore = JSON.parse(sessionStorage.getItem('store'))
          state.token = sessionStore.token
          state.user = sessionStore.user
          state.isUserLoggedIn = !!sessionStore.token
          this.replaceState(state)
        }
      }
    },
    setToken (state, token) {
      state.token = token
      if (state.token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setDateFrom (state, dateFrom) {
      state.dateFrom = dateFrom
    },
    setDateTo (state, dateTo) {
      state.dateTo = dateTo
    },
    setRequestDate (state, requestDate) {
      state.requestDate = requestDate
    },
    setNumberOfDays (state, numberOfDays) {
      state.numberOfDays = numberOfDays
    },
    setRememberMe (state, rememberMe) {
      state.rememberMe = rememberMe
    }
  },
  actions: {
    setRememberMe ({commit}, rememberMe) {
      commit('setRememberMe', rememberMe)
    },
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setDateFrom ({commit}, dateFrom) {
      commit('setDateFrom', dateFrom)
    },
    setDateTo ({commit}, dateTo) {
      commit('setDateTo', dateTo)
    },
    setRequestDate ({commit}, requestDate) {
      commit('setRequestDate', requestDate)
    },
    setNumberOfDays ({commit}, numberOfDays) {
      commit('setNumberOfDays', numberOfDays)
    }
  }

})
