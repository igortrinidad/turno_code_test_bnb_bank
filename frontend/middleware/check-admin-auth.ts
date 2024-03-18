export default defineNuxtRouteMiddleware( async (to, from) => {

  if (process.client && !useUserStore().loggedUser && useUserStore().loggedUser?.role !== 'admin' && to.path !== '/') {
    return await navigateTo('/')
  }

  return
  
})