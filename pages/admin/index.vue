<template>
    <div>
      <h1>Admin Page</h1>
      <p v-if="isAuthenticated">Bienvenido, Admin.</p>
      <p v-else>No tienes acceso a esta página.</p>
  
      <div v-if="isAuthenticated">
        <h2>Cron Jobs</h2>
        <div v-if="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>
        <table v-if="crons.length">
          <thead>
            <tr>
              <th>Name</th>
              <th>Interval</th>
              <th>Script</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cron in crons" :key="cron.name">
              <td>{{ cron.name }}</td>
              <td>{{ cron.interval }}</td>
              <td>{{ cron.scriptPath }}</td>
              <td>
                <button @click="executeJobNow(cron.name)">Execute Now</button>
                <button @click="pauseJob(cron.name)">Pause</button>
                <button @click="resumeJob(cron.name)">Resume</button>
                <button @click="removeJob(cron.name)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No cron jobs available.</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAdminAuthStore } from '~/stores/backOffice/adminAuth';
  import { useCrons } from '~/composables/backOffice/useCrons';
  
  definePageMeta({
    layout: 'admin'
  })
  
  const adminAuthStore = useAdminAuthStore();
  const router = useRouter();
  
  const isAuthenticated = computed(() => adminAuthStore.isAuthenticated);
  
  const { crons, loading, error, fetchCrons, executeJobNow, pauseJob, resumeJob, removeJob } = useCrons();
  
  onMounted(() => {
    adminAuthStore.checkAuth();
    if (isAuthenticated.value) {
      fetchCrons();
    } else {
      router.push('/admin/login');
    }
  });
  
  console.log('Crons in component:', crons);
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
  