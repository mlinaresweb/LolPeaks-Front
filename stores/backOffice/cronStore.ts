import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';

export const useCronStore = defineStore('cronStore', {
    state: () => ({
      crons: [] as any[],
      loading: false,
      error: null as string | null,
    }),
    actions: {
        async fetchCrons() {
            const { axiosAdminInstance } = useAxios();
            this.loading = true;
            this.error = null;
            try {
              const response = await axiosAdminInstance.get('/cron/list');
              console.log('Fetched crons:', response.data); // Log the fetched crons to verify the data
              this.crons = response.data;
              console.log('Updated crons state:', this.crons); // Log the updated state
            } catch (err:any) {
              this.error = err.response ? err.response.data : err.message;
              console.error('Error fetching crons:', this.error);
            } finally {
              this.loading = false;
            }
          },
    async executeJobNow(name: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/execute', { name });
        this.fetchCrons(); // Refresh the list after executing
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error executing job now:', this.error);
      }
    },
    async pauseJob(name: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/pause', { name });
        this.fetchCrons(); // Refresh the list after pausing
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error pausing job:', this.error);
      }
    },
    async resumeJob(name: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/resume', { name });
        this.fetchCrons(); // Refresh the list after resuming
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error resuming job:', this.error);
      }
    },
    async removeJob(name: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.delete(`/cron/remove/${name}`);
        this.fetchCrons(); // Refresh the list after removing
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error removing job:', this.error);
      }
    },
  },
  persist: import.meta.client ? {
    key: 'adminAuth',
    storage: localStorage,
   
  } : undefined,
});
