<template>
    <div>
      <h2>Add Cron Job</h2>
      <form @submit.prevent="addNewCron">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" v-model="newCron.name" required>
        </div>
        <div>
          <label for="intervalType">Interval Type</label>
          <select id="intervalType" v-model="newCron.intervalType" required>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
        <div>
          <label for="intervalValue">Interval Value</label>
          <input type="number" id="intervalValue" v-model="newCron.intervalValue" required>
        </div>
        <div>
          <label for="scriptPath">Script Path</label>
          <input type="text" id="scriptPath" v-model="newCron.scriptPath" required>
        </div>
        <div>
          <label for="region">Region (optional)</label>
          <input type="text" id="region" v-model="newCron.region">
        </div>
        <div>
          <label for="tier">Tier (optional)</label>
          <input type="text" id="tier" v-model="newCron.tier">
        </div>
        <div>
          <label for="firstRun">First Run (optional)</label>
          <input type="datetime-local" id="firstRun" v-model="newCron.firstRun">
        </div>
        <button type="submit">Add Cron Job</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  import { useCrons } from '~/composables/backOffice/useCrons';
  
  const { addJob } = useCrons();
  
  const newCron = reactive({
    name: '',
    intervalType: 'minutes',
    intervalValue: 1,
    scriptPath: '',
    region: '',
    tier: '',
    firstRun: ''
  });
  
  const addNewCron = () => {
    addJob(newCron);
  };
  </script>
  