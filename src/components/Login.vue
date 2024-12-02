<script>
import { LoginEndpoint } from '@/endpoints';

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false, // Track if the form was submitted
    };
  },

  methods: {
    handleSubmit() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      this.submitted = true;
      const postData = new URLSearchParams();
      postData.append("email", this.email);
      postData.append("password", this.password);

  
      
      fetch(LoginEndpoint, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: postData.toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });

      console.log(document.cookie);
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit" method="POST">
    <label for="email">Email</label>
    <input type="email" v-model="email" required />

    <label for="password">Password</label>
    <input type="password" v-model="password" required>
    <button class="btn btn-primary" type="submit">Login</button>
  </form>
</template>

<style scoped></style>
