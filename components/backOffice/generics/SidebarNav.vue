<template>
    <aside class="sidebar">
      <nav>
        <ul>
          <li><NuxtLink to="/admin">Dashboard</NuxtLink></li>
          <li>
            <NuxtLink to="/admin/cronjobs">CronJobs</NuxtLink>
            <ul>
              <li><NuxtLink to="/admin/cron/logs">Logs</NuxtLink></li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  // Aquí puedes añadir cualquier lógica de JavaScript que necesites
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #292929;    
    padding-top: 60px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
  
  .sidebar nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar nav ul li {
    margin-bottom: 10px;
  }
  
  .sidebar nav ul li a {
    color: #fff;
    text-decoration: none;
  }
  
  .sidebar nav ul li a:hover {
    text-decoration: underline;
  }
  
  .sidebar nav ul ul {
    margin-left: 20px;
  }
  </style>
  