<template>
    <div>
      <h1>{{ title }}</h1>
      <LogFilters :filters="filters" @filterChange="applyFilter" />
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <pre v-else v-html="filteredLogs"></pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref, computed, onMounted } from 'vue';
  import LogFilters from '~/components/backOffice/cron/LogFilters.vue';
  import { format, parseISO } from 'date-fns';
  
  interface Filter {
    text: string;
    value: string;
  }
  
  interface FilterEvent {
    filterText: string;
    filterType: string;
    filterDate: string;
  }
  
  const props = defineProps<{
    title: string;
    logs: string;
    loading: boolean;
    error: string | null;
    fetchLogs: (arg?: string) => void;
    filters: Filter[];
    syntaxHighlight: (logs: string) => string;
  }>();
  
  const filterText = ref<string>('');
  const filterType = ref<string>('');
  const filterDate = ref<string>('');
  
  const applyFilter = ({ filterText: text, filterType: type, filterDate: date }: FilterEvent) => {
    filterText.value = text;
    filterType.value = type;
    filterDate.value = date;
  };
  
  const formattedLogs = computed(() => {
    return props.syntaxHighlight(props.logs);
  });
  
  const filteredLogs = computed(() => {
    return formattedLogs.value
      .split('<br/>')
      .filter(log => {
        if (filterText.value && !log.includes(filterText.value)) {
          return false;
        }
        if (filterType.value && !log.includes(`class="${filterType.value}"`)) {
          return false;
        }
        if (filterDate.value) {
          const logDateMatch = log.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/);
          if (logDateMatch) {
            const logDate = format(parseISO(logDateMatch[0]), 'yyyy-MM-dd');
            if (logDate !== filterDate.value) {
              return false;
            }
          }
        }
        return true;
      })
      .join('<br/>');
  });
  
  function syntaxHighlight(logs: string) {
    if (typeof logs !== 'string') {
      return logs;
    }
  
    const logEntries = logs.split('\n').filter(log => log.trim() !== '');
    const reversedLogEntries = logEntries.reverse();
  
    return reversedLogEntries.map(log => {
      return log
        .replace(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/g, (_, date) => {
          const formattedDate = format(parseISO(date), 'yyyy-MM-dd HH:mm:ss');
          return `<span class="timestamp">${formattedDate}</span>`;
        })
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
    props.fetchLogs();
  });
  </script>
  
  <style>
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    background: #1e1e1e;
    color: #dcdcdc;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #333;
    max-height: 600px;
    overflow-y: auto;
    font-family: 'Courier New', Courier, monospace;
  }
  
  .timestamp {
    color: #888;
  }
  
  .script-error {
    color: red;
    font-weight: bold;
  }
  
  </style>
  