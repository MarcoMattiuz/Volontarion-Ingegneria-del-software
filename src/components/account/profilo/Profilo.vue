<script>
import ProfiloAssociazione from './ProfiloAssociazione.vue';
import ProfiloVolontario from './ProfiloVolontario.vue';

export default {
    components: {
        ProfiloVolontario,
        ProfiloAssociazione
  },
    data() {
        return {
            tipo: localStorage.getItem('userType'),
        };
    },
};
</script>

<template>
    <ProfiloVolontario v-if="tipo === 'volontario'"></ProfiloVolontario>
    <ProfiloAssociazione v-else></ProfiloAssociazione>
</template>

<script>

</script>