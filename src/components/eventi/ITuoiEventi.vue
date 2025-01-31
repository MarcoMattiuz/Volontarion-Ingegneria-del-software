<script>
import CreaEvento from './CreaEvento.vue';
import { GetMyEventiEndpoint, DeleteEventEndpoint } from '@/endpoints';

export default {
    components: {
        CreaEvento,
    },
    data() {
        return {
            showModalCreaEvento: false,
            eventi: [],
        };
    },
    mounted() {
        this.getEventi();
        window.addEventListener('update', (event) => {
            this.getEventi()
        });
    },
    methods: {
        async getEventi() {
            fetch(GetMyEventiEndpoint, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
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

        async deleteEvent(eventId) {
            fetch(DeleteEventEndpoint, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body :  JSON.stringify({"eventId" : eventId}),
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    if(data.response == "ok"){
                        alert("Evento eliminato");
                        this.getEventi();
                    }
                    
                    if(data.error){
                        this.getEventi();
                    }
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
        <h2 class="text-2xl font-bold text-center mb-6">My Events</h2>

        <!-- Button to open the create event modal -->
        <button class="btn btn-primary w-full mb-4" @click="showModalCreaEvento = true">
            ➕ Create Event
        </button>

        <!-- Event creation modal -->
        <CreaEvento v-if="showModalCreaEvento" @close="showModalCreaEvento = false" />

        <!-- Event list -->
        <div v-if="eventi.length > 0 && showModalCreaEvento == false" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="event in eventi" :key="event.id" class="card bg-base-100 shadow-md p-4 border rounded-lg">
                <figure><img :src="event.picture" alt="placeholder" /></figure>
                <div class="card-body">
                    <h3 class="card-title text-lg font-semibold">{{ event.name }}</h3>
                    <p class="text-gray-500"><strong>startDateTime:</strong> {{ event.startDateTime }}</p>
                    <p class="text-gray-500"><strong>endDateTime:</strong> {{ event.endDateTime }}</p>
                    <p class="text-gray-500"><strong>Location:</strong> {{ event.place }}</p>
                    <button class="btn btn-danger mt-4" @click="deleteEvent(event._id)">
                        ❌ Delete Event {{event._id}}
                    </button>
                </div>

            </div>
        </div>

        <p v-else class="text-gray-500 text-center mt-4">No events found.</p>
    </div>
</template>
