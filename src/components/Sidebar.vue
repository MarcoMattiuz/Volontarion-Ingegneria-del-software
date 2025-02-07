<script>
import { LogOutEndpoint } from "@/endpoints";


export default {
  data() {
    return {
      tipo: sessionStorage.getItem("userType"),
      isMobile: window.innerWidth < 820,
      isOpen: window.innerWidth >= 820,
      theme: "gray-900",
      text: "gray-200",
      isLoggedIn: !!sessionStorage.getItem("userType"),
    };
  },
  
  mounted() {
    //update di tipe se userType è cambiato (da Login)
    window.addEventListener("userTypeChanged", (event) => {
      this.tipo = event.detail.userType;
      this.isLoggedIn = !!sessionStorage.getItem("userType");
    });
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount(){
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    async logout() {
      await fetch(LogOutEndpoint, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
       
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            alert("log out");
            this.tipo = undefined;
            sessionStorage.removeItem("userType"); // Rimuovi il tipo di utente dalla sessione
            localStorage.removeItem("token");
            this.isLoggedIn = false; // Imposta lo stato di login su false
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
    handleResize() {
      this.isMobile = window.innerWidth < 820;
      this.isOpen = window.innerWidth >= 820; // Se è desktop, la sidebar è aperta
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
  <aside id="sidebar" ref="sidebar" :class="[
        'transition-transform duration-300 fixed left-0 top-0 h-full bg-gray-800 text-white', 
        isOpen ? 'translate-x-0' : '-translate-x-full', 
        isMobile ? 'w-16' : 'w-64'
      ]">
    <ul>
      <li>
        <span class="logo">VolontariOn</span>
        <button  @click="toggleSidebar()" id="toggle-btn" ref="toggle-btn">
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
          <font-awesome-icon icon="bolt" />
          <span>Events</span>
        </a>
      </li>
      <li class="active">
        <a @click="redirectTo('/listaAssociazioni')">
          <font-awesome-icon icon="hands-helping" />
          <span>Lista associazioni</span>
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
                <font-awesome-icon icon="id-badge" />
                <span>Profilo</span>
              </a>
            </li>
            <li v-if="tipo">
              <a @click="redirectTo('/i_miei_eventi')">
                <font-awesome-icon icon="bolt" />
                <span>I miei eventi</span>
              </a>
            </li>
            <li v-if="tipo === 'volontario'">
              <a @click="redirectTo('/associazioni_seguite')">
                <font-awesome-icon icon="hands-helping" />
                <span>Associazioni seguite</span>
              </a>
            </li>
          </div>
        </ul>
      </li>
      <li class="active" v-if="!isLoggedIn">
        <a @click="redirectTo('/login')">
          <font-awesome-icon icon="fa-right-to-bracket" />
          <span>Login</span>
        </a>
      </li>
      <li v-if="tipo" class="active">
        <a @click="logout">
          <font-awesome-icon icon="fa-right-from-bracket" />

          <span>Logout</span>
        </a>
      </li>
    </ul>
  </aside>

</template>
