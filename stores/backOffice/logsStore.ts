import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';

export const useLogStore = defineStore('logStore', {
  state: () => ({
    globalLogs: '' as string,
    taskLogs: '' as string,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchGlobalLogs() {
      const { axiosAdminInstance } = useAxios();
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosAdminInstance.get('/logs/global');
        this.globalLogs = response.data.logs; 
      } catch (err: any) {
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchTaskLogs(taskName: string) {
      const { axiosAdminInstance } = useAxios();
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosAdminInstance.get(`/logs/task/${taskName}`);
        this.taskLogs = response.data.logs; 
      } catch (err: any) {
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    }
  },
  persist: import.meta.client ? {
    key: 'logStore',
    storage: localStorage,
  } : undefined,
});
