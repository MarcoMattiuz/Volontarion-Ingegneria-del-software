<script>
import { getAssociazioniEndpoint } from '@/endpoints';

export default {
  data() {
    return{
      Associazioni : []
    }
    
  },
  mounted() {
    this.getAssociazioni();
  },
  methods: {
    getAssociazioni() {
      
      fetch(getAssociazioniEndpoint, {
        method: 'Get',
      })
        .then((response) => {

          if (!response.ok) {
            console.log("error");
          } else {
            response.json()
              .then((data) => {
                
                this.Associazioni = data;
                console.log('Associazioni:', this.Associazioni);
              })
              .catch((error) => {
                console.log('Error reading response:', error.message);
              });
          }
        })
    }
  },
};
</script>
<template>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="(item, index) in this.Associazioni" :key="index" class="card w-96 bg-base-100 shadow-xl">
      <figure><img :src="item.profilePicture" alt="placeholder"/></figure>
      <div class="card-body">
        <h2 class="card-title">{{ item.name }}</h2>
        <p>12321</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">visita</button>
        </div>
      </div>
    </div>
  </div>
    
</template>