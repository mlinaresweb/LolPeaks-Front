<template>
  <div class="cron-form-container">
    <h2>Add Cron Job</h2>
    <form @submit.prevent="addNewCron">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newCron.name" required>
      </div>
      <div class="form-group">
        <label for="intervalType">Interval Type</label>
        <select id="intervalType" v-model="newCron.intervalType" required>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
      </div>
      <div class="form-group">
        <label for="intervalValue">Interval Value</label>
        <input type="number" id="intervalValue" v-model="newCron.intervalValue" required>
      </div>
      <div class="form-group">
        <label for="scriptPath">Script Path</label>
        <input type="text" id="scriptPath" v-model="newCron.scriptPath" required>
      </div>
      <div class="form-group">
        <label for="region">Region (optional)</label>
        <input type="text" id="region" v-model="newCron.region">
      </div>
      <div class="form-group">
        <label for="tier">Tier (optional)</label>
        <input type="text" id="tier" v-model="newCron.tier">
      </div>
      <div class="form-group">
        <label for="firstRun">First Run (optional)</label>
        <input type="datetime-local" id="firstRun" v-model="newCron.firstRun">
      </div>
      <button type="submit" class="submit-button">Add Cron Job</button>
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

/* Specific style for datetime-local input icon */
.form-group input[type="datetime-local"] {
  color: #fff;
}

.form-group input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
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
</style>
