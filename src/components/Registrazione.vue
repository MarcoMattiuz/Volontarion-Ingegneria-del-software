<template>
  <div class="registration-container">
    <div class="toggle-buttons">
      <button @click="currentForm = 'volontari'; toggleoff_email_alreadyregistered()"
        :class="{ active: currentForm === 'volontari' }">
        Registrazione Volontari
      </button>
      <button @click="currentForm = 'associazioni'; toggleoff_email_alreadyregistered()"
        :class="{ active: currentForm === 'associazioni' }">
        Registrazione Associazioni
      </button>
    </div>


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


    <form v-else @submit.prevent="handleVolontariSubmit">
      <label for="name">Foto Profilo</label>
      <img :src="volontariFormData.profilePicture"v-if="associazioniFormData.profilePicture"/>
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
      <form @submit.prevent="addSkill">
        <label for="skill">Skill:</label>
        <input id="skill" v-model="newSkill" type="text" placeholder="Enter a skill" class="input" />
        <button type="submit" class="btn btn-primary">Add Skill</button>
      </form>

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
import { RegistrazioneVolontarioEndpoint, RegistrazioneAssociazioneEndpoint } from '@/endpoints';

export default {
  data() {
    return {
      email_registered: false,
      newSkill: "",
      currentForm: 'volontari',
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

          if(this.currentForm === 'associazioni'){
            this.associazioniFormData.profilePicture = base64String;
            
          }else this.volontariFormData.profilePicture = base64String;

                };

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
          name: "", surname: "", age: null, email: "", phone: "", password: "", description: "", skills: [], experience: "",profilePicture :""
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
          name: "", email: "", phone: "", password: "", description: "", objectives: "",profilePicture :"",subscriptionIter:""
        };
      } catch (error) {
        console.error('Error submitting associazioni form:', error);
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