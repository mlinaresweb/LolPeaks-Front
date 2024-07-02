<template>
  <div class="filters">
    <input id="filter-text" v-model="filterText" @input="applyFilter" type="text" placeholder="Enter text to filter logs" />
    <select id="filter-type" v-model="filterType" @change="applyFilter">
      <option value="">All</option>
      <option v-for="filter in filters" :key="filter.value" :value="filter.value">{{ filter.text }}</option>
    </select>
    <input id="filter-date" v-model="filterDate" @input="applyFilter" type="date" :min="minDate" :max="maxDate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { format, subDays } from 'date-fns';

interface Filter {
  text: string;
  value: string;
}

const emits = defineEmits(['filterChange']);
const props = defineProps<{ filters: Filter[] }>();

const filterText = ref('');
const filterType = ref('');
const filterDate = ref('');

// Calculate the date range for the last 30 days
const today = new Date();
const minDate = ref(format(subDays(today, 30), 'yyyy-MM-dd'));
const maxDate = ref(format(today, 'yyyy-MM-dd'));

// Set the default filterDate to today's date
onMounted(() => {
  filterDate.value = format(today, 'yyyy-MM-dd');
  applyFilter();
});

const applyFilter = () => {
  // console.log('Applying filter with date:', filterDate.value); // Debugging line
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
  @media (max-width: 992px) {
    .filters {
      flex-direction: column;
  }
  }
  </style>
  