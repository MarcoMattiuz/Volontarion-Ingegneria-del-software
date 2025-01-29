<script>
export default {
    props: {
    endpoint: String,
  },
    data() {
        return {
            password: "",
            newPassword: '',
            confirmPassword: '',
            errorMessage: '',
        };
    },
    methods: {
        closeModal() {
            //notifica parent di cambiare stato
            this.newPassword = '';
            this.password = '';
            this.confirmPassword = '';
            this.errorMessage = '';

            this.$emit("close");
        },
        changePassword() {
            if (this.newPassword !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match!";
                return;
            }

            fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ password: this.password, newPassword: this.newPassword }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.res) {
                        alert("Password changed successfully!");
                        this.closeModal();
                    } else {
                        this.errorMessage = data.message || "Error changing password.";
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    this.errorMessage = "Network error.";
                });
        }
    }
};
</script>

<template>

    <!-- Password Change Modal -->
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class=" bg-teal-800 p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">Cambia Password</h2>

            <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

            <label class="block mb-2">Vecchia Password</label>
            <input v-model="password" type="password" class="w-full p-2 border rounded mb-4" />

            <label class="block mb-2">Nuova Password</label>
            <input v-model="newPassword" type="password" class="w-full p-2 border rounded mb-4" />

            <label class="block mb-2">Conferma Password</label>
            <input v-model="confirmPassword" type="password" class="w-full p-2 border rounded mb-4" />

            <div class="flex justify-end space-x-2">
                <button class="btn btn-secondary" @click="closeModal">Annulla</button>
                <button class="btn btn-primary" @click="changePassword">Salva</button>
            </div>
        </div>
    </div>
</template>
