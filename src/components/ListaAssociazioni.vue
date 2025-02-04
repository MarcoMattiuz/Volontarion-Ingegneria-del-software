<script>
import { getAssociazioniEndpoint } from "@/endpoints";
import "@/assets/style.css";
export default {
  data() {
    return {
      Associazioni: [],
    };
  },
  mounted() {
    this.getAssociazioni();
  },
  methods: {
    getAssociazioni() {
      fetch(getAssociazioniEndpoint, {
        method: "Get",
      }).then((response) => {
        if (!response.ok) {
          console.log("error");
        } else {
          response
            .json()
            .then((data) => {
              this.Associazioni = data;
              console.log("Associazioni:", this.Associazioni);
            })
            .catch((error) => {
              console.log("Error reading response:", error.message);
            });
        }
      });
    },
  },
};
</script>
<template>
  <h2 class="text-2xl font-bold text-center">Associations</h2>
  <div class="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="(item, index) in this.Associazioni"
      :key="index"
      class="card w-96 bg-base-100 shadow-xl"
    >
      <figure>
        <img
          :src="
            item.profilePicture && item.profilePicture !== ''
              ? item.profilePicture
              : '/placeholder.png'
          "
          alt="profile picture"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ item.name }}</h2>
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            @click="this.$router.push(`/associazione/${item._id}`)"
          >
            visita
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
