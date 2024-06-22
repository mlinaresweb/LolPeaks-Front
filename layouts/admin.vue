<template>
  <div class="admin-layout">
    <SidebarNav />
    <div class="main-content">
     
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import SidebarNav from '~/components/backOffice/generics/SidebarNav.vue'
</script>


<style scoped>
.admin-layout {
  display: flex;
  background-color: #1c1c1c;
  min-height: 100vh;
}


.main-content {
  margin-left: 290px;
    margin-right: 40px;
    width: calc(100% - 330px);
}





@media (max-width: 992px) {
  .admin-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .main-content {
    margin-left: 0;
    width: 100%; /* Ancho completo para pantallas pequeñas */
  }
}
</style>