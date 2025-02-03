<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="app" style="height: 100vh; width: 100vw">
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

<style scoped></style>
