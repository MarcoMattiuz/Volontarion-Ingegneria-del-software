<script setup>
import Login from './components/login_signup/Login.vue';
import ImageUpload from './components/util/ImageUpload.vue';
import GetProfilePicture from './components/util/GetProfilePicture.vue';
import RegistrazioneVolontario from './components/login_signup/RegistrazioneVolontario.vue';
import DeleteAccount from './components/account/DeleteAccount.vue';
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class ="flex" >
    <!-- Sidebar -->
    <Sidebar class ="bg-primary w-16 flex-none"></Sidebar>
    
    <!-- Main Content -->
    <div class="bg-primary-content pl-36 p-20 flex-auto">
      <RouterView></RouterView>
    </div>
  </div>
</template>


  


<style scoped>

</style>