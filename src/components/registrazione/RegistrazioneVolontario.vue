<template>
  <div class="registration-container">
    <form @submit.prevent="handleVolontariSubmit">
      <div class="form-grid">
        <!-- Foto Profilo -->
        <div class="form-group full-width">
          <label for="name">Foto Profilo</label>
          <img :src="this.volontariFormData.profilePicture" />
          <input type="file" @change="handleFileUpload" accept="image/*" />
        </div>

        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" v-model.trim="volontariFormData.name" required />
        </div>

        <div class="form-group">
          <label for="surname">Cognome</label>
          <input
            type="text"
            v-model.trim="volontariFormData.surname"
            required
          />
        </div>

        <div class="form-group">
          <label for="age">Età</label>
          <input
            type="number"
            v-model.number="volontariFormData.age"
            min="1"
            max="200"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model.trim="volontariFormData.email" required />
          <p v-if="email_registered" class="error">Email già registrata</p>
        </div>

        <div class="form-group">
          <label for="phone">Telefono</label>
          <input type="tel" v-model.trim="volontariFormData.phone" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="volontariFormData.password"
            required
          />
        </div>

        <div class="form-group full-width">
          <label for="description">Descrizione</label>
          <textarea v-model="volontariFormData.description"></textarea>
        </div>

        <div class="form-group full-width">
          <label for="experience">Esperienza</label>
          <textarea v-model="volontariFormData.experience"></textarea>
        </div>

        <!-- Sezione Skills -->
        <div class="form-group full-width">
          <h2>Aggiungi le tue competenze</h2>
          <label for="skill">Skill:</label>
          <div class="skill-input">
            <input
              id="skill"
              v-model="newSkill"
              type="text"
              placeholder="Inserisci una competenza"
            />
            <button
              id="skill-btn"
              @click="addSkill"
              type="button"
              class="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>

        <div class="form-group full-width">
          <h3>Le tue competenze:</h3>
          <ul class="skill-list">
            <li
              class="skills"
              v-for="(skill, index) in volontariFormData.skills"
              :key="index"
            >
              {{ skill }}
              <button
                id="remove-btn"
                @click="removeSkill(index)"
                class="btn btn-danger"
              >
                X
              </button>
            </li>
          </ul>
        </div>
      </div>

      <button class="btn btn-primary" type="submit">Registrati</button>
    </form>
  </div>
</template>
<script>
import { RegistrazioneVolontarioEndpoint } from "@/endpoints";

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
        alert("Per favore compila tutti i campi obbligatori");
        return;
      }
      await this.submitFormVolontario(this.volontariFormData);
    },

    async submitFormVolontario(formData) {
      try {
        const response = await fetch(RegistrazioneVolontarioEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          if (response.status === 605) {
            this.toggleon_email_alreadyregistered();
            console.log("Volontari - email già registrata");
            alert("Email già registrata");
          } else {
            console.log("Volontari - errore server");
            alert("Errore server");
          }
          return;
        } else {
          alert("Registrazione avvenuta con successo");
        }

        const data = await response.json();
        console.log("Volontari Response:", data);
        // Reset form on success
        this.volontariFormData = {
          name: "",
          surname: "",
          age: null,
          email: "",
          phone: "",
          password: "",
          description: "",
          skills: [],
          experience: "",
          profilePicture: "",
        };
      } catch (error) {
        console.error("Error submitting volontari form:", error);
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
  },
};
</script>
<style scoped>
.registration-container {
  max-width: 600px; /* Più largo per supportare due colonne */
  margin: 10px auto;
  padding: 1rem;
  border: 0.3rem solid black;
  border-radius: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: span 2; /* I campi più grandi occupano entrambe le colonne */
}

label {
  margin-top: 10px;
}

input,
textarea {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

button {
  margin-top: 15px;
  width: 100%;
}

/* Stile per la gestione delle skill */
.skill-input {
  display: flex;
  gap: 10px;
}

.skill-input input {
  flex-grow: 1;
}

.skill-list {
  list-style: none;
  padding: 0;
}

.skill-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: black;
  padding: 5px 10px;
  margin-top: 5px;
  border-radius: 5px;
}

#skill-btn {
  width: 50px;
}
#remove-btn {
  display: flex;
  align-items: center;
  width: 30px;
}
</style>
