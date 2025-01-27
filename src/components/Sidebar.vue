<template>
    <aside id="sidebar" ref="sidebar">
        <ul>
            <li>
                <span class="logo">VolontariOn</span>
                <button @click="toggleSidebar()" id="toggle-btn" ref="toggle-btn">
                    <font-awesome-icon :icon="['fas', 'angles-left']" />
                </button>
            </li>
            <li class="active">
                <a @click="redirectTo('/')">
                    <font-awesome-icon icon="home" />
                    <span>Home</span>
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
                        <li><a @click="redirectTo('/login')">
                                <font-awesome-icon icon="user" />
                                <span>
                                    Area utente
                                </span>
                            </a>                        
                        </li>
                        <li><a @click="redirectTo('/login')">
                                <font-awesome-icon icon="user" />
                                <span>
                                    Area utente
                                </span>
                            </a>                        
                        </li>
                    </div>
                </ul>
            </li>
        </ul>

    </aside>
    


</template>

<script>


export default{

    data(){
        return{
            
            theme: 'gray-900',
            text: 'gray-200',
        }
    },
    methods: {
    redirectTo(url) {
      this.$router.push(url);
    },
    toggleSubMenu(event) {
            const sidebar = document.getElementById('sidebar');
            const toggleButton = document.getElementById('toggle-btn');
            // Ensure event is passed and is valid
            if (!event) return;
            
            // Find the closest dropdown button
            const button = event.target.closest('.dropdown-btn');
            if (!button) return;

            // Toggle submenu
            const subMenu = button.nextElementSibling;
            if (subMenu) {
                subMenu.classList.toggle('show');
                button.classList.toggle('rotate');
            }
            if (sidebar.classList.contains('close')){
                sidebar.classList.toggle('close');
                toggleButton.classList.toggle('rotate');
            }
            
        
    },
    toggleSidebar() {
        const body = document.body;
        const sidebar = document.getElementById('sidebar');
        const toggleButton = document.getElementById('toggle-btn');
        
        if (sidebar) {
            sidebar.classList.toggle('close');
            body.classList.toggle('sidebar-closed');
        }
        if (toggleButton) {
            toggleButton.classList.toggle('rotate');
        }
        this.closeAllSubMenus();
    },
    closeAllSubMenus() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
                ul.classList.remove('show');
                ul.previousElementSibling.classList.remove('rotate');
            });
        }
    },
    toggleDarkMode() {
        document.documentElement.classList.toggle('my-app-dark');
    },
    storethemesetting(){
        localStorage.setItem('theme',this.theme);
        localStorage.setItem('text',this.text);
    },
    getthemesetting(){
        let theme = localStorage.getItem('theme');
        let text = localStorage.getItem('text');
        if(theme){
            this.theme = theme;
            this.text = text;
        }
    }
  }
    
}  
</script>