<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required>
        </div>
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
  const router = useRouter();
  const adminAuthStore = useAdminAuthStore();
  
  const login = async () => {
    await adminAuthStore.login(username.value, password.value);
    if (adminAuthStore.isAuthenticated) {
      router.push('/admin');
    }
  };
  </script>
  