import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import router from './router/index.js'

//librerie icone
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faHome, faUser, faCog, faBars } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faCog, faUserSecret, faBars);


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)



app.mount('#app')
