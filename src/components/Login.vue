<script>
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

      const postData = {
        email: this.email,
        password: this.password,
      };

      fetch("endpoint", {
        method: 'POST',
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response:', data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }
    /* promisifiedTimeout (time) {
     return new Promise((res) => setTimeout(() => res(time + 'ms'), time))
   },

   async f() {
     await this.promisifiedTimeout(2000);
     this.email = "123";
   }, */
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit" method="POST">
    <label for="email">Email</label>
    <input type="email" v-model="email" required>

    <label for="password">Password</label>
    <input type="password" v-model="password" required>

    <button type="submit">Login</button>
  </form>
</template>

<style scoped></style>
