<script>
import CreaEvento from './CreaEvento.vue';
import { GetMyEventiEndpoint, CreateEventEndpoint } from '@/endpoints';

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
        window.addEventListener('event_created', (event) => {
            this.eventi.push(event.detail.newEvent)
        });
    },
    methods: {
        async getEventi() {
            try {
                const response = await fetch(GetMyEventiEndpoint, {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.response) console.log('Failed to fetch events');
                this.eventi = await response.json();
                console.log('Eventi:', this.eventi);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
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
                <figure><img :src="event.picture" alt="placeholder"/></figure>
                <div class="card-body">
                    <h3 class="card-title text-lg font-semibold">{{  event.name }}</h3>
                    <p class="text-gray-500"><strong>startDateTime:</strong> {{ event.startDateTime }}</p>
                    <p class="text-gray-500"><strong>endDateTime:</strong> {{ event.endDateTime }}</p>
                    <p class="text-gray-500"><strong>Location:</strong> {{ event.place }}</p>
                </div>
                
            </div>
        </div>

        <p v-else class="text-gray-500 text-center mt-4">No events found.</p>
    </div>
</template>


