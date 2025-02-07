<script>
import { ModifyProfileVolontario } from '@/endpoints';
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
            newSkill: "",
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
        addSkill() {
            if (this.newSkill.trim() !== "") {
                this.newData.skills.push(this.newSkill.trim());
                this.newSkill = "";
            }
        },
        removeSkill(index) {
            this.newData.skills.splice(index, 1);
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
            fetch(ModifyProfileVolontario, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                
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
        <div class=" bg-teal-800 p-6 rounded-lg shadow-lg w-full max-w-[800px] max-h-[80vh] overflow-y-auto">
            <h2 class="text-xl font-bold mb-4">Edita Profilo</h2>

            <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

            <div class="flex flex-col items-center justify-center text-center space-y-4">
                <label for="name">Foto Profilo</label>
                <img :src="this.newData.profilePicture"
                    class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover mx-auto" />
                <input type="file" @change="handleFileUpload" accept="image/*" />

                <label for="name">Name</label>
                <input type="text" :placeholder="this.newData.name" v-model.trim="newData.name" class="input-field"
                    required>

                <label for="surname">Surname</label>
                <input type="text" :placeholder="this.newData.surname" v-model.trim="newData.surname"
                    class="input-field" required>

                <label for="age">Age</label>
                <input type="number" :placeholder="this.newData.age" v-model.number="newData.age" class="input-field"
                    min="1" max="200" required>

                <label for="email">Email</label>
                <input type="email" :placeholder="this.newData.email" v-model.trim="newData.email" class="input-field"
                    required>

                <label for="phone">Phone</label>
                <input type="tel" :placeholder="this.newData.phone" v-model.trim="newData.phone" class="input-field">

                <label for="description">Descrizione</label>
                <textarea :placeholder="this.newData.description" v-model="newData.description"
                    class="input-field"></textarea>

                <label for="experience">Experience</label>
                <textarea :placeholder="this.newData.experience" v-model="newData.experience"
                    class="input-field"></textarea>

                <h2 class="text-xl font-semibold">Add Your Skills</h2>
                <label for="skill">Skill:</label>
                <input id="skill" v-model="newSkill" type="text" placeholder="Enter a skill" class="input-field" />
                <button @click="addSkill" type="button" class="btn btn-primary">Add Skill</button>

                <h3 class="text-lg font-semibold">Your Skills:</h3>
                <ul>
                    <li v-for="(skill, index) in this.newData.skills" :key="index" class="flex justify-between w-64">
                        {{ skill }}
                        <button @click="removeSkill(index)" class="btn btn-danger">Remove</button>
                    </li>
                </ul>

                <div class="flex justify-end space-x-2">
                    <button class="btn btn-secondary" @click="closeModal">Annulla</button>
                    <button class="btn btn-primary" @click="editProfile">Salva</button>
                </div>
            </div>



        </div>
    </div>
</template>
