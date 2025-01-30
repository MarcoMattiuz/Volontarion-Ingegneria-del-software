<script>
    import CreaEvento from './CreaEvento.vue';

    export default {
    components:{
        CreaEvento,
    },
    data() {
        return {
            showModalCreaEvento : true,
        };
    },
    mounted() {
        
    },
    methods: {
        
    }
};
</script>


<template>
        <button class="btn btn-primary" @click="this.showModalCreaEvento = true;">Crea Evento</button>
        <CreaEvento  v-if="showModalCreaEvento" @close="showModalCreaEvento = false;" ></CreaEvento>
</template>
