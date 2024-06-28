<template>
  <div>
    <h1 class="title-logs">{{ title }}</h1>
    <LogFilters :filters="filters" @filterChange="applyFilter" />
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <pre v-else v-html="filteredLogs"></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import LogFilters from '~/components/backOffice/cron/LogFilters.vue';
import { format, parseISO, isSameDay } from 'date-fns';

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
const filterDate = ref<string>(format(new Date(), 'yyyy-MM-dd'));

const applyFilter = ({ filterText: text, filterType: type, filterDate: date }: FilterEvent) => {
  filterText.value = text;
  filterType.value = type;
  filterDate.value = date;
  // console.log('Filter applied with date:', date); // Debugging line
  props.fetchLogs(date);
};

watch(filterDate, (newDate) => {
  // console.log('Date changed to:', newDate); // Debugging line
  props.fetchLogs(newDate);
});

const formattedLogs = computed(() => {
  // console.log('Formatted logs:', props.logs); // Debugging line
  return props.syntaxHighlight(props.logs);
});

const filteredLogs = computed(() => {
  // console.log('Filtered logs before processing:', formattedLogs.value); // Debugging line
  return formattedLogs.value
    .split('<br/>')
    .filter(log => {
      // console.log('Log before filter:', log); // Debugging line
      if (filterText.value && !log.includes(filterText.value)) {
        // console.log('Filter text not matched:', filterText.value); // Debugging line
        return false;
      }
      if (filterType.value && !log.includes(`class="${filterType.value}"`)) {
        // console.log('Filter type not matched:', filterType.value); // Debugging line
        return false;
      }
      if (filterDate.value) {
        const logDateMatch = log.match(/(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}.\d{3}Z/);
        if (logDateMatch) {
          const logDate = logDateMatch[1];
          // console.log('Log date:', logDate, 'Filter date:', filterDate.value); // Debugging line
          if (logDate !== filterDate.value) {
            return false;
          }
        }
      }
      return true;
    })
    .join('<br/>');
});

onMounted(() => {
  props.fetchLogs(filterDate.value); // Call fetchLogs with the default date
});
</script>







  <style >
  .title-logs {
    color: #FDC33B;
  }
  
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    background: #292929;
    color: #dcdcdc;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #333;
    max-height: 600px;
    overflow-y: auto;
    font-family: 'Courier New', Courier, monospace;
  }
  
  pre::-webkit-scrollbar {
    width: 12px;
  }
  
  pre::-webkit-scrollbar-track {
    background: #1e1e1e;
    border-radius: 5px;
  }
  
  pre::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
    border: 3px solid #1e1e1e;
  }
  
  pre::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  
  .timestamp {
    color: #888;
  }
  
  .script-error {
    color: red;
    font-weight: bold;
  }
  
  </style>
  