<template>
    <div class="filters">
      <input type="text" v-model="searchQuery" @input="applyFilters" placeholder="Search by name" />
      <select v-model="selectedInterval" @change="applyFilters">
        <option value="">All Intervals</option>
        <option v-for="interval in uniqueIntervals" :key="interval" :value="interval">{{ interval }}</option>
      </select>
      <select v-model="selectedScript" @change="applyFilters">
        <option value="">All Scripts</option>
        <option v-for="script in uniqueScripts" :key="script" :value="script">{{ script }}</option>
      </select>
      <select v-model="selectedLastDuration" @change="applyFilters">
        <option value="">All Durations</option>
        <option v-for="duration in uniqueDurations" :key="duration" :value="duration">{{ formatDuration(duration) }}</option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import { useCrons } from '~/composables/backOffice/useCrons';
  
  interface Cron {
    name: string;
    interval: string;
    scriptPath: string;
    region?: string;
    tier?: string;
    executionTime?: string;
    lastDuration?: number;
    timeUntilNextRun?: string;
    isRunning?: boolean;
  }
  
  const props = defineProps<{
    crons: Cron[];
    onFilterChange: (filters: { searchQuery: string; selectedInterval: string; selectedScript: string; selectedLastDuration: string }) => void;
  }>();
  
  const { formatDuration } = useCrons();
  
  const searchQuery = ref('');
  const selectedInterval = ref('');
  const selectedScript = ref('');
  const selectedLastDuration = ref('');
  
  const uniqueIntervals = computed(() => Array.from(new Set(props.crons.map(cron => cron.interval))));
  const uniqueScripts = computed(() => Array.from(new Set(props.crons.map(cron => cron.scriptPath))));
  const uniqueDurations = computed(() => Array.from(new Set(props.crons.map(cron => cron.lastDuration))));
  
  watch([searchQuery, selectedInterval, selectedScript, selectedLastDuration], () => {
    applyFilters();
  });
  
  const applyFilters = () => {
    props.onFilterChange({
      searchQuery: searchQuery.value,
      selectedInterval: selectedInterval.value,
      selectedScript: selectedScript.value,
      selectedLastDuration: selectedLastDuration.value
    });
  };
  </script>
  
  <style scoped>
  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .filters input,
  .filters select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>
  