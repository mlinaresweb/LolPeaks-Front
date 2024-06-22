<template>
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import {computed } from 'vue';
  
  const props = defineProps<{
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
  }>();
  
  const emits = defineEmits<{
    (e: 'pageChanged', page: number): void;
  }>();
  
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      emits('pageChanged', page);
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  