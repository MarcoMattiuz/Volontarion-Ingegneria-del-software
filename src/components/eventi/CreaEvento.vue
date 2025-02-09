<script>
import { CreateEventEndpoint } from '@/endpoints';

export default {
    data() {
        return {
            name: "",
            picture: "",
            startDateTime: "",
            endDateTime: "",
            place: "",
            description: "",
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = () => {
                    const base64String = reader.result;

                    this.picture = base64String;
                }
                reader.readAsDataURL(file);
            }
        },

        closeModal() {
            this.picture = "";
            this.name = '';
            this.startDateTime = '';
            this.endDateTime = '';
            this.place = '';
            this.description = "";

            //notifica parent di cambiare stato
            this.$emit("close");
        },
        CreaEvento() {
            const eventData = {
                name: this.name,
                startDateTime: this.startDateTime,
                endDateTime: this.endDateTime,
                place: this.place,
                description: this.description,
                picture: this.picture,
            };
            fetch(CreateEventEndpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                
                body: JSON.stringify(eventData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.response === "OK") {
                        alert("Evento creato!");
                        window.dispatchEvent(new CustomEvent('update'));
                        this.closeModal();
                    }else{
                        alert("Errore creazione evento");
                    }
                  
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    }
};
</script>

<template>

    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-teal-800 p-6 rounded-lg shadow-lg w-full max-w-[800px] max-h-[80vh] overflow-y-auto">
            <h2 class="text-xl font-bold mb-4">Crea evento</h2>

            <div class="flex flex-col items-center justify-center text-center space-y-4">
                <!-- Picture -->
                <div class="flex flex-col items-center space-y-2">
                    <label for="picture" class="text-white">Foto Profilo</label>
                    <img :src="picture" class=" object-cover mx-auto" alt="Profile Picture" />
                    <input type="file" @change="handleFileUpload" accept="image/*" class="mt-2" />
                </div>

                <!-- Name -->
                <div class="w-full sm:w-3/4 md:w-1/2">
                    <label for="name" class="text-white">Nome</label>
                    <input type="text" v-model.trim="name" required
                        class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>

                <!-- startDateTime -->
                <div class="w-full sm:w-3/4 md:w-1/2">
                    <label for="startDateTime" class="text-white">Data e tempo di inizio</label>
                    <input type="datetime-local" v-model.trim="startDateTime" required
                        class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>

                <!-- startDateTime -->
                <div class="w-full sm:w-3/4 md:w-1/2">
                    <label for="endDateTime" class="text-white">Data e tempo di fine</label>
                    <input type="datetime-local" v-model.trim="endDateTime" required
                        class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>

                <div class="w-full sm:w-3/4 md:w-1/2">
                    <label for="place" class="text-white">Luogo</label>
                    <input type="text" v-model="place" required
                        class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"></input>
                </div>
                <!-- Description -->
                <div class="w-full sm:w-3/4 md:w-1/2">
                    <label for="description" class="text-white">Descrizione</label>
                    <textarea v-model="description"
                        class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-2 mt-4">
                    <button class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" @click="closeModal">
                        Annulla
                    </button>
                    <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600" @click="CreaEvento">
                        Crea
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
