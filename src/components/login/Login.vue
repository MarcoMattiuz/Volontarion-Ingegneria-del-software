<script>
import { LoginEndpointVolontario } from "@/endpoints";
import { LoginEndpointAssociazione } from "@/endpoints";

export default {
  data() {
    return {
      endpoint: LoginEndpointVolontario,
      message: "sono associazione",
      tipo: "volontario",
      email: "",
      password: "",
    };
  },
  computed: {
    isLoggedIn() {
      return !!sessionStorage.getItem("userType");
    },
  },
  components: {},
  methods: {
    handleSubmit() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      const postData = new URLSearchParams();
      postData.append("email", this.email);
      postData.append("password", this.password);

      fetch(this.endpoint, {
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
          sessionStorage.setItem("userType", this.tipo);
          //
          //crea evento che userType è cambiato
          window.dispatchEvent(
            new CustomEvent("userTypeChanged", {
              detail: {
                userType: sessionStorage.getItem("userType"),
              },
            })
          );
          console.log("Response:", data);
          console.log("data", this.postData);

          if (data.response === "OK") {
            alert("Login successful!");
          } else {
            alert("Login failed!");
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });

      console.log(document.cookie);
    },
    redirectTo(url) {
      this.$router.push(url);
    },
    toggle() {
      console.log(this.tipo + " " + this.message);
      if (this.tipo == "volontario") {
        this.tipo = "associazione";
        this.endpoint = LoginEndpointAssociazione;
        this.message = "sono volontario";
      } else if (this.tipo == "associazione") {
        this.tipo = "volontario";
        this.endpoint = LoginEndpointVolontario;

        this.message = "sono associazione";
      }
    },
  },
};
</script>

<template>
  <div class="login-container">
    <p class="login-title">login {{ this.tipo }}</p>
    <form class="login-form" @submit.prevent="handleSubmit" method="POST">
      <label for="email">Email</label>
      <input class="containter" type="email" v-model="email" required />
      <label for="password">Password</label>
      <input class="containter" type="password" v-model="password" required />
      <button class="btn btn-primary" type="submit" style="margin-bottom: 10px">
        Login
      </button>
      <button @click="toggle" type="button" class="btn btn-primary">
        {{ this.message }}
      </button>
    </form>
    <a @click="redirectTo('/registrazione')" class="link-register"
      >Non sei registrato?</a
    >
  </div>
</template>

<style scoped></style>
