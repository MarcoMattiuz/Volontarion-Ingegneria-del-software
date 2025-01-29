<script>
import { GetCurrentAssociazione } from '@/endpoints';
import { CambioPasswordAssociazioneEndpoint } from '@/endpoints';
import ChangePassword from './ChangePassword.vue';
export default {
    components:{
        ChangePassword,
    },
    data() {
        return {
            showModalChangePassword : false,
            CambioPasswordEndpoint : CambioPasswordAssociazioneEndpoint,
            profileData: []
        };
    },
    mounted() {
        this.getDataProfilo();
    },

    methods: {
        getDataProfilo() {
            fetch(GetCurrentAssociazione, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Response:", data);
                    this.profileData = data;
                })
                .catch((error) => {
                    console.error("Error:", error.message);
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
                    <img :src=profileData.profilePicture />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ this.profileData.name }}</h2>
                    <br>
                    <p>Email : {{ this.profileData.email }}</p>
                    <p>Cellulare : {{ this.profileData.phone }}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Edit profile</button>
                        <button class="btn btn-primary" @click="this.showModalChangePassword = true">Cambia password</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-3 card card-side bg-base-100">
            <div class="card-body">
                <h2 class="card-title">Descrizione</h2>
                {{ this.profileData.description }}
            </div>
        </div>
        <div class="card card-side bg-base-100">
            <div class="card-body">
                <h2 class="card-title">Obiettivi</h2>
                {{this.profileData.objectives}}
            </div>
        </div>
        <div class="col-span-2 card card-side bg-base-100">
            <div class="card-body">
                <h2 class="card-title">subscriptionIter</h2>
                {{ this.profileData.subscriptionIter }}
            </div>
        </div>
        
    </div>

    <ChangePassword v-if="showModalChangePassword" @close="showModalChangePassword = false;" :endpoint="CambioPasswordEndpoint"></ChangePassword>
</template>
<script>

</script>