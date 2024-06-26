<template>
  <div class="filters">
    <input type="text" v-model="searchQuery" @input="applyFilters" placeholder="Search by name" />
    <select v-model="selectedIntervalOrder" @change="applyFilters">
      <option value="">Order by Interval</option>
      <option value="asc">Interval: Low to High</option>
      <option value="desc">Interval: High to Low</option>
    </select>
    <select v-model="selectedDurationOrder" @change="applyFilters">
      <option value="">Order by Duration</option>
      <option value="asc">Duration: Low to High</option>
      <option value="desc">Duration: High to Low</option>
    </select>
    <select v-model="selectedScript" @change="applyFilters" class="script-select">
      <option value="">All Scripts</option>
      <option v-for="script in uniqueScripts" :key="script" :value="script" class="script-option">{{ script }}</option>
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
  onFilterChange: (filters: {
    searchQuery: string;
    selectedIntervalOrder: string;
    selectedDurationOrder: string;
    selectedScript: string;
  }) => void;
}>();

const { formatDuration } = useCrons();

const searchQuery = ref('');
const selectedIntervalOrder = ref('');
const selectedDurationOrder = ref('');
const selectedScript = ref('');

const uniqueScripts = computed(() => Array.from(new Set(props.crons.map(cron => cron.scriptPath))));

watch([searchQuery, selectedIntervalOrder, selectedDurationOrder, selectedScript], () => {
  applyFilters();
});

const applyFilters = () => {
  props.onFilterChange({
    searchQuery: searchQuery.value,
    selectedIntervalOrder: selectedIntervalOrder.value,
    selectedDurationOrder: selectedDurationOrder.value,
    selectedScript: selectedScript.value,
  });
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  background-color: #292929;
  padding: 1rem;
  border-radius: 8px;
}

.filters input,
.filters select {
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #dcdcdc;
  min-width: 150px;
}

.filters input::placeholder {
  color: #888;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  .filters select {
    max-width: 100%;
  }
  .filters select option {
    white-space: normal;
    max-width: 150px;
  }
}
</style>
