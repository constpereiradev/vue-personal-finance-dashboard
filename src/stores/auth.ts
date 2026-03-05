import { defineStore } from "pinia";
import axios from "axios";

interface User {
    id: number, 
    email: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({

        // State guarda os dados da store que podemmudar.
        // User começa como null, depois é preenchido com os dados do usuário.

        user: null as User | null,
    }),

    getters: {
        // São como propriedades computadas da store.
        // isAuthenticated só retorna true se o usuário tiver logado, e false se for null.
        isAuthenticated: (state) => !!state.user
    },

    actions: {
        //São funções que podem ser chamadas de componentes. 
        
        async login(email: string, password: string){
            await axios.post('api/auth/login', {
                username: email,
                password
            })

            await this.fetchUser()
        },

        async fetchUser() {
            const response = await axios.get('api/user')

            this.user = response.data.user
        }
    }
})