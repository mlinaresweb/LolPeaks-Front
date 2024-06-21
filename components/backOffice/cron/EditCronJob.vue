<template>
    <div>
      <h2>Edit Cron Job</h2>
      <form @submit.prevent="modifyExistingCron">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" v-model="editingCron.name" required disabled>
        </div>
        <div>
          <label for="intervalType">Interval Type</label>
          <select id="intervalType" v-model="editingCron.intervalType" required>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
        <div>
          <label for="intervalValue">Interval Value</label>
          <input type="number" id="intervalValue" v-model="editingCron.intervalValue" required>
        </div>
        <div>
          <label for="scriptPath">Script Path</label>
          <input type="text" id="scriptPath" v-model="editingCron.scriptPath" required>
        </div>
        <div>
          <label for="region">Region (optional)</label>
          <input type="text" id="region" v-model="editingCron.region">
        </div>
        <div>
          <label for="tier">Tier (optional)</label>
          <input type="text" id="tier" v-model="editingCron.tier">
        </div>
        <div>
          <label for="firstRun">First Run (optional)</label>
          <input type="datetime-local" id="firstRun" v-model="editingCron.firstRun">
        </div>
        <button type="submit">Modify Cron Job</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { watch } from 'vue';
  import { useCrons } from '~/composables/backOffice/useCrons';
  
  const { editingCron, modifyJob } = useCrons();
  
  watch(() => editingCron.value, (newVal) => {
    if (newVal) {
      editingCron.value.intervalType = newVal.intervalType || editingCron.value.intervalType || 'minutes';
      editingCron.value.intervalValue = newVal.intervalValue || editingCron.value.intervalValue || 1;
    }
  }, { immediate: true });
  
  const modifyExistingCron = () => {
    modifyJob({
      name: editingCron.value.name,
      newIntervalType: editingCron.value.intervalType,
      newIntervalValue: editingCron.value.intervalValue,
      newScriptPath: editingCron.value.scriptPath,
      newRegion: editingCron.value.region,
      newTier: editingCron.value.tier,
      newFirstRun: editingCron.value.firstRun,
    });
  };
  </script>
  