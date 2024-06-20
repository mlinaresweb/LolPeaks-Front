import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import Cookies from 'js-cookie';

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
        console.log('Login response:', response); // Log de la respuesta

        if (response.status === 200 && response.data.token) {
          console.log('Response data token:', response.data.token); // Verificar token en la respuesta
          this.token = response.data.token;
          this.isAuthenticated = true;
          console.log('Token received:', this.token); // Log del token recibido

          if (this.token) {
            Cookies.set('auth_token', this.token, { expires: 7, secure: true });
            console.log('Token set in cookies'); // Log cuando se guarda la cookie

            // Guardar en localStorage
            localStorage.setItem('adminAuth', JSON.stringify({
              isAuthenticated: this.isAuthenticated,
              token: this.token
            }));
            console.log('LocalStorage set:', localStorage.getItem('adminAuth')); // Verificar el almacenamiento
          }
        } else {
          console.error('Login failed: No token received', response.data); // Log de error detallado
          this.isAuthenticated = false;
          this.token = null;
        }
      } catch (error) {
        console.error('Error logging in:', error);
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
          localStorage.removeItem('adminAuth');
          console.log('LocalStorage after logout:', localStorage.getItem('adminAuth')); // Verificar el almacenamiento
        } else {
          console.error('Logout failed:', response.data.message || 'Unknown error'); // Log de error detallado
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

      // Verificar si hay datos en localStorage
      const storedData = localStorage.getItem('adminAuth');
      console.log('Stored data in localStorage:', storedData);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.isAuthenticated = parsedData.isAuthenticated;
        this.token = parsedData.token;
      }
    },
  },
  persist: import.meta.client ? {
    key: 'adminAuth',
    storage: localStorage,
    paths: ['isAuthenticated', 'token'],
  } : undefined,
});
