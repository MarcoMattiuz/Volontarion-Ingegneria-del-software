<script>
import { LoginEndpointVolontario } from "@/endpoints";

export default {
  data() {
    return {
      message: "sono associazione",
      tipo: "volontario",
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

      //aggiungere endpoint login associazione
      fetch(LoginEndpointVolontario, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: postData.toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          //
          localStorage.setItem("userType", this.tipo);
          //
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });

      console.log(document.cookie);
    },

    toggle() {
      console.log(this.tipo + " " + this.message);
      if (this.tipo == "volontario") {
        this.tipo = "associazione";
        this.message = "sono volontario";
      } else if (this.tipo == "associazione") {
        this.tipo = "volontario";
        this.message = "sono associazione";
      }
    },
  },
};
</script>

<template>
  <p>login {{ tipo }}</p>
  <form @submit.prevent="handleSubmit" method="POST">
    <label for="email">Email</label>
    <input type="email" v-model="email" required />

    <label for="password">Password</label>
    <input type="password" v-model="password" required />
    <input type="password" v-model="password" required />
    <button @click="toggle" type="button" class="btn btn-primary">
      {{ message }}
    </button>
    <button class="btn btn-primary" type="submit">Login</button>
  </form>
</template>

<style scoped></style>
