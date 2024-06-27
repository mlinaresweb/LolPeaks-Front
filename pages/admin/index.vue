<template>
  <div>
    <h1>Admin Page</h1>
    <p >Bienvenido, Admin.</p>
    <div >
      <h2>Cron Jobs</h2>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>

      <button class="add-cron-button" @click="showAddCronModal = true">Add Cron Job</button>

      <CronTableFilters
        :crons="crons"
        @filterChange="handleFilterChange"
      />

      <CronTable
        :crons="paginatedCrons"
        :togglePlayPause="togglePlayPause"
        :removeJob="removeJob"
        :openEditCronModal="openEditCronModal"
      />

      <CronTablePagination
        :totalItems="filteredCrons.length"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
        @pageChanged="handlePageChange"
      />

      <Modal v-if="showAddCronModal" @close="showAddCronModal = false">
        <AddCronJob @close="showAddCronModal = false" />
      </Modal>

      <Modal v-if="showEditCronModal" @close="showEditCronModal = false">
        <EditCronJob @close="showEditCronModal = false" />
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CronTableFilters from '~/components/backOffice/cron/cronTableFilters.vue';
import { useCrons } from '~/composables/backOffice/useCrons';
import AddCronJob from '~/components/backOffice/cron/AddCronJob.vue';
import EditCronJob from '~/components/backOffice/cron/EditCronJob.vue';
import Modal from '~/components/backOffice/generics/Modal.vue';
import CronTable from '~/components/backOffice/cron/CronTable.vue';
import CronTablePagination from '~/components/backOffice/cron/CronTablePagination.vue';
// Aplicar el middleware de autenticación
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',

});
const router = useRouter();


const { crons, loading, error, fetchCrons, executeJobNow, pauseJob, resumeJob, removeJob, setEditingCron } = useCrons();

const showAddCronModal = ref(false);
const showEditCronModal = ref(false);

const filters = ref({
  searchQuery: '',
  selectedIntervalOrder: '',
  selectedDurationOrder: '',
  selectedScript: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(10);

const filteredCrons = computed(() => {
  let result = [...crons.value];

  if (filters.value.searchQuery) {
    result = result.filter(cron =>
      cron.name.toLowerCase().includes(filters.value.searchQuery.toLowerCase())
    );
  }

  if (filters.value.selectedScript) {
    result = result.filter(cron => cron.scriptPath === filters.value.selectedScript);
  }

  if (filters.value.selectedIntervalOrder) {
    result.sort((a, b) => {
      const intervalA = parseInt(a.interval, 10);
      const intervalB = parseInt(b.interval, 10);
      if (filters.value.selectedIntervalOrder === 'asc') {
        return intervalA - intervalB;
      } else {
        return intervalB - intervalA;
      }
    });
  }

  if (filters.value.selectedDurationOrder) {
    result.sort((a, b) => {
      const durationA = a.lastDuration || 0;
      const durationB = b.lastDuration || 0;
      if (filters.value.selectedDurationOrder === 'asc') {
        return durationA - durationB;
      } else {
        return durationB - durationA;
      }
    });
  }

  return result;
});

const paginatedCrons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCrons.value.slice(start, end);
});

const handleFilterChange = (newFilters: any) => {
  filters.value = newFilters;
  currentPage.value = 1;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const openEditCronModal = (cron: any) => {
  setEditingCron(cron);
  showEditCronModal.value = true;
};

const togglePlayPause = async (name: string) => {
  const cron = crons.value.find(c => c.name === name);
  if (cron.isRunning) {
    await pauseJob(name);
  } else {
    await resumeJob(name);
  }
};

onMounted(() => {
 
    fetchCrons();
  
});

</script>

<style scoped>
.add-cron-button {
  background-color: #FDBE3B; 
  color: #000; 
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.add-cron-button:hover {
  background-color: #e0a828; 
}
</style>
