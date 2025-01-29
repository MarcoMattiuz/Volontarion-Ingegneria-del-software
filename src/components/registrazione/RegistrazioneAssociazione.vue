<template>
    <div class="registration-container">  
        <form v-if="currentForm === 'associazioni'" @submit.prevent="handleAssociazioniSubmit">
      <label for="name">Foto Profilo</label>
      <img :src="associazioniFormData.profilePicture" v-if="associazioniFormData.profilePicture"/>
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <label for="name">Name</label>
      <input type="text" v-model.trim="associazioniFormData.name" required>

      <label for="email">Email</label>
      <input type="email" v-model.trim="associazioniFormData.email" required>
      <p v-if="email_registered" class="error">Email già registrata</p>

      <label for="phone">Phone</label>
      <input type="tel" v-model.trim="associazioniFormData.phone">

      <label for="password">Password</label>
      <input type="password" v-model="associazioniFormData.password" required>

      <label for="description">Descrizione</label>
      <textarea v-model="associazioniFormData.description"></textarea>

      <label for="objectives">Obiettivi</label>
      <textarea v-model="associazioniFormData.objectives"></textarea>

      <label for="subscriptionIter">SubscriptionIter</label>
      <textarea v-model="associazioniFormData.subscriptionIter"></textarea>
      
      <button class="btn btn-primary" type="submit">Registrati</button>
    </form>
    </div>
  </template>
  
  <script>
  import {RegistrazioneAssociazioneEndpoint } from '@/endpoints';
  
  export default {
    data() {
      return {
        email_registered: false,
        associazioniFormData: {
        profilePicture: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        description: "",
        objectives: "",
        subscriptionIter :"",
      },
      };
    },
  
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0]; 
  
        if (file) {
          const reader = new FileReader();
  
          reader.onload = () => {
            const base64String = reader.result;
  
            this.volontariFormData.profilePicture = base64String;
          }
          reader.readAsDataURL(file);
      }
    },
      toggleon_email_alreadyregistered() {
        this.email_registered = true;
      },
  
      toggleoff_email_alreadyregistered() {
        this.email_registered = false;
      },
  
      validateForm(formData) {
        return true;
        //opzione required nei input del form
        // Basic validation to prevent empty strings
        /* return Object.entries(formData).every(([key, value]) => {
          if (key === 'phone') return true; // Phone is optional
          if (typeof value === 'string') return value.trim().length > 0;
          if (typeof value === 'number') return value > 0;
          return value !== null && value !== undefined;
        }); */
      },
  
      async handleAssociazioniSubmit() {
      if (!this.validateForm(this.associazioniFormData)) {
        alert('Per favore compila tutti i campi obbligatori');
        return;
      }
      await this.submitFormAssociazione(this.associazioniFormData);
    },
  

    async submitFormAssociazione(formData) {
      try {
        const response = await fetch(RegistrazioneAssociazioneEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          if (response.status === 605) {
            this.toggleon_email_alreadyregistered();
            console.log('Associazioni - email già registrata');
          } else {
            console.log('Associazioni - errore server');
          }
          return;
        }

        const data = await response.json();
        console.log('Associazioni Response:', data);
        // Reset form on success
        this.associazioniFormData = {
          name: "", email: "", phone: "", password: "", description: "", objectives: "",profilePicture :"",subscriptionIter:""
        };
      } catch (error) {
        console.error('Error submitting associazioni form:', error);
      }
    },
    }
    ,
  };
  </script>
  <style scoped>
  .registration-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 5px;
  }
  
  button {
    margin-top: 15px;
  }
  </style>