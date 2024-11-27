<script>
import { RegistrazioneVolontarioEndpoint } from '@/endpoints';

export default {
  data() {
    return {
      formData:{
        name: "",
        surname: "",
        age: 0,
        email: "",
        phone: "",
        password: "",
      }
      
    };
  },

  methods: {
    handleSubmit() {
      const jsonOutput = JSON.stringify(this.formData);
      fetch(RegistrazioneVolontarioEndpoint, {
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
                console.log("email già registrato");
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

    <label for="surname">Surname</label>
    <input type="text" v-model="formData.surname" required>

    <label for="age">Age</label>
    <input type="number" v-model="formData.age" min="1" max="200" required>

    <label for="email">Email</label>
    <input type="email" v-model="formData.email" required>

    <label for="phone">Phone</label>
    <input type="tel" v-model="formData.tel">

    <label for="password">Password</label>
    <input type="password" v-model="formData.password" required>

    <button class="btn btn-primary" type="submit">Registrati</button>
  </form>
</template>

<style scoped></style>
