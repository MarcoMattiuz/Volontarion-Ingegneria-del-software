<template>
    <div class="registration-container">  
      <form  @submit.prevent="handleVolontariSubmit">
        <label for="name">Foto Profilo</label>
        <img :src="this.volontariFormData.profilePicture"/>
        <input type="file" @change="handleFileUpload" accept="image/*" />
  
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
  
        <label for="description">Descrizione</label>
        <textarea v-model="volontariFormData.description"></textarea>
  
        <label for="experience">Experience</label>
        <textarea v-model="volontariFormData.experience"></textarea>
  
        <h2>Add Your Skills</h2>
          <label for="skill">Skill:</label>
          <input id="skill" v-model="newSkill" type="text" placeholder="Enter a skill" class="input" />
          <button @click="addSkill" type="button" class="btn btn-primary">Add Skill</button>
  
        <h3>Your Skills:</h3>
        <ul>
          <li v-for="(skill, index) in volontariFormData.skills" :key="index">
            {{ skill }}
            <button @click="removeSkill(index)" class="btn btn-danger">Remove</button>
          </li>
        </ul>
  
        <button class="btn btn-primary" type="submit">Registrati</button>
      </form>
    </div>
  </template>
  
  <script>
  import { RegistrazioneVolontarioEndpoint } from '@/endpoints';
  
  export default {
    data() {
      return {
        email_registered: false,
        newSkill: "",
        volontariFormData: {
          profilePicture: "",
          name: "",
          surname: "",
          age: null,
          email: "",
          phone: "",
          password: "",
          description: "",
          experience: "",
          skills: [],
        }
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
  
      async handleVolontariSubmit() {
        if (!this.validateForm(this.volontariFormData)) {
          alert('Per favore compila tutti i campi obbligatori');
          return;
        }
        await this.submitFormVolontario(this.volontariFormData);
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
            name: "", surname: "", age: null, email: "", phone: "", password: "", description: "", skills: [], experience: "",profilePicture :""
          };
        } catch (error) {
          console.error('Error submitting volontari form:', error);
        }
      },
      addSkill() {
        if (this.newSkill.trim() !== "") {
          this.volontariFormData.skills.push(this.newSkill.trim());
          this.newSkill = "";
        }
      },
      removeSkill(index) {
        this.volontariFormData.skills.splice(index, 1);
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