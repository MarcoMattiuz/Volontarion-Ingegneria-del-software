<script>
import IMieiEventiAssociazione from './IMieiEventiAssociazione.vue';
import IMieiEventiVolontario from './IMieiEventiVolontario.vue';
export default {
    components: {
        IMieiEventiAssociazione,
        IMieiEventiVolontario
    },
    data() {
        return {
            tipo : sessionStorage.getItem('userType')
        };
    },
    mounted() {

    },
    methods: {
       
    }
}
</script>

<template>
    <IMieiEventiAssociazione v-if="tipo == 'associazione'"></IMieiEventiAssociazione>
    <IMieiEventiVolontario v-else></IMieiEventiVolontario>
</template>
