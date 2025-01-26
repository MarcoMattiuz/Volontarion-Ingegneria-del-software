<script>
import { ChangeImageVolontarioEndpoint } from '@/endpoints';
import { checkIfLoggedIn } from '@/checkLogged';
export default {
  data() {
    return {
      file: null,
      base64File: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;
      }
    },

    handleSubmit() {
      if (this.file) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.base64File = e.target.result;
          this.sendImage();
        };
        reader.onerror = () => {
        console.log('Failed to read the file. Please try again.');
         };
        reader.readAsDataURL(this.file);
      }
    },

    sendImage() {
      console.log("base 64:"+JSON.stringify(this.base64File));
      fetch(ChangeImageVolontarioEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: this.base64File }),
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
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
  <input type="file" @change="handleFileUpload" accept="image/*" />
  <button class="btn btn-primary" v-on:click="handleSubmit">Submit</button>
</template>
