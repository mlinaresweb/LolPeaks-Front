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
          <label for="scheduleParams">Params (JSON)</label>
          <textarea id="scheduleParams" v-model="scheduleCron.params"></textarea>
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
    params: '',
    executeAt: ''
  });
  
  const scheduleNewCron = () => {
    scheduleJob(scheduleCron);
  };
  </script>
  