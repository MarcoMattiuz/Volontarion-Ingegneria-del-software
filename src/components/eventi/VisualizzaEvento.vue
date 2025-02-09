<script>
import { GetEventEndpoint, subscribeEventEndpoint } from "@/endpoints";
import { formattedDateTime } from "../util/formattedDateTime";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      tipo: sessionStorage.getItem("userType"),
      event: {},
    };
  },
  mounted() {
    this.getEvent();
  },
  methods: {
    formattedDate(date) {
      return formattedDateTime(date);
    },
    async getEvent() {
      fetch(`${GetEventEndpoint}?id=${encodeURIComponent(this.id)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Event:", data);
          this.event = data;
        })
        .catch((error) => {
          console.error("Error fetching event:", error.message);
        });
    },
    async subscribeEvent() {
      fetch(subscribeEventEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: this.event._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            alert("iscrizione avvenuta con successo");
          }
        })
        .catch((error) => {
          console.error("Error fetching event:", error.message);
        });
    },
  },
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="py-4">
      <div class="mx-auto text-center">
        <h1 class="text-3xl font-bold">Event</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center p-6">
      <div class="card w-full max-w-3xl shadow-xl rounded-lg p-6 border">
        <!-- Event Image -->
        <figure
          v-if="event.picture"
          class="w-full h-80 overflow-hidden rounded-lg"
        >
          <img
            :src="event.picture"
            alt="Event Image"
            class="w-full h-full object-cover"
          />
        </figure>

        <div class="card-body text-center space-y-4">
          <!-- Event Name -->
          <h2 class="text-3xl font-bold">{{ event.name }}</h2>

          <!-- Host (If Available) -->
          <p class="text-lg">
            <strong>Hosted by:</strong> {{ event.hostAssociationName }}
            <a
              @click="
                this.$router.push(`/associazione/${event.hostAssociation}`)
              "
              ><strong>Go to </strong> {{ event.hostAssociationName }}</a
            >
          </p>

          <!-- Event Date & Time -->
          <div class="text-lg">
            <p>
              <strong>🕒 Start:</strong>
              {{ formattedDate(event.startDateTime) }}
            </p>
            <p>
              <strong>⏳ End:</strong> {{ formattedDate(event.startDateTime) }}
            </p>
          </div>

          <!-- Event Location -->
          <p class="text-lg"><strong>📍 Location:</strong> {{ event.place }}</p>

          <!-- Description -->
          <p v-if="event.description" class="text-base mt-4">
            {{ event.description }}
          </p>

          <!-- Action Buttons -->
          <div
            v-if="
              tipo === 'volontario' && new Date(event.endDateTime) > new Date()
            "
            class="flex justify-center space-x-4 mt-6"
          >
            <button class="btn btn-outline" @click="subscribeEvent">
              Iscriviti
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
