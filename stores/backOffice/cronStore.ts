import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';

export const useCronStore = defineStore('cronStore', {
    state: () => ({
      crons: [] as any[],
      loading: false,
      error: null as string | null,
      editingCron: null as any | null,
    }),
    actions: {
        async fetchCrons() {
            const { axiosAdminInstance } = useAxios();
            this.loading = true;
            this.error = null;
            try {
              const response = await axiosAdminInstance.get('/cron/list');
              console.log('Fetched crons:', response.data); 
              this.crons = response.data;
              await this.updateCronsRunningStatus();
              console.log('Updated crons state:', this.crons); 
            } catch (err:any) {
              this.error = err.response ? err.response.data : err.message;
              console.error('Error fetching crons:', this.error);
            } finally {
              this.loading = false;
            }
          },
          async updateCronsRunningStatus() {
            const { axiosAdminInstance } = useAxios();
            for (const cron of this.crons) {
              try {
                const response = await axiosAdminInstance.get(`/cron/is-running/${cron.name}`);
                cron.isRunning = response.data.isRunning;
              } catch (err: any) {
                cron.isRunning = false;
              }
            }
          },
          async executeJobNow(name: string, scriptPath: string, params: any) {
            const { axiosAdminInstance } = useAxios();
            try {
              await axiosAdminInstance.post('/cron/execute', { name, scriptPath, ...params });
              this.fetchCrons();
            } catch (err:any) {
              this.error = err.response ? err.response.data : err.message;
              console.error('Error executing job now:', this.error);
            }
          },
          
    async pauseJob(name: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/pause', { name });
        this.fetchCrons(); 
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error pausing job:', this.error);
      }
    },
    async resumeJob(name: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/resume', { name });
        this.fetchCrons();
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error resuming job:', this.error);
      }
    },
    async removeJob(name: string) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.delete(`/cron/remove/${name}`);
        this.fetchCrons(); 
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error removing job:', this.error);
      }
    },
    async addJob(jobDetails: any) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/add', jobDetails);
        this.fetchCrons(); 
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error adding job:', this.error);
      }
    },
    async modifyJob(jobDetails: any) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/modify', jobDetails);
        this.fetchCrons(); 
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error modifying job:', this.error);
      }
    },
    async scheduleJob(jobDetails: any) {
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/cron/schedule', jobDetails);
        this.fetchCrons(); 
      } catch (err:any) {
        this.error = err.response ? err.response.data : err.message;
        console.error('Error scheduling job:', this.error);
      }
    },
    setEditingCron(cron: any) {
      const intervalMatch = cron.interval.match(/(\d+)\s*(\w+)/);
      const intervalValue = intervalMatch ? parseInt(intervalMatch[1], 10) : 1;
      const intervalType = intervalMatch ? intervalMatch[2] : 'minutes';
    
      this.editingCron = {
        ...cron,
        intervalValue,
        intervalType,
        region: cron.region || '',
        tier: cron.tier || '',
      };
    }
    
  },
  persist: import.meta.client ? {
    key: 'cronStore',
    storage: localStorage,
   
  } : undefined,
});
