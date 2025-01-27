<script setup>
import Login from './components/login_signup/Login.vue';
import ImageUpload from './components/util/ImageUpload.vue';
import GetProfilePicture from './components/util/GetProfilePicture.vue';
import RegistrazioneVolontario from './components/login_signup/RegistrazioneVolontario.vue';
import DeleteAccount from './components/account/DeleteAccount.vue';
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="app">
    <Sidebar></Sidebar>
    <main class="routerview">
      <RouterView></RouterView>
    </main>
      
    
  
  </div>
  
  
  
  
  
  <!--
  <RegistrazioneVolontario></RegistrazioneVolontario>
  <br>
  <br>
  <br>
  <Login></Login>
  <br>
  <ImageUpload></ImageUpload>
  <GetProfilePicture></GetProfilePicture>
  <DeleteAccount></DeleteAccount>
  -->
  
</template>


  


<style scoped>

</style>