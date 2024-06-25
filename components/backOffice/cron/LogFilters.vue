<template>
    <div class="filters">
      <input id="filter-text" v-model="filterText" @input="applyFilter" type="text" placeholder="Enter text to filter logs" />
      <select id="filter-type" v-model="filterType" @change="applyFilter">
        <option value="">All</option>
        <option v-for="filter in filters" :key="filter.value" :value="filter.value">{{ filter.text }}</option>
      </select>
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
  
  .filters input,
  .filters select {
    padding: 5px;
    border: 1px solid #555;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
  }
  
  .filters input::placeholder {
    color: #888;
  }
  
  .filters input[type="date"] {
    color: #fff;
    background-color: #333;
  }
  
  .filters input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
  
  .filters select {
    color: #fff;
    background-color: #333;
  }
  </style>
  