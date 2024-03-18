// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    }
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://127.0.0.1:8000',
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },

  piniaPersistedstate: {
    storage: 'localStorage'
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  }

})
