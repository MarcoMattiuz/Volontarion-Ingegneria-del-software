<script>
import { checkIfLoggedIn } from '@/checkLogged';
export default {
    data() {
        return {
            logged: false,
        };
    },
    methods: {
        f() {
            this.logged = checkIfLoggedIn();
        },
    }
}
</script>

<template>
    <button @click="f()">sei loggato?</button>
    <p v-if="logged">sei loggato</p>
    <p v-else>non sei loggato</p>
</template>

<style scoped></style>
