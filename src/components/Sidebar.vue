<script>
import { LogOutEndpoint } from '@/endpoints';
export default {
  data() {
    return {
      tipo: sessionStorage.getItem("userType"),
      theme: "gray-900",
      text: "gray-200",
    };
  },
  mounted() {
    //update di tipe se userType è cambiato (da Login)
    window.addEventListener("userTypeChanged", (event) => {
      this.tipo = event.detail.userType;
    });
  },
  methods: {
    async logout() {
      await fetch(LogOutEndpoint, {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    if(data.response){
                      alert("log out");
                      this.tipo = undefined;
                      this.$router.push("/");
                    }
                })
                .catch((error) => {
                    console.error("Error loggint out:", error.message);
                });
    },

    onStorageChange(event) {
      if (event.key === "userType") {
        this.tipo = event.newValue;
      }
    },
    redirectTo(url) {
      this.$router.push(url);
    },
    toggleSubMenu(event) {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("toggle-btn");
      // Ensure event is passed and is valid
      if (!event) return;

      // Find the closest dropdown button
      const button = event.target.closest(".dropdown-btn");
      if (!button) return;

      // Toggle submenu
      const subMenu = button.nextElementSibling;
      if (subMenu) {
        subMenu.classList.toggle("show");
        button.classList.toggle("rotate");
      }
      if (sidebar.classList.contains("close")) {
        sidebar.classList.toggle("close");
        toggleButton.classList.toggle("rotate");
      }
    },
    toggleSidebar() {
      const body = document.body;
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("toggle-btn");

      if (sidebar) {
        sidebar.classList.toggle("close");
        body.classList.toggle("sidebar-closed");
      }
      if (toggleButton) {
        toggleButton.classList.toggle("rotate");
      }
      this.closeAllSubMenus();
    },
    closeAllSubMenus() {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
          ul.classList.remove("show");
          ul.previousElementSibling.classList.remove("rotate");
        });
      }
    },
    toggleDarkMode() {
      document.documentElement.classList.toggle("my-app-dark");
    },
    storethemesetting() {
      localStorage.setItem("theme", this.theme);
      localStorage.setItem("text", this.text);
    },
    getthemesetting() {
      let theme = localStorage.getItem("theme");
      let text = localStorage.getItem("text");
      if (theme) {
        this.theme = theme;
        this.text = text;
      }
    },
  },
};
</script>
<template>
  <aside id="sidebar" ref="sidebar">
    <ul>
      <li>
        <span class="logo">VolontariOn</span>
        <button @click="toggleSidebar()" id="toggle-btn" ref="toggle-btn">
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>
      </li>
      <div class="circle-image-container">
        <img
          src="/accountPlaceholder.jpg"
          alt="Placeholder Image"
          class="circle-image"
        />
      </div>
      <li class="active">
        <a @click="redirectTo('/')">
          <font-awesome-icon icon="home" />
          <span>Home</span>
        </a>
      </li>
      <li class="active">
        <a @click="redirectTo('/listaAssociazioni')">
          <font-awesome-icon icon="hands-helping" />
          <span>Lista associazioni</span>
        </a>
      </li>
      <li class="active">
        <a @click="redirectTo('/eventiAssociazioniIscritte')">
          <font-awesome-icon icon="home" />
          <span>Eventi associazioni iscritte</span>
        </a>
      </li>

      <li>
        <button @click="toggleSubMenu($event)" class="dropdown-btn">
          <font-awesome-icon icon="user" />
          <span>Area utente</span>
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </button>
        <ul class="sub-menu">
          <div>
            <li v-if="tipo">
              <a @click="redirectTo('/profilo')">
                <font-awesome-icon icon="user" />
                <span>Profilo</span>
              </a>
            </li>
            <li v-if="tipo">
              <a @click="redirectTo('/i_miei_eventi')">
                <font-awesome-icon icon="user" />
                <span>I miei eventi</span>
              </a>
            </li>
            <li v-if="tipo === 'volontario'">
              <a @click="redirectTo('/associazioni_seguite')">
                <font-awesome-icon icon="user" />
                <span>associazioni_seguite</span>
              </a>
            </li>
          </div>
        </ul>
      </li>
      <li class="active">
        <a @click="redirectTo('/login')">
          <font-awesome-icon icon="fa-right-to-bracket" />
          <span>Login</span>
        </a>
      </li>
      <li v-if="tipo" class="active">
        <a @click="logout">
          <font-awesome-icon icon="fa-right-to-bracket" />
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </aside>

  <!-- <div class="fixed top-0 left-0 h-screen w-16 m-0 p-0 flex flex-col shadow"
        :class="`bg-${theme}`,`text-${text}`">
        <div class="sidebar-icon group">
            <font-awesome-icon icon="bars" />
            <span class="sidebar-tooltip group-hover:scale-100">
                Sidebar
            </span>
        </div>
        <div class="sidebar-icon group" @click="redirectTo('/')">
            <font-awesome-icon icon="home" />
            <span class="sidebar-tooltip group-hover:scale-100">
                Home
            </span>
        </div>
        <div class="sidebar-icon group" @click="redirectTo('/login')">
            <font-awesome-icon icon="fa-right-to-bracket" />
            <span class="sidebar-tooltip group-hover:scale-100">
                login
            </span>
        </div>
        <div class="sidebar-icon group" @click="redirectTo('/profilo')">
            <font-awesome-icon icon="user" />
            <span class="sidebar-tooltip group-hover:scale-100">
                Profilo
            </span>
        </div>
        <div class="sidebar-icon group">
            <font-awesome-icon icon="cog" />
            <span class="sidebar-tooltip group-hover:scale-100">
                Account
            </span>
        </div>
        <div class="sidebar-icon group" @click="redirectTo('/listaAssociazioni')">
            <font-awesome-icon icon="spinner" />
            pagina lista associazioni
            <span class="sidebar-tooltip group-hover:scale-100">
                pagina lista associazioni
            </span>
        </div>
        <div class="sidebar-icon group" @click="redirectTo('/registrazioneAssociazione')">
            <font-awesome-icon icon="spinner" />
            registrazioneAssociazione
            <span class="sidebar-tooltip group-hover:scale-100">
                registrazioneAssociazione
            </span>
        </div>
        <i class="fa-solid fa-user-plus"></i>
        <div class="sidebar-toggle sidebar-footer mt-auto " @click="changetheme()">
            <label class="grid cursor-pointer place-items-center">
                <input
                    type="checkbox"
                    value="synthwave"
                    class="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1" />
                <svg
                    class="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg
                    class="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                </label>
        </div>
    </div> -->
</template>
