export default defineNuxtRouteMiddleware( async (to, from) => {

  if (process.client && !useUserStore().loggedUser && to.path !== '/') {
    return await navigateTo('/')
  }

  return
  
})