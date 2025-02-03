<script>
import {GetVolontarioEndpoint} from '@/endpoints';
export default {
    props : {
        id : String,
    },
    data() {
        return {
            tipo : sessionStorage.getItem("userType"),
            profileData: {}
        };
    },
    mounted() {
        this.getDataProfilo();
    },

    methods: {
        getDataProfilo() {
            fetch(`${GetVolontarioEndpoint}?id=${encodeURIComponent(this.id)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    alert("volontario:", data);
                    this.profileData = data;
                })
                .catch((error) => {
                    console.error("Error fetching :", error.message);
                });
        },

    }
};
</script>

<template>
    <div class="grid grid-cols-3 gap-4">
        <div class=col-span-3>
            <div class="card card-side bg-base-100 shadow-xl">
                <figure class="w-1/3 h-full">
                    <img :src=this.profileData.profilePicture />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ this.profileData.name }}</h2>
                    <br>
                    <p>Email : {{ this.profileData.email }}</p>
                    <p>Cellulare : {{ this.profileData.phone }}</p>
                </div>

            </div>
        </div>
        <div class="card card-side bg-base-100">
            <div class="card-body">
                <h2 class="card-title">Skills</h2>
                <div v-for="(item, index) in this.profileData.skills" :key="index">
                    {{ item }}
                </div>
            </div>
        </div>
        <div class="col-span-2 card card-side bg-base-100">
            <div class="card-body">
                <h2 class="card-title">Descrizione</h2>
                {{ this.profileData.description }}
            </div>
        </div>
        <div class="col-span-3 card card-side bg-base-100">
            <div class="card-body">
                <h2 class="card-title">Esperienza</h2>
                {{ this.profileData.experience }}
            </div>
        </div> 
        
    </div>

</template>
