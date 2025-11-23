import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    currentUser: (state) => state.user,
  },
  actions: {
    registerAct(userInformation) {
      this.isLoggedIn = true
      this.user = userInformation
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('user', JSON.stringify(userInformation))
    },
    loginAct(userInformation) {
      this.isLoggedIn = true
      this.user = userInformation
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('user', JSON.stringify(userInformation))
    },
    logedOutAct() {
      this.isLoggedIn = false
      this.user = null
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
    },
    FirstCheck() {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const user = localStorage.getItem('user')
      if (isLoggedIn && user) {
        this.isLoggedIn = isLoggedIn
        this.user = user
      }
    },
  },
})


