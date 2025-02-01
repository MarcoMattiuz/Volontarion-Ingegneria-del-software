<script>
import {GetMyEventiAssociazioneVolontario,unsubscribeEventEndpoint } from '@/endpoints';
export default {
    components: {
        
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
            await fetch(GetMyEventiAssociazioneVolontario, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
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
        async unsubscribeEvent(eventId) {
            await fetch(unsubscribeEventEndpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body : JSON.stringify({id : eventId})
            })
                .then((response) => response.json())
                .then((data) => {
                    alert("disiscritto");
                    this.getEventi();
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
        <h2 class="text-2xl font-bold text-center mb-6">My Events</h2>

        <!-- Event list -->
        <div v-if="eventi.length > 0 "class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="event in eventi" :key="event.id" class="card bg-base-100 shadow-md p-4 border rounded-lg">
                <figure><img :src="event.picture" alt="placeholder" /></figure>
                <div class="card-body">
                    <h3 class="card-title text-lg font-semibold">{{ event.name }}</h3>
                    <p class="text-gray-500"><strong>startDateTime:</strong> {{ event.startDateTime }}</p>
                    <p class="text-gray-500"><strong>endDateTime:</strong> {{ event.endDateTime }}</p>
                    <p class="text-gray-500"><strong>Location:</strong> {{ event.place }}</p>
                    <button class="btn btn-danger mt-4" @click="unsubscribeEvent(event._id)">
                        ❌ Disiscriviti
                    </button>
                </div>

               
        </div>
        </div>
        <p v-else class="text-gray-500 text-center mt-4">No events found.</p>
        
    </div>
</template>
