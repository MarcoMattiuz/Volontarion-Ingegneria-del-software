<script>
import { GetAssociazioneEndpoint ,SeguiAssociazioneEndpoint} from '@/endpoints';
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
            fetch(`${GetAssociazioneEndpoint}?id=${encodeURIComponent(this.id)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Event:", data);
                    this.profileData = data.users;
                })
                .catch((error) => {
                    console.error("Error fetching :", error.message);
                });

        },

        segui() {
            fetch(SeguiAssociazioneEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials : "include",
                body : JSON.stringify({idAssociazione : this.profileData._id})
            })
                .then((response) => response.json())
                .then((data) => {
                    alert("seguito");
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
                    <img :src=this.profileData.profilePicture />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ this.profileData.name }}</h2>
                    <br>
                    <p>Email : {{ this.profileData.email }}</p>
                    <p>Cellulare : {{ this.profileData.phone }}</p>

                    <div v-if="tipo === 'volontario'" class ="card-actions justify-end">
                        <button class="btn btn-primary" @click=segui>Segui</button>
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

</template>
