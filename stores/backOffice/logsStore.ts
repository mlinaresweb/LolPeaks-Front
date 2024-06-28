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
    async fetchGlobalLogs(date?: string) {
      const { axiosAdminInstance } = useAxios();
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosAdminInstance.get('/logs/global', {
          params: { date },
        });
        this.globalLogs = response.data.logs;
        // console.log('Fetched global logs:', this.globalLogs); // Debugging line
      } catch (err: any) {
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchTaskLogs(taskName: string, date?: string) {
      const { axiosAdminInstance } = useAxios();
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosAdminInstance.get(`/logs/task/${taskName}`, {
          params: { date },
        });
        this.taskLogs = response.data.logs;
        // console.log('Fetched task logs:', this.taskLogs); // Debugging line
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

