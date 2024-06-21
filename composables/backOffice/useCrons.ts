import { useCronStore } from '~/stores/backOffice/cronStore';
import { computed } from 'vue';

export function useCrons() {
  const cronStore = useCronStore();

  const fetchCrons = async () => {
    await cronStore.fetchCrons();
  };

  const executeJobNow = async (name: string, scriptPath: string, params: any) => {
    await cronStore.executeJobNow(name, scriptPath, params);
  };

  const pauseJob = async (name: string) => {
    await cronStore.pauseJob(name);
  };

  const resumeJob = async (name: string) => {
    await cronStore.resumeJob(name);
  };

  const removeJob = async (name: string) => {
    await cronStore.removeJob(name);
  };

  const addJob = async (jobDetails: any) => {
    await cronStore.addJob(jobDetails);
  };

  const modifyJob = async (jobDetails: any) => {
    await cronStore.modifyJob(jobDetails);
  };

  const scheduleJob = async (jobDetails: any) => {
    await cronStore.scheduleJob(jobDetails);
  };

  const setEditingCron = (cron: any) => {
    cronStore.setEditingCron(cron);
  };

  return {
    crons: computed(() => cronStore.crons),
    loading: computed(() => cronStore.loading),
    error: computed(() => cronStore.error),
    editingCron: computed(() => cronStore.editingCron),
    fetchCrons,
    executeJobNow,
    pauseJob,
    resumeJob,
    removeJob,
    addJob,
    modifyJob,
    scheduleJob,
    setEditingCron,
  };
}