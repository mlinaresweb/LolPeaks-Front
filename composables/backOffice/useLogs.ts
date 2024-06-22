import { useLogStore } from '~/stores/backOffice/logsStore';
import { computed } from 'vue';

export function useLogs() {
  const logStore = useLogStore();

  const fetchGlobalLogs = async () => {
    await logStore.fetchGlobalLogs();
  };

  const fetchTaskLogs = async (taskName: string) => {
    await logStore.fetchTaskLogs(taskName);
  };

  return {
    globalLogs: computed(() => logStore.globalLogs),
    taskLogs: computed(() => logStore.taskLogs),
    loading: computed(() => logStore.loading),
    error: computed(() => logStore.error),
    fetchGlobalLogs,
    fetchTaskLogs,
  };
}
