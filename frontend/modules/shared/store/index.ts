import { defineStore } from "pinia"

export const useSharedStore = defineStore("useSharedStore", {

  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  },
  
  state: () => ({
    menuIsOpen: false,
    pageTitle: null,
    navColor: null,
  }),

  getters: {
  },

  actions: {
    toggleMenuIsOpen(force: boolean | null = null) {
      if(force !== null) {
        this.menuIsOpen = force
        return
      }
      this.menuIsOpen = !this.menuIsOpen
    }

  }
  
})
