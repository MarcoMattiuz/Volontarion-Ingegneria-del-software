<script>
import { GetAssociazioniIscritteEndpoint, unsubscribeAssociazioneEndpoint } from '@/endpoints';
export default {
    components: {

    },
    data() {
        return {
            associazioni: [],
            searchQuery: "",
        };
    },
    computed: {
    filteredAssociations() {
      return this.associazioni.filter(as => {
        // Filter by search query
        const matchesSearch = as.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesSearch ;
      });
    }
  },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            await fetch(GetAssociazioniIscritteEndpoint, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("associazioni:", data);
                    this.associazioni = data;
                })
                .catch((error) => {
                    console.error("Error fetching events:", error.message);
                });
        },
        async unsubscribeAssociazione(associazioneId) {
            await fetch(unsubscribeAssociazioneEndpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id: associazioneId })
            })
                .then((response) => response.json())
                .then((data) => {
                    alert("disiscritto");
                    this.getData();
                })
                .catch((error) => {
                    console.error("Error unsubscribeEvent:", error.message);
                });
        },
    }
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-6">
        <h2 class="text-2xl font-bold text-center mb-6 section-spacing">Associazioni iscritte</h2>
        <div class="form-layout">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by associazione name..."
        class="input input-bordered w-full mb-2"
      />
    </div>

        <!-- Event list -->
        <div v-if="filteredAssociations.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(item, index) in filteredAssociations" :key="index" class="card w-96 bg-base-100 shadow-xl">
                    <figure><img :src="item.profilePicture" alt="placeholder" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">{{ item.name }}</h2>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary" @click="this.$router.push(`/associazione/${item._id}`)">
                                visita</button>
                        </div>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary" @click="unsubscribeAssociazione(item._id)">
                                unsubscribe</button>
                        </div>
                    </div>
                </div>
        </div>
    <p v-else class="text-gray-500 text-center mt-4">No events found.</p>

    </div>
</template>
