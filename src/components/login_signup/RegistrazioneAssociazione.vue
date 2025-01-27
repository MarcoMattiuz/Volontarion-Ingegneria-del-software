<script>
import { RegistrazioneAssociazioneEndpoint } from '@/endpoints';

export default {
  data() {
    return {
      formData:{
        name: "",
        email: "",
        phone: "",
        password: "",
      }
      
    };
  },

  methods: {
    handleSubmit() {
      const jsonOutput = JSON.stringify(this.formData);
      fetch(RegistrazioneAssociazioneEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonOutput,
      })
        .then((response) => {

          if (!response.ok) {
            switch (response.status) {
              case 605:
                console.log("email già registrato");
                break;
              default:
                console.log("errore server");
                break;
            }
          } else {
            response.json()
              .then((data) => {
                console.log('Response:', data);
              })
              .catch((error) => {
                console.log('Error reading response:', error.message);
              });
          }
        })
    }
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">name</label>
    <input type="text" v-model="formData.name" required>

    <label for="email">Email</label>
    <input type="email" v-model="formData.email" required>

    <label for="phone">Phone</label>
    <input type="tel" placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" v-model="formData.phone">

    <label for="password">Password</label>
    <input type="password" v-model="formData.password" required>

    <button class="btn btn-primary" type="submit">Registrati</button>
  </form>
</template>

<style scoped></style>
