import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Carica tutte le icone solid
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Imposta il limite a 1MB (o più se necessario)
  },
});
