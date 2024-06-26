<template>
  <div class="pagination">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-button">
      <span class="circle">
        <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.58L10.83 12l4.58-4.58L14 6l-6 6 6 6z"/></svg>
      </span>
    </button>

    <div class="pages">
      <span
        v-for="page in pages"
        :key="page"
        class="pagination-page"
        :class="{ active: currentPage === page }"
        @click="typeof page === 'number' && goToPage(page)"
      >
        {{ page }}
      </span>
    </div>

    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="pagination-button">
      <span class="circle">
        <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
      </span>
    </button>
  </div>
  <div class="pagination-info">
    Mostrando {{ startItem }}-{{ endItem }} de {{ totalItems }} tareas
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}>();

const emits = defineEmits<{
  (e: 'pageChanged', page: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1);
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems));

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emits('pageChanged', page);
  }
};

const pages = computed(() => {
  const range: (number | string)[] = [];
  const delta = 2;
  const left = props.currentPage - delta;
  const right = props.currentPage + delta;

  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= left && i <= right)) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }

  return range;
});
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 18px;
}

.pagination-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #000; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  opacity: 1; 
}

.pagination-button:disabled {
  opacity: 0.5; 
  cursor: not-allowed;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FDBE3B; 
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

.pages {
  display: flex;
  gap: 0.5rem;
}

.pagination-page {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #fff; 
}

.pagination-page.active {
  color: #FDBE3B; 
  border-radius: 50%;
}

.pagination-info {
  text-align: center;
  margin-top: 0.5rem;
  color: #ccc;
  font-size: 14px;
  margin-bottom: 40px;
}
</style>
