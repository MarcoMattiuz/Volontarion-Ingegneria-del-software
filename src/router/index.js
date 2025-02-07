import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/components/HomeView.vue";
import Login from "@/components/login/Login.vue";
import ListaAssociazioni from "@/components/ListaAssociazioni.vue";

import Registrazione from "@/components/registrazione/Registrazione.vue";
import Profilo from "@/components/account/profilo/Profilo.vue";
import IMieiEventi from "@/components/eventi/IMieiEventi.vue";
import ListaEventi from "@/components/eventi/ListaEventi.vue";
import VisualizzaEvento from "@/components/eventi/VisualizzaEvento.vue";
import VisualizzaAssociazione from "@/components/account/VisualizzaAssociazione.vue";
import EventiAssociazioniIscritte from "@/components/eventi/EventiAssociazioniIscritte.vue";
import VisualizzaVolontario from "@/components/account/VisualizzaVolontario.vue";
import IscrittiEvento from "@/components/account/IscrittiEvento.vue";
import AssociazioniSeguite from "@/components/account/AssociazioniSeguite.vue";
import EventiAssociazione from "@/components/eventi/EventiAssociazione.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ListaEventi,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    /* {
      path: '/home',
      name: 'casa',
      component: Home,
    }, */
    {
      path: "/listaAssociazioni",
      name: "lista_associazioni",
      component: ListaAssociazioni,
    },
    {
      path: "/registrazione",
      name: "registrazione",
      component: Registrazione,
    },
    {
      path: "/profilo",
      name: "profilo",
      component: Profilo,
    },
    {
      path: "/i_miei_eventi",
      name: "eventi dell utente",
      component: IMieiEventi,
    },
    {
      path: "/eventiAssociazioniIscritte",
      name: "eventiAssociazioniIscritte",
      component: EventiAssociazioniIscritte,
    },
    {
      path: "/evento/:id",
      name: "Evento",
      component: VisualizzaEvento,
      props: true, // Pass route params as props
    },
    {
      path: "/associazione/:id",
      name: "associazione",
      component: VisualizzaAssociazione,
      props: true, // Pass route params as props
    },
    {
      path: "/volontario/:id",
      name: "volontario",
      component: VisualizzaVolontario,
      props: true,
    },
    {
      path: "/iscrittiEvento/:id",
      name: "volontari iscritti a evento",
      component: IscrittiEvento,
      props: true,
    },
    {
      path: "/associazioni_seguite",
      name: "associazioni_seguite",
      component: AssociazioniSeguite,
    },
    {
      path: "/EventiAssociazione/:id",
      name: "EventiAssociazione",
      component: EventiAssociazione,
      props: true, 

    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },*/
  ],
});

export default router;
