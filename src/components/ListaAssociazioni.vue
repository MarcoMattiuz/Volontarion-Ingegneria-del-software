<script>
import { getAssociazioniEndpoint } from "@/endpoints";
import "@/assets/style.css";
export default {
  data() {
    return {
      Associazioni: [],
      searchQuery: "",
    };
  },
  mounted() {
    this.getAssociazioni();
  },
  computed: {
    filteredAssociations() {
      return this.Associazioni.filter(as => {
        // Filter by search query
        const matchesSearch = as.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesSearch ;
      });
    }
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
  <h2 class="text-2xl font-bold text-center section-spacing">Associations</h2>
  
  <div class="form-layout">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by associazione name..."
        class="input input-bordered w-full mb-2"
      />
    </div>
  <div class="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="(item, index) in filteredAssociations"
      :key="index"
      class="card w-96 bg-base-100 shadow-xl card-layout element-spacing"
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
      <div class="card-body card-layout">
        <h2 class="card-title section-spacing">{{ item.name }}</h2>
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
