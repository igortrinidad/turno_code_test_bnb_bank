import { defineStore } from "pinia"
import AuthApiService from "@/services/AuthApiService"

interface ILoggedUser {
  id: number
  name: string
  username: string
  role: string
  created_at: string
  updated_at: string
}

export const useUserStore = defineStore("useUserStore", {
 
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  },

  state: () => ({
    loggedUser: null as null | ILoggedUser,
    loggedUserToken: null,
    isLoading: false,
  }),

  getters: {
  },

  actions: {

    async login(username: string, password: string) {
      if(this.isLoading) return
      this.isLoading = true
      try {
        const { data } = await AuthApiService.login(username, password)
        this.loggedUserToken = data.token
        await this.getLoggedUser()
        if(this.loggedUser?.role === 'admin') {
          await navigateTo('/admin/check')
        } else {
          await navigateTo('/statement')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async getLoggedUser() {
      const { data } = await AuthApiService.getLoggedUser()
      this.loggedUser = data.user
    }
  }
  
})
