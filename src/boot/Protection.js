import { useAuthStore } from "src/stores/auth";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    authStore.FirstCheck()
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login')
    } else if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  })
}