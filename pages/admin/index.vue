<template>
    <div>
      <h1>Admin Page</h1>
      <p v-if="isAuthenticated">Bienvenido, Admin.</p>
      <p v-else>No tienes acceso a esta página.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAdminAuthStore } from '~/stores/backOffice/adminAuth';
  
  definePageMeta({
        layout: 'admin'
      })

  const adminAuthStore = useAdminAuthStore();
  const router = useRouter();
  
  const isAuthenticated = computed(() => adminAuthStore.isAuthenticated);
  
  onMounted(() => {
    adminAuthStore.checkAuth();
    if (!isAuthenticated.value) {
      router.push('/admin/login');
    }
  });
  </script>
  