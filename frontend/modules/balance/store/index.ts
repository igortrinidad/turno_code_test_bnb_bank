import { defineStore } from "pinia"
import BalanceApiService from '@/services/BalanceApiService'

export const useBalanceStore = defineStore("useBalanceStore", {

  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  },

  state: () => ({
    incomes: 0,
    expenses: 0,
    available: 0,
    pending: 0,
    isLoading: false
  }),

  getters: {
  },

  actions: {
    async getBalance() {
      this.isLoading = true
      try {
        const { data } = await BalanceApiService.get()
        this.incomes = data.incomes
        this.expenses = data.expenses
        this.available = data.available
        this.pending = data.pending
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }

  }
  
})
