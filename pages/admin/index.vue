<template>
  <div>
    <h1 class="title-amarillo">Admin Page</h1>
    <p class="text-white" >Bienvenido, Admin.</p>
  </div>
</template>

<script setup lang="ts">

// Aplicar el middleware de autenticación
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',

});

</script>

<style scoped>
 .title-amarillo{
    color: #FDBE3B;
  }
  .text-white{
    color: white;
  }
</style>
