<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <slot></slot>
      <button class="close-button" @click="closeModal">&times;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
  padding: 20px;
  z-index: 100;
}

.modal-content {
  background: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  max-height: 90vh; 
  overflow-y: auto; 
  margin: 10px 0; 
  color: #f5f5f5;
  animation: slideIn 0.3s ease;
}

/* Estilos para la barra de scroll */
.modal-content::-webkit-scrollbar {
  width: 12px; 
}

.modal-content::-webkit-scrollbar-track {
  background: #333; 
  border-radius: 10px; 
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: #888; 
  border-radius: 10px; 
  border: 3px solid #333; 
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background-color: #555; 
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #f5f5f5;
  cursor: pointer;
  transition: color 0.3s;
}

.close-button:hover {
  color: #ff6b6b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
