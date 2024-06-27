<template>
  <div class="admin-layout">
    <SidebarNav v-if="!isMobile" />
    <MobileNav v-else />
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SidebarNav from '~/components/backOffice/generics/SidebarNav.vue';
import MobileNav from '~/components/backOffice/generics/MobileNav.vue';

const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 992; // Ajusta el valor según tus necesidades
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

</script>

<style scoped>
.admin-layout {
  background-color: #1c1c1c;
  min-height: 100vh;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
}

.main-content {
  margin-left: 290px;
  margin-right: 40px;
  width: calc(100% - 330px);
}

@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
    width: 100%; 
  }
  .admin-layout {
    display: block;
  }
}
</style>
