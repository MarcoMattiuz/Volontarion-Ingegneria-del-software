<script>
import { ChangeImageVolontarioEndpoint } from '@/endpoints';
import { checkIfLoggedIn } from '@/checkLogged';
export default {
  data() {
    return {
      isFileUploaded: false,
      file: null,
      base64File: null,
    };
  },
  methods: {
    async handleFileUpload(event) {
      checkIfLoggedIn().then((response)=> {
        const file = event.target.files[0];
        if (file) {
        this.file = file;
        this.createSubmitButton(this.file);
      }
      }).catch((error) => {
          console.error('Error:', error.message);
        });
    },

    createSubmitButton(file) {
      this.isFileUploaded = true;
    },

    handleSubmit() {
      if (this.file) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.base64File = e.target.result;

          this.sendImage();
        };

        reader.readAsDataURL(this.file);
      }
    },

    sendImage() {
      console.log("image");
      console.log(JSON.stringify(this.base64File));
      fetch(ChangeImageVolontarioEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ pimage: this.base64File }),
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
};
</script>

<template>
    <input type="file" @change="handleFileUpload" accept="image/*" />
    <div v-if="isFileUploaded">
      <button v-on:click="handleSubmit">Submit</button>
    </div>
</template>
