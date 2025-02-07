<script>
import { ModifyProfileAssociazione } from '@/endpoints';
export default {
    props: {
        profileData: Object,
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            newData: {},
            errorMessage: "",
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = () => {
                    const base64String = reader.result;

                    this.newData.profilePicture = base64String;
                }
                reader.readAsDataURL(file);
            }
        },
        closeModal() {
            //notifica parent di cambiare stato
            this.newSkill = '';
            this.newData = {};

            this.errorMessage = '';

            this.$emit("close");
        },
        async editProfile() {
            var data = {};
            for (const key in this.newData) {
                if (JSON.stringify(this.newData[key]) !== JSON.stringify(this.profileData[key])) {
                    data[key] = this.newData[key];
                }


            }
            console.log();
            if (Object.keys(data).length === 0) {
                console.log("nessuna modifica");
                return;
            }
            fetch(ModifyProfileAssociazione, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ "data": data })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.response) {
                        alert("Profilo cambiato");
                        this.closeModal();
                    } else {
                        this.errorMessage = data.error || "Errore edit profilo";
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    this.errorMessage = "Network error.";
                });
        },

        init() {
            this.newData = JSON.parse(JSON.stringify(this.profileData));
            console.log(this.newData);
        },
    }
};
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-teal-800 p-6 rounded-lg shadow-lg w-full max-w-[800px] max-h-[80vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Edita Profilo</h2>
  
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  
        <div class="flex flex-col items-center justify-center text-center space-y-4">
          <!-- Profile Picture -->
          <div class="flex flex-col items-center space-y-2">
            <label for="profilePicture" class="text-white">Foto Profilo</label>
            <img
              :src="newData.profilePicture"
              class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover mx-auto"
              alt="Profile Picture"
            />
            <input type="file" @change="handleFileUpload" accept="image/*" class="mt-2" />
          </div>
  
          <!-- Name -->
          <div class="w-full sm:w-3/4 md:w-1/2">
            <label for="name" class="text-white">Name</label>
            <input
              type="text"
              v-model.trim="newData.name"
              required
              class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          <!-- Email -->
          <div class="w-full sm:w-3/4 md:w-1/2">
            <label for="email" class="text-white">Email</label>
            <input
              type="email"
              v-model.trim="newData.email"
              required
              class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          <!-- Phone -->
          <div class="w-full sm:w-3/4 md:w-1/2">
            <label for="phone" class="text-white">Phone</label>
            <input
              type="tel"
              v-model.trim="newData.phone"
              class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          <!-- Password -->
          <div class="w-full sm:w-3/4 md:w-1/2">
            <label for="password" class="text-white">Password</label>
            <input
              type="password"
              v-model="newData.password"
              required
              class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          <!-- Description -->
          <div class="w-full sm:w-3/4 md:w-1/2">
            <label for="description" class="text-white">Descrizione</label>
            <textarea
              v-model="newData.description"
              class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>
  
          <!-- Objectives -->
          <div class="w-full sm:w-3/4 md:w-1/2">
            <label for="objectives" class="text-white">Obiettivi</label>
            <textarea
              v-model="newData.objectives"
              class="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>
  
  
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-2 mt-4">
            <button
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              @click="closeModal"
            >
              Annulla
            </button>
            <button
              class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              @click="editProfile"
            >
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
