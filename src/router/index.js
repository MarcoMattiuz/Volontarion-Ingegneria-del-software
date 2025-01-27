import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import Login from '@/components/login_signup/Login.vue'
import ImageUpload from '@/components/util/ImageUpload.vue'
import Lista_Associazioni from '@/components/ListaAssociazioni.vue'
import RegistrazioneAssociazione from '@/components/login_signup/RegistrazioneAssociazione.vue'
import Registrazione from '@/components/Registrazione.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/imageupload',
      name: 'imageupload',
      component: ImageUpload,
    },
    {
      path: '/home',
      name: 'casa',
      component: Home,
    },
    {
      path: '/associazioni',
      name: 'lista_associazioni',
      component: Lista_Associazioni,
    },
    {
      path: '/registrazione',
      name: 'registrazione',
      component: Registrazione,
    },
    {
      path: '/registrazioneAssociazione',
      name: 'registrazioneAssociazione',
      component: RegistrazioneAssociazione,
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
})

export default router
