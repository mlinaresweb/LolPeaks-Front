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

      <table v-if="crons.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Interval</th>
            <th>Script</th>
            <th>Region</th>
            <th>Tier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cron in crons" :key="cron.name">
            <td>{{ cron.name }}</td>
            <td>{{ cron.interval }}</td>
            <td>{{ cron.scriptPath }}</td>
            <td>{{ cron.region || 'N/A' }}</td>
            <td>{{ cron.tier || 'N/A' }}</td>
            <td>
              <button @click="handleExecuteJobNow(cron.name, cron.scriptPath, cron.region, cron.tier)">Execute Now</button>
              <button @click="pauseJob(cron.name)">Pause</button>
              <button @click="resumeJob(cron.name)">Resume</button>
              <button @click="removeJob(cron.name)">Remove</button>
              <button @click="openEditCronModal(cron)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No cron jobs available.</div>
    </div>

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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuthStore } from '~/stores/backOffice/adminAuth';
import { useCrons } from '~/composables/backOffice/useCrons';
import AddCronJob from '~/components/backOffice/cron/AddCronJob.vue';
import EditCronJob from '~/components/backOffice/cron/EditCronJob.vue';
import ScheduleCronJob from '~/components/backOffice/cron/ScheduleCronJob.vue';
import Modal from '~/components/backOffice/generics/Modal.vue';

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

const openEditCronModal = (cron) => {
  setEditingCron(cron);
  showEditCronModal.value = true;
};

const handleExecuteJobNow = (name, scriptPath, region, tier) => {
  executeJobNow(name, scriptPath, { region, tier });
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
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
