<script setup>
import Login from './components/Login.vue';
import ImageUpload from './components/ImageUpload.vue';
import GetProfilePicture from './components/GetProfilePicture.vue';
import RegistrazioneVolontario from './components/RegistrazioneVolontario.vue';
import DeleteAccount from './components/DeleteAccount.vue';
import Sidebar from './components/Sidebar.vue'
</script>


<template>
  <Sidebar></Sidebar>
    <div class="offsetSidebar">
      <RouterView></RouterView>
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