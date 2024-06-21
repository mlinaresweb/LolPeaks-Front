<template>
    <div>
      <h2>Schedule Cron Job</h2>
      <form @submit.prevent="scheduleNewCron">
        <div>
          <label for="scheduleName">Name</label>
          <input type="text" id="scheduleName" v-model="scheduleCron.name" required>
        </div>
        <div>
          <label for="scheduleScriptPath">Script Path</label>
          <input type="text" id="scheduleScriptPath" v-model="scheduleCron.scriptPath" required>
        </div>
        <div>
          <label for="region">Region (optional)</label>
          <input type="text" id="region" v-model="scheduleCron.region">
        </div>
        <div>
          <label for="tier">Tier (optional)</label>
          <input type="text" id="tier" v-model="scheduleCron.tier">
        </div>
        <div>
          <label for="executeAt">Execute At</label>
          <input type="datetime-local" id="executeAt" v-model="scheduleCron.executeAt" required>
        </div>
        <button type="submit">Schedule Cron Job</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  import { useCrons } from '~/composables/backOffice/useCrons';
  
  const { scheduleJob } = useCrons();
  
  const scheduleCron = reactive({
    name: '',
    scriptPath: '',
    region: '',
    tier: '',
    executeAt: ''
  });
  
  const scheduleNewCron = () => {
    scheduleJob(scheduleCron);
  };
  </script>
  