import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { addLayout } from 'nuxt/kit';

export const useAdminAuthStore = defineStore('adminAuth', {
  state: () => ({
    isAuthenticated: false,
    token: '' as string | null,
  }),
  actions: {
    async login(username: string, password: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.post('/auth/login', { username, password });
        if (response.status === 200 && response.data.token) {
          this.token = response.data.token;
          this.isAuthenticated = true;

          if (this.token) {
            Cookies.set('auth_token', this.token, { expires: 7, secure: true });
            console.log('Token set in cookies:', this.token);
          }
        } else {
          this.isAuthenticated = false;
          this.token = null;
        }
      } catch (error) {
        this.isAuthenticated = false;
        this.token = null;
      }
    },
    async logout() {
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.post('/auth/logout');
        if (response.status === 200) {
          this.isAuthenticated = false;
          this.token = null;
          Cookies.remove('auth_token');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
    checkAuth() {

      const token = Cookies.get('auth_token');
      console.log('Token from cookies:', token); // Log del token obtenido de las cookies
      this.isAuthenticated = !!token;
      if (token) {
        this.token = token;
      } else {
        this.token = null;
      }
    },
    redirectToLogin(reload = false) {
      if (reload) {
        window.location.href = '/admin/login';
      } else {
        const router = useRouter();
        router.replace('/admin/login');
      }
    }
  },
  persist: typeof window !== 'undefined' ? {
    key: 'adminAuth',
    storage: window.localStorage,
    paths: ['isAuthenticated', 'token'],
  } : undefined,
});
