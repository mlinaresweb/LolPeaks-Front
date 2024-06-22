<template>
  <div>
    <h1>Admin Page</h1>
    <p v-if="isAuthenticated">Bienvenido, Admin.</p>
    <p v-else>No tienes acceso a esta página.</p>

    <div v-if="isAuthenticated">
      <h2>Cron Jobs</h2>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>

      <button @click="showAddCronModal = true">Add Cron Job</button>
      <button @click="showScheduleCronModal = true">Schedule Cron Job</button>

      <CronTableFilters
        :crons="crons"
        @FilterChange="handleFilterChange"
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

      <Modal v-if="showScheduleCronModal" @close="showScheduleCronModal = false">
        <ScheduleCronJob @close="showScheduleCronModal = false" />
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CronTableFilters from '~/components/backOffice/cron/cronTableFilters.vue';
import { useAdminAuthStore } from '~/stores/backOffice/adminAuth';
import { useCrons } from '~/composables/backOffice/useCrons';
import AddCronJob from '~/components/backOffice/cron/AddCronJob.vue';
import EditCronJob from '~/components/backOffice/cron/EditCronJob.vue';
import ScheduleCronJob from '~/components/backOffice/cron/ScheduleCronJob.vue';
import Modal from '~/components/backOffice/generics/Modal.vue';
import CronTable from '~/components/backOffice/cron/CronTable.vue';
import CronTablePagination from '~/components/backOffice/cron/CronTablePagination.vue';

definePageMeta({
  layout: 'admin'
});

const adminAuthStore = useAdminAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => adminAuthStore.isAuthenticated);

const { crons, loading, error, fetchCrons, executeJobNow, pauseJob, resumeJob, removeJob, setEditingCron } = useCrons();

const showAddCronModal = ref(false);
const showEditCronModal = ref(false);
const showScheduleCronModal = ref(false);

const filters = ref({
  searchQuery: '',
  selectedInterval: '',
  selectedScript: '',
  selectedLastDuration: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(10);

const filteredCrons = computed(() => {
  return crons.value.filter(cron => {
    return (
      (filters.value.searchQuery ? cron.name.includes(filters.value.searchQuery) : true) &&
      (filters.value.selectedInterval ? cron.interval === filters.value.selectedInterval : true) &&
      (filters.value.selectedScript ? cron.scriptPath === filters.value.selectedScript : true) &&
      (filters.value.selectedLastDuration ? cron.lastDuration === parseInt(filters.value.selectedLastDuration) : true)
    );
  });
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
  adminAuthStore.checkAuth();
  if (isAuthenticated.value) {
    fetchCrons();
  } else {
    router.push('/admin/login');
  }
});
</script>

<style scoped>
/* Estilos para la página de administración */
</style>
