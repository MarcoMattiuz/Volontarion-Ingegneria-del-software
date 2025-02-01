<script>
import ITuoiEventiAssociazione from './ITuoiEventiAssociazione.vue';
import ITuoiEventiVolontario from './ITuoiEventiVolontario.vue';
export default {
    components: {
        ITuoiEventiAssociazione,
        ITuoiEventiVolontario
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
    <ITuoiEventiAssociazione v-if="tipo == 'associazione'"></ITuoiEventiAssociazione>
    <ITuoiEventiVolontario v-else></ITuoiEventiVolontario>
</template>
