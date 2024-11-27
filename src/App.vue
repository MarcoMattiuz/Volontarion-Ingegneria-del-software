<script setup>
import Login from './components/Login.vue';
import ImageUpload from './components/ImageUpload.vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Sidebar></Sidebar>
  <div class="offsetSidebar">
    <RouterView></RouterView>
  </div>
  
  
  
  
</template>

<style scoped>

</style>