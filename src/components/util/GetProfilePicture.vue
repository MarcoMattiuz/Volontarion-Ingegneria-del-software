<script>
import { GetProfilePictureEndpoint } from '@/endpoints';


export default {
  data() {
    return {
      image: null,
      base64File: null,
    };
  },
  methods: {
    handleSubmit() {
      fetch(GetProfilePictureEndpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          this.image = data;
          console.log('Response:', data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    },

  }
}
</script>

<template>
  <button class="btn btn-primary" v-on:click="handleSubmit">getImage</button>
  <img :src="image" />
  </template>
