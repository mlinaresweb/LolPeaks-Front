<template>
  <LogViewer
    title="Cron Logs"
    :logs="globalLogs"
    :loading="loading"
    :error="error"
    :fetchLogs="fetchGlobalLogs"
    :filters="filters"
    :syntaxHighlight="syntaxHighlight"
  />
</template>

<script setup lang="ts">
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

const { globalLogs, loading, error, fetchGlobalLogs } = useLogs();

const filters: Filter[] = [
  { text: 'Starting Script', value: 'script-start' },
  { text: 'Resumed Cron Job', value: 'cron-resume' },
  { text: 'Added Cron Job', value: 'cron-add' },
  { text: 'Script Error', value: 'script-error' },
  { text: 'Paused Cron Job', value: 'cron-pause' },
  { text: 'Modified Cron Job', value: 'cron-modify' },
  { text: 'Scheduled Cron Job', value: 'cron-schedule' },
];

function syntaxHighlight(logs: string) {
  if (typeof logs !== 'string') {
    return logs;
  }

  const logEntries = logs.split('\n').filter(log => log.trim() !== '');
  const reversedLogEntries = logEntries.reverse();

  return reversedLogEntries.map(log => {
    return log
      .replace(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, '<span class="timestamp">$1</span>')
      .replace(/(Starting script: \w+)/g, '<span class="script-start">$1</span>')
      .replace(/(Resumed cron job: \w+)/g, '<span class="cron-resume">$1</span>')
      .replace(/(Added cron job: \w+ with schedule .*)/g, '<span class="cron-add">$1</span>')
      .replace(/(Error executing script \w+: )/g, '<span class="script-error">$1</span>')
      .replace(/(Paused cron job: \w+)/g, '<span class="cron-pause">$1</span>')
      .replace(/(Modified cron job: \w+ with new schedule .*)/g, '<span class="cron-modify">$1</span>')
      .replace(/(Scheduled cron job: \w+ to run at .*)/g, '<span class="cron-schedule">$1</span>');
  }).join('<br/>');
}

onMounted(() => {
  fetchGlobalLogs();
});
</script>


<style >
.script-start {
  color: #6feb6f; 
}

.cron-resume {
  color: #87ceeb; 
}

.cron-add {
  color: #8e58b4; 
}


.cron-pause {
  color: #ffa500; 
}

.cron-modify {
  color: #238ee6; 
}

.cron-schedule {
  color: #ffd700; 
}
</style>
