import { useLogStore } from '~/stores/backOffice/logsStore';
import { computed } from 'vue';

export function useLogs() {
  const logStore = useLogStore();

  const fetchGlobalLogs = async (date?: string) => {
    await logStore.fetchGlobalLogs(date);
  };

  const fetchTaskLogs = async (taskName: string, date?: string) => {
    // console.log(`Fetching logs for task ${taskName} with date ${date}`); // Debugging line
    await logStore.fetchTaskLogs(taskName, date);
    // console.log('Fetched task logs:', logStore.taskLogs); // Debugging line
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
