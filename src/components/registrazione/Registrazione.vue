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
    <RegistrazioneAssociazione v-if="currentForm === 'associazioni'"></RegistrazioneAssociazione>
    <RegistrazioneVolontario v-else></RegistrazioneVolontario>

  </div>
  
</template>

<script>

import RegistrazioneVolontario from './RegistrazioneVolontario.vue';
import RegistrazioneAssociazione from './RegistrazioneAssociazione.vue';

export default {
  components: {
      RegistrazioneVolontario,
      RegistrazioneAssociazione
  },
  data() {
    return {
      currentForm: 'volontari',
    };
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

</style>