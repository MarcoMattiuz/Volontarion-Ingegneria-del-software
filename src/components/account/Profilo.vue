<script>
import { GetCurrentAssociazione } from '@/endpoints';
import { GetCurrentVolontario } from '@/endpoints';

export default {
    data() {
        return {
            tipo: localStorage.getItem('userType'),
            profileData: []
        };
    },
    mounted() {
        this.getDataProfilo();
    },

    methods: {
        getDataProfilo() {
            var endpoint = "";
            if (this.tipo == "volontario") endpoint = GetCurrentVolontario;
            else endpoint = GetCurrentAssociazione;

            fetch(endpoint, {
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
    <div class="grid grid-cols-4 gap-4">
        <div class=col-span-3>
            <div class="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ this.profileData.name }} {{ this.profileData.surname }}</h2>
                    <br>
                    <p>Email : {{ this.profileData.email }}</p>
                    <p>Cellulare : {{ this.profileData.surname }}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Edit profile</button>
                    </div>
                </div>
            </div>
        </div>
        <div>associazioni</div>
        <div>skill</div>
        <div class=col-span-2>presentazione</div>
        <div class="col-span-3">esperienza</div>
        <div class="">eventi</div>
    </div>
</template>

<script>

</script>