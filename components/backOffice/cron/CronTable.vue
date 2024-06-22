<template>
    <div class="table-container">
      <table v-if="crons.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Interval</th>
            <th>Script</th>
            <th>Region</th>
            <th>Tier</th>
            <th>Execution Time</th>
            <th>Last Duration</th>
            <th>Time Until Next Run</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cron in crons" :key="cron.name">
            <td>{{ cron.name }}</td>
            <td>{{ cron.interval }}</td>
            <td>{{ cron.scriptPath }}</td>
            <td>{{ cron.region || '' }}</td>
            <td>{{ cron.tier || '' }}</td>
            <td>{{ cron.executionTime }}</td>
            <td>{{ cron.lastDuration ? formatDuration(cron.lastDuration) : 'N/A' }}</td>
            <td>{{ cron.timeUntilNextRun }}</td>
            <td class="actions">
              <button @click="togglePlayPause(cron.name)">
                {{ cron.isRunning ? 'Pause' : 'Play' }}
              </button>
              <button @click="removeJob(cron.name)">Remove</button>
              <button @click="openEditCronModal(cron)">Edit</button>
              <nuxt-link :to="`/admin/cron/logs/${cron.name}`">
                <button>Logs</button>
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No cron jobs available.</div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    crons: {
      type: Array as PropType<any[]>,
      required: true
    },
    togglePlayPause: {
      type: Function as PropType<(name: string) => void>,
      required: true
    },
    removeJob: {
      type: Function as PropType<(name: string) => void>,
      required: true
    },
    openEditCronModal: {
      type: Function as PropType<(cron: any) => void>,
      required: true
    },
  });
  
  const formatDuration = (duration: number | undefined) => {
    if (!duration) return 'N/A';
    const hrs = Math.floor(duration / 3600).toString().padStart(2, '0');
    const mins = Math.floor((duration % 3600) / 60).toString().padStart(2, '0');
    const secs = (duration % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };
  </script>
  
  <style scoped>
  .table-container {
    width: 100%;
    overflow-x: auto;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #4CAF50;
    color: white;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  tbody tr:hover {
    background-color: #ddd;
  }
  
  .actions button {
    margin-right: 5px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  @media (max-width: 768px) {
    th, td {
      padding: 10px;
    }
  
    .actions button {
      margin-bottom: 5px;
    }
  }
  </style>
  