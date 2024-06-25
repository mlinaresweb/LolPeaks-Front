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
            <span @click="togglePlayPause(cron.name)" class="icon">
              <svg v-if="!cron.isRunning" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"><path id="XMLID_87_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M236.949,177.721 l-108,67.499c-2.426,1.517-5.186,2.28-7.949,2.28c-2.502,0-5.006-0.624-7.272-1.88c-4.769-2.643-7.728-7.667-7.728-13.12v-135 c0-5.453,2.959-10.476,7.728-13.12c4.769-2.644,10.598-2.49,15.222,0.4l108,67.501c4.386,2.741,7.05,7.548,7.05,12.72 C244,170.173,241.336,174.98,236.949,177.721z" fill="#FDC33B" style="fill: rgb(233, 191, 37);"></path></svg>
              <svg v-else id="Capa_1" enable-background="new 0 0 565.648 565.648" viewBox="0 0 565.648 565.648" xmlns="http://www.w3.org/2000/svg"><path d="m282.824 0c-155.947 0-282.824 126.877-282.824 282.824s126.877 282.824 282.824 282.824 282.824-126.877 282.824-282.824-126.877-282.824-282.824-282.824zm-35.353 388.883h-70.706v-212.118h70.706zm141.412 0h-70.706v-212.118h70.706z" fill="#EEB417" style="fill: rgb(238, 180, 23);"></path></svg>
            </span>
            <span @click="removeJob(cron.name)" class="icon">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 51.023 51.023" style="enable-background:new 0 0 51.023 51.023;" xml:space="preserve"><g><path style="fill: rgb(225, 81, 81);" d="M40.837,17.836c-0.591-1.937-1.553-3.466-3.467-3.466H13.568c-1.915,0-2.86,1.509-3.466,3.466 c0,0-0.561,9.547-0.503,14.861c0.031,5.951,2.71,14.86,2.71,14.86c0.654,2.023,1.552,3.466,3.467,3.466H35.41 c1.914,0,2.899-1.566,3.468-3.466c0,0,2.55-9.083,2.55-14.86C41.427,26.92,40.837,17.836,40.837,17.836z M19.844,42.696 c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-20c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2V42.696z M27.511,42.696 c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-20c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2V42.696z M35.178,42.696 c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-20c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2V42.696z" fill="#010002"></path><path style="fill: rgb(225, 81, 81);" d="M38.486,6.886h-3.388c0-0.023,0.007-0.044,0.007-0.067L34.88,4.141C34.826,1.848,32.945,0,30.64,0 H20.217c-2.305,0-4.187,1.848-4.24,4.141l-0.218,2.504l-0.008,0.174c0,0.023,0.007,0.044,0.007,0.067H12.37 c-0.562,0-1.021,0.457-1.021,1.021v3.913c0,0.563,0.458,1.02,1.021,1.02h26.115c0.562,0,1.021-0.457,1.021-1.02V7.907 C39.506,7.344,39.048,6.886,38.486,6.886z M19.755,6.862l0.213-2.447l0.008-0.174C19.976,4.108,20.084,4,20.217,4H30.64 c0.133,0,0.241,0.108,0.241,0.241l0.22,2.621c-0.002,0.01-0.012,0.015-0.014,0.024H19.77C19.767,6.877,19.757,6.872,19.755,6.862z" fill="#010002"></path></g></svg>
            </span>
            <span @click="openEditCronModal(cron)" class="icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 486.8 486.8" style="enable-background:new 0 0 486.8 486.8;" xml:space="preserve"><g><g><path d="M486.8,83.813c0-21.6-8.4-41.9-23.7-57.2l-2.4-2.4c-31.5-31.5-82.8-31.5-114.4,0l-228.8,229c-2.9,2.9-4.7,6.7-5.2,10.8 l-11.2,102.4c-0.6,5.4,1.3,10.8,5.2,14.7c3.9,3.9,9.3,5.8,14.7,5.2l102.4-11.2c4.1-0.4,7.9-2.3,10.8-5.2l88.2-88.2 c7-7,7-18.4,0-25.5c-7-7.1-18.4-7-25.5,0l-83.7,83.7l-73.9,8l8-73.9l224.5-224.3c17.5-17.5,46-17.5,63.5,0l2.4,2.4 c17.5,17.5,17.5,46,0,63.5l-55.7,55.7c-3.4,3.4-5.3,8-5.3,12.7l0.1,257.9c0,4.6-3.8,8.4-8.4,8.4h-324c-4.6,0-8.4-3.8-8.4-8.4v-324 c0-4.6,3.8-8.4,8.4-8.4h172.9c9.9,0,18-8.1,18-18c0-9.9-8.1-18-18-18H44.4c-24.5-0.1-44.4,19.9-44.4,44.3v324 c0,24.5,19.9,44.4,44.4,44.4h324c24.5,0,44.4-19.9,44.4-44.4l-0.1-250.4l50.4-50.4C478.4,125.713,486.8,105.413,486.8,83.813z" fill="#4198BE" style="fill: rgb(65, 152, 190);"></path></g></g></svg>
            </span>
            <nuxt-link :to="`/admin/cron/logs/${cron.name}`" class="icon">
              <svg id="Layer_3" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" data-name="Layer 3"><path d="m55 33h-32a1 1 0 0 0 -1 1v23a5.98 5.98 0 0 1 -1.531 4h31.531a4 4 0 0 0 4-4v-23a1 1 0 0 0 -1-1zm-3 9a1 1 0 0 1 -1 1h-24a1 1 0 0 1 -1-1v-6a1 1 0 0 1 1-1h24a1 1 0 0 1 1 1z" fill="#FDC33B" style="fill: rgb(227, 184, 28);"></path><path d="m36 17h2v6h-2z" fill="#FDC33B" style="fill: rgb(227, 184, 28);"></path><path d="m12 28v29a4 4 0 0 0 3 3.858v-33.858h-2a1 1 0 0 0 -1 1z" fill="#FDC33B" style="fill: rgb(227, 184, 28);"></path><path d="m28 37h22v4h-22z" fill="#FDC33B" style="fill: rgb(227, 184, 28);"></path><path d="m55 13h-28a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1v-12a1 1 0 0 0 -1-1zm-22 12h-4a1 1 0 0 1 -1-1v-9h2v8h3zm7-1a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm5-1v-2h-1v-2h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h-2v-1h-2v6zm9-5h-2v-1h-2v2h3a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1-1v-2h2v1h2v-2h-3a1 1 0 0 1 -1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z" fill="#FDC33B" style="fill: rgb(227, 184, 28);"></path><path d="m23 31h30v-2h-26a3 3 0 0 1 -3-3v-12a3 3 0 0 1 3-3h26v-8h-36v57.858a4 4 0 0 0 3-3.858v-23a3 3 0 0 1 3-3z" fill="#FDC33B" style="fill: rgb(227, 184, 28);"></path></svg>
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
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #292929; 
    padding: 10px;
    overflow-x: auto;
  }
  .actions .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 6px;
    margin-top: 3px;
    cursor: pointer;
}
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #444;
    color: #cfcfcf;
  }
  
  th {
    background-color: #444;
    color: white;
  }
  
  tbody tr:nth-child(even) {
    background-color: #333;
  }
  
  tbody tr:hover {
    background-color: #444;
  }
  
  .actions button {
    margin-right: 5px;
    background-color: #f1b72e ;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .actions button:hover {
    background-color: #D39510 ;
  }
  
  @media (max-width: 1100px) {
    table {
      min-width: 1200px; /* Define un ancho mínimo para la tabla */
    }
  }
  
  @media (max-width: 768px) {
    th, td {
      padding: 10px;
    }
  
    .actions button {
      margin-bottom: 5px;
    }
  }
  
  /* Estilos para la barra de desplazamiento */
  .table-container::-webkit-scrollbar {
    height: 12px;
  }
  
  .table-container::-webkit-scrollbar-track {
    background: #1e1e1e;
    border-radius: 5px;
  }
  
  .table-container::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
    border: 3px solid #1e1e1e;
  }
  
  .table-container::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  </style>
  