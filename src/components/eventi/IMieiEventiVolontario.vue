<script>
import { GetMyEventiAssociazioneVolontario, unsubscribeEventEndpoint } from '@/endpoints';
export default {
    components: {

    },
    data() {
        return {
            eventi: [],
            searchQuery: "",  // For searching by event name
            filterOption: "all",  // For filtering by Expired, Upcoming, or All events
        };
    },
    mounted() {
        this.getEventi();
    },
    computed: {
        filteredEvents() {
            return this.eventi.filter(event => {
                // Filter by search query
                const matchesSearch = event.name.toLowerCase().includes(this.searchQuery.toLowerCase());

                // Filter by event status (expired or upcoming)
                const matchesStatus = this.filterOption === "all" ||
                    (this.filterOption === "expired" && (new Date(event.endDateTime) < new Date())) ||
                    (this.filterOption === "upcoming" && (new Date(event.startDateTime) >= new Date(event)));
                return matchesSearch && matchesStatus;
            });
        }
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
                body: JSON.stringify({ id: eventId })
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
        <!-- Search Bar -->
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search by event name..."
                class="input input-bordered w-full mb-2" />
        </div>

        <!-- Filter Dropdown for Expired or Upcoming events -->
        <div class="mb-4">
            <select v-model="filterOption" class="input input-bordered w-full mb-2">
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming Events</option>
                <option value="expired">Expired Events</option>
            </select>
        </div>

        <!-- Event list -->
        <div v-if="filteredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="event in filteredEvents" :key="event.id" class="card bg-base-100 shadow-md p-4 border rounded-lg">
                <figure><img :src="event.picture" alt="placeholder" /></figure>
                <div class="card-body">
                    <h3 class="card-title text-lg font-semibold">{{ event.name }}</h3>
                    <p class="text-gray-500"><strong>startDateTime:</strong> {{ event.startDateTime }}</p>
                    <p class="text-gray-500"><strong>endDateTime:</strong> {{ event.endDateTime }}</p>
                    <p class="text-gray-500"><strong>Location:</strong> {{ event.place }}</p>
                    <p v-if="new Date(event.endDateTime) < new Date()" class="text-red-500 text-sm">
            <strong>Expired</strong>
          </p>
                    <button class="btn btn-danger mt-4" @click="unsubscribeEvent(event._id)">
                        ❌ Disiscriviti
                    </button>
                    <button class="btn btn-danger mt-4" @click="this.$router.push(`/evento/${event._id}`);">
                        ➡️ Visualizza
                    </button>
                </div>


            </div>
        </div>
        <p v-else class="text-gray-500 text-center mt-4">No events found.</p>

    </div>
</template>
