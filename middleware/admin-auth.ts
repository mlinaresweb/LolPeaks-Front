import { defineNuxtRouteMiddleware } from '#app';
import { useAdminAuthStore } from '~/stores/backOffice/adminAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const adminAuthStore = useAdminAuthStore();
    adminAuthStore.checkAuth();

    if (!adminAuthStore.isAuthenticated && to.path !== '/admin/login') {
      console.log('Redirigiendo a /admin/login');
      adminAuthStore.redirectToLogin(true);
    }
  }
});
