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
  components: {
    
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
    redirectTo(url) {
      this.$router.push(url);
    },
  },
};
</script>

<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit" method="POST">
      <label for="email">Email</label>
      <input class="containter" type="email" v-model="email" required />

      <label for="password">Password</label>
      <input class="containter" type="password" v-model="password" required>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <a @click="redirectTo('/registrazione')">Non sei registrato?</a>
  </div>
  

  
</template>

<style scoped></style>
