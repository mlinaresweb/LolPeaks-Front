<template>
    <div>
      <h1>Login Admin</h1>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAdminAuthStore } from '~/stores/backOffice/adminAuth';
  
  const username = ref('');
  const password = ref('');
  const adminAuthStore = useAdminAuthStore();
  const router = useRouter();
  
  const login = async () => {
    await adminAuthStore.login(username.value, password.value);
    if (adminAuthStore.isAuthenticated) {
      router.push('/admin');
    }
  };
  </script>
  