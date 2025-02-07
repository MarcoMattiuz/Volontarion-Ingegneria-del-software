<script>
import { GetVolontariIscrittiEventoEndpoint } from '@/endpoints';
import VisualizzaVolontario from './VisualizzaVolontario.vue';
export default {
    props : {
        id : String,
    },
    components: {
        VisualizzaVolontario,
    },
    data() {
        return {
            volontari: [],
        };
    },
    mounted() {
        this.getVolontari();
    },
    methods: {
        async getVolontari() {
            fetch(`${GetVolontariIscrittiEventoEndpoint}?id=${encodeURIComponent(this.id)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials:"include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("volontari:", data);
                    this.volontari = data;
                })
                .catch((error) => {
                    console.error("Error fetching events:", error.message);
                });
        },
    }
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-6">
        <h2 class="text-2xl font-bold text-center mb-6">Volontari iscritti</h2>

        <!-- Event list -->
        <div v-if="volontari.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="vol in volontari" :key="vol.id" class="card bg-base-100 shadow-md p-4 border rounded-lg">
                <figure><img :src="vol.profilePicture" alt="placeholder" /></figure>
                <div class="card-body">
                    <h3 class="card-title text-lg font-semibold">{{ vol.name }} {{ vol.surname }}</h3>
                    <p class="text-gray-500"><strong>Email:</strong> {{ vol.email }}</p>
                    <p class="text-gray-500"><strong>Cellulare:</strong> {{ vol.phone }}</p>
                    <button class="btn btn-danger mt-4" @click="this.$router.push(`/volontario/${vol._id}`);">
                        ➡️ Visualizza
                    </button>
                </div>

               
        </div>
        </div>
        <p v-else class="text-gray-500 text-center mt-4">No volontari found.</p>

        
    </div>
</template>
