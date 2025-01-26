<script>
import { DeleteAccountEndpoint, GetProfilePictureEndpoint } from '@/endpoints';


export default {
    methods: {
        handleSubmit() {
            if (confirm("are you sure")) {
                fetch(DeleteAccountEndpoint, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Response:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error.message);
                    });
            }

        },

    }
}
</script>

<template>
    <button class="btn btn-primary" v-on:click="handleSubmit">Delete Account</button>
</template>
