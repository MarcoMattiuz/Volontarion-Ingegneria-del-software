<script>
import { GetEventiEndpoint } from '@/endpoints';
import VisualizzaEvento from './VisualizzaEvento.vue';
export default {
    components: {
        VisualizzaEvento,
    },
    data() {
        return {
            eventi: [],
        };
    },
    mounted() {
        this.getEventi();
    },
    methods: {
        async getEventi() {
            fetch(GetEventiEndpoint, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Eventi:", data);
                    this.eventi = data;
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
        <h2 class="text-2xl font-bold text-center mb-6">Events</h2>

        <!-- Event list -->
        <div v-if="eventi.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="event in eventi" :key="event.id" class="card bg-base-100 shadow-md p-4 border rounded-lg">
                <figure><img :src="event.picture" alt="placeholder" /></figure>
                <div class="card-body">
                    <h3 class="card-title text-lg font-semibold">{{ event.name }}</h3>
                    <p class="text-gray-500"><strong>startDateTime:</strong> {{ event.startDateTime }}</p>
                    <p class="text-gray-500"><strong>endDateTime:</strong> {{ event.endDateTime }}</p>
                    <p class="text-gray-500"><strong>Location:</strong> {{ event.place }}</p>
                    <p class="text-gray-500"><strong>Associazione:</strong> {{ event.hostAssociationName }}</p>
                    <button class="btn btn-danger mt-4" @click="this.$router.push(`/evento/${event._id}`);">
                        ➡️ Visualizza
                    </button>
                </div>

               
        </div>
        </div>
        <p v-else class="text-gray-500 text-center mt-4">No events found.</p>

        
    </div>
</template>
