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
  
  interface Filter {
    text: string;
    value: string;
  }
  
  interface FilterEvent {
    filterText: string;
    filterType: string;
  }
  
  const props = defineProps<{
    title: string;
    logs: string;
    loading: boolean;
    error: string | null;
    fetchLogs: (arg?: string) => void; // Modify this line
    filters: Filter[];
    syntaxHighlight: (logs: string) => string;
  }>();
  
  const filterText = ref<string>('');
  const filterType = ref<string>('');
  
  const applyFilter = ({ filterText: text, filterType: type }: FilterEvent) => {
    filterText.value = text;
    filterType.value = type;
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
        return true;
      })
      .join('<br/>');
  });
  
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
  