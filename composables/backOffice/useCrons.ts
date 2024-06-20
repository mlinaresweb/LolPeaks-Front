import { useCronStore } from '~/stores/backOffice/cronStore';

export function useCrons() {
  const cronStore = useCronStore();

  const fetchCrons = async () => {
    await cronStore.fetchCrons();
    console.log('Crons after fetch in composable:', cronStore.crons);
  };

  const executeJobNow = async (name: string) => {
    await cronStore.executeJobNow(name);
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

  return {
    crons: computed(() => cronStore.crons),
    loading: computed(() => cronStore.loading),
    error: computed(() => cronStore.error),
    fetchCrons,
    executeJobNow,
    pauseJob,
    resumeJob,
    removeJob,
  };
}
