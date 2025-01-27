<template>
  <div class="info-container">
      <h2>Lista Associazioni</h2>
      
      <!-- Loading State -->
      <p v-if="loading">Loading...</p>
      
      <!-- Error State -->
      <p v-if="error" class="error">{{ error }}</p>
      
      <!-- Data Display -->
        
    <div v-if="!loading && !error" class="info-list">
      <div v-for="item in Info_associazioni" :key="item._id" class="info-card">
        <h3>{{ item.name }}</h3>
        <h3>{{ item.email }}</h3>
        <h3>{{ item.phone }}</h3>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import {ListaAssociazioniEndpoint} from '@/endpoints';
  import axios from 'axios';
  
  export default {
    name: 'Info_associazioni',
    data() {
      return {
        Info_associazioni: [],
        loading: true,
        error: null,
        newInfo: {
          name: '',
          email: '',
          phone: '',
          password: '',
        }
      }
    },
    methods: {
      async fetchInfo() {
          try {
              this.loading = true;
              console.log('Starting fetch request...');
              const response = await axios.get(ListaAssociazioniEndpoint);
              console.log('Response received:', response.data);
              this.Info_associazioni = response.data;
              this.error = null;
          } catch (err) {
              console.error('Detailed fetch error:', err);
              // More detailed error message
              this.error = `Failed to fetch information: ${err.message}`;
          } finally {
              this.loading = false;
          }
      }
    },
    mounted() {
    console.log('Component mounted'); // Add this
    this.fetchInfo();
    }
  }
  </script>
<style>
.info-container {
  margin: 2rem;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h3 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  font-weight: 500;
}

h3:first-of-type {
  color: #007BFF; /* Colore blu per il nome */
}

h3:nth-of-type(2) {
  color: #444444; /* Colore grigio per l'email */
}

h3:nth-of-type(3) {
  color: #28a745; /* Colore verde per il telefono */
}

/* Aggiungi uno stile per il caso di errori */
.error {
  color: red;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  font-size: 1.1rem;
}
</style>