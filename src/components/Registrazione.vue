<template>
  <div class="registration-container">
    <div class="toggle-buttons">
      <button 
        @click="currentForm = 'volontari'; toggleoff_email_alreadyregistered()" 
        :class="{ active: currentForm === 'volontari' }"
      >
        Registrazione Volontari
      </button>
      <button 
        @click="currentForm = 'associazioni'; toggleoff_email_alreadyregistered()" 
        :class="{ active: currentForm === 'associazioni' }"
      >
        Registrazione Associazioni
      </button>
    </div>

    <form v-if="currentForm === 'associazioni'" @submit.prevent="handleAssociazioniSubmit">
      <label for="name">Name</label>
      <input type="text" v-model.trim="associazioniFormData.name" required>

      <label for="email">Email</label>
      <input type="email" v-model.trim="associazioniFormData.email" required>
      <p v-if="email_registered" class="error">Email già registrata</p>

      <label for="phone">Phone</label>
      <input type="tel" v-model.trim="associazioniFormData.phone">

      <label for="password">Password</label>
      <input type="password" v-model="associazioniFormData.password" required>

      <button class="btn btn-primary" type="submit">Registrati</button>
    </form>

    <form v-else @submit.prevent="handleVolontariSubmit">
      <label for="name">Name</label>
      <input type="text" v-model.trim="volontariFormData.name" required>

      <label for="surname">Surname</label>
      <input type="text" v-model.trim="volontariFormData.surname" required>

      <label for="age">Age</label>
      <input type="number" v-model.number="volontariFormData.age" min="1" max="200" required>

      <label for="email">Email</label>
      <input type="email" v-model.trim="volontariFormData.email" required>
      <p v-if="email_registered" class="error">Email già registrata</p>

      <label for="phone">Phone</label>
      <input type="tel" v-model.trim="volontariFormData.phone">

      <label for="password">Password</label>
      <input type="password" v-model="volontariFormData.password" required>

      <button class="btn btn-primary" type="submit">Registrati</button>
    </form>
  </div>
</template>

<script>
import { RegistrazioneVolontarioEndpoint, RegistrazioneAssociazioneEndpoint } from '@/endpoints';

export default {
  data() {
    return {
      email_registered: false,
      currentForm: 'volontari',
      associazioniFormData: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
      volontariFormData: {
        name: "",
        surname: "",
        age: null,
        email: "",
        phone: "",
        password: "",
      }
    };
  },

  methods: {
    toggleon_email_alreadyregistered() {
      this.email_registered = true;
    },
    
    toggleoff_email_alreadyregistered() {
      this.email_registered = false;
    },

    validateForm(formData) {
      // Basic validation to prevent empty strings
      return Object.entries(formData).every(([key, value]) => {
        if (key === 'phone') return true; // Phone is optional
        if (typeof value === 'string') return value.trim().length > 0;
        if (typeof value === 'number') return value > 0;
        return value !== null && value !== undefined;
      });
    },

    async handleVolontariSubmit() {
      if (!this.validateForm(this.volontariFormData)) {
        alert('Per favore compila tutti i campi obbligatori');
        return;
      }
      await this.submitFormVolontario(this.volontariFormData);
    },

    async handleAssociazioniSubmit() {
      if (!this.validateForm(this.associazioniFormData)) {
        alert('Per favore compila tutti i campi obbligatori');
        return;
      }
      await this.submitFormAssociazione(this.associazioniFormData);
    },

    async submitFormVolontario(formData) {
      try {
        const response = await fetch(RegistrazioneVolontarioEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          if (response.status === 605) {
            this.toggleon_email_alreadyregistered();
            console.log('Volontari - email già registrata');
          } else {
            console.log('Volontari - errore server');
          }
          return;
        }

        const data = await response.json();
        console.log('Volontari Response:', data);
        // Reset form on success
        this.volontariFormData = {
          name: "", surname: "", age: null, email: "", phone: "", password: ""
        };
      } catch (error) {
        console.error('Error submitting volontari form:', error);
      }
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
          name: "", email: "", phone: "", password: ""
        };
      } catch (error) {
        console.error('Error submitting associazioni form:', error);
      }
    }
  },
};
</script>
  <style scoped>
  .registration-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .toggle-buttons button {
    margin: 0 10px;
    padding: 10px 15px;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
  }
  
  .toggle-buttons button.active {
    background-color: #007bff;
    color: white;
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