<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <slot></slot>
        <button class="close-button" @click="closeModal">Close</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineEmits } from 'vue';
  
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  