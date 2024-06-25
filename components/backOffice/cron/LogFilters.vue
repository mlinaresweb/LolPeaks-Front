<template>
    <div class="filters">
      <label for="filter-text">Filter by text:</label>
      <input id="filter-text" v-model="filterText" @input="applyFilter" type="text" placeholder="Enter text to filter logs" />
  
      <label for="filter-type">Filter by type:</label>
      <select id="filter-type" v-model="filterType" @change="applyFilter">
        <option value="">All</option>
        <option v-for="filter in filters" :key="filter.value" :value="filter.value">{{ filter.text }}</option>
      </select>
  
      <label for="filter-date">Filter by date:</label>
      <input id="filter-date" v-model="filterDate" @input="applyFilter" type="date" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Filter {
    text: string;
    value: string;
  }
  
  const emits = defineEmits(['filterChange']);
  const props = defineProps<{ filters: Filter[] }>();
  
  const filterText = ref('');
  const filterType = ref('');
  const filterDate = ref('');
  
  const applyFilter = () => {
    emits('filterChange', { filterText: filterText.value, filterType: filterType.value, filterDate: filterDate.value });
  };
  </script>
  
  <style scoped>
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .filters label {
    font-weight: bold;
  }
  
  .filters input,
  .filters select {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  