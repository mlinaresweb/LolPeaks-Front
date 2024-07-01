<template>
  <div class="cron-form-container">
    <h2>Edit Cron Job</h2>
    <form @submit.prevent="modifyExistingCron">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="editingCron.name" required >
      </div>
      <div class="form-group">
        <label for="intervalType">Interval Type</label>
        <select id="intervalType" v-model="editingCron.intervalType" required>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
      </div>
      <div class="form-group">
        <label for="intervalValue">Interval Value</label>
        <input type="number" id="intervalValue" v-model="editingCron.intervalValue" required>
      </div>
      <div class="form-group">
        <label for="scriptPath">Script Path</label>
        <input type="text" id="scriptPath" v-model="editingCron.scriptPath" required>
      </div>
      <div class="form-group">
        <label for="region">Region (optional)</label>
        <input type="text" id="region" v-model="editingCron.region">
      </div>
      <div class="form-group">
        <label for="tier">Tier (optional)</label>
        <input type="text" id="tier" v-model="editingCron.tier">
      </div>
      <div class="form-group">
        <label for="firstRun">First Run (optional)</label>
        <input type="datetime-local" id="firstRun" v-model="editingCron.firstRun">
      </div>
      <button type="submit" class="submit-button">Modify Cron Job</button>
    </form>
  </div>
</template>
  
  <script setup lang="ts">
  import { watch } from 'vue';
  import { useCrons } from '~/composables/backOffice/useCrons';

  const emit = defineEmits(['close']);
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
    newRegion: editingCron.value.region || '',
    newTier: editingCron.value.tier || '',
    newFirstRun: editingCron.value.firstRun,
  });
  emit('close');
};

  </script>
  <style scoped>
  .cron-form-container {
    color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
  }
  
  h2 {
    color: #FDBE3B;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    background-color: #1e1e1e;
    color: #fff;
    box-sizing: border-box;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #FDBE3B;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #FDBE3B;
    color: #000;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #e0a823;
  }
  .form-group input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
  </style>