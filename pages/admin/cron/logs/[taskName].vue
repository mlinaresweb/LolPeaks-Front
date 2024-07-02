<template>
  <LogViewer
    :title="`Logs for Task: ${taskName}`"
    :logs="taskLogs"
    :loading="loading"
    :error="error"
    :fetchLogs="fetchLogs"
    :filters="filters"
    :syntaxHighlight="syntaxHighlight"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useLogs } from '~/composables/backOffice/useLogs';
import LogViewer from '~/components/backOffice/cron/logs/LogViewer.vue';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
});

interface Filter {
  text: string;
  value: string;
}

const route = useRoute();
const taskName = route.params.taskName as string;

const { taskLogs, loading, error, fetchTaskLogs } = useLogs();

const filters: Filter[] = [
  { text: 'Processing', value: 'processing' },
  { text: 'Error', value: 'error' },
  { text: 'Waiting', value: 'waiting' },
  { text: 'Update', value: 'update' },
  { text: 'Game Type', value: 'game-type' },
  { text: 'Completed', value: 'completed' },
  { text: 'Invoker', value: 'invoker' },
];

const fetchLogs = (date:any) => {
  // console.log('Fetching logs with date:', date); // Debugging line
  fetchTaskLogs(taskName, date);
}

function syntaxHighlight(logs: string) {
  if (typeof logs !== 'string') {
    return logs;
  }

  const logEntries = logs.split('\n').filter(log => log.trim() !== '');
  const reversedLogEntries = logEntries.reverse();

  return reversedLogEntries.map(log => {
    return log
      .replace(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '<span class="timestamp">$1</span>')
      .replace(/(Procesando .+)/g, '<span class="processing">$1</span>')
      .replace(/(Error .+)/g, '<span class="script-error">$1</span>')
      .replace(/(Esperando .+)/g, '<span class="waiting">$1</span>')
      .replace(/(Actualización .+)/g, '<span class="update">$1</span>')
      .replace(/(tipo de juego: .+)/g, '<span class="game-type">$1</span>')
      .replace(/(Procesando nuevos juegos .+)/g, '<span class="processing">$1</span>')
      .replace(/(Completado .+)/g, '<span class="completed">$1</span>')
      .replace(/(invocador .+)/g, '<span class="invoker">$1</span>');
  }).join('<br/>');
}


onMounted(() => {
  fetchTaskLogs(taskName, new Date().toISOString().split('T')[0]); // Call fetchTaskLogs with today's date by default
});
</script>


<style >

.processing {
  color: #87ceeb; 
}


.waiting {
  color: #ffa500; 
}

.update {
  color: #238ee6; 
}

.game-type {
  color: #ffd700; 
}

.completed {
  color: #6feb6f; 
}

.invoker {
  color: #8e58b4; 
}
</style>
