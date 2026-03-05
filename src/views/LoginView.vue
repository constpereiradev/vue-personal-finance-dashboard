<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'


const username = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
    try {
        await axios.post('api/auth/login', {
            username: username.value,
            password: password.value
        })

        //router.push('/dashboard') // ou a rota que quiser após login
    } catch (e) {
        error.value = 'Usuário ou senha inválidos'
    }
}
</script>

<template>
    <div class="bg-gray-900 min-h-screen flex items-center justify-center text-white">

        <div class="bg-gray-800 p-8 rounded-lg w-full max-w-sm">

            <h1 class="text-2xl font-bold mb-6 text-center">
                Login
            </h1>

            <form @submit.prevent="login" class="space-y-4">

                <div>
                    <label class="text-sm text-gray-400">Email</label>
                    <input v-model="username" type="email"
                        class="w-full mt-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500" />
                </div>

                <div>
                    <label class="text-sm text-gray-400">Senha</label>
                    <input v-model="password" type="password"
                        class="w-full mt-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500" />
                </div>

                <p v-if="error" class="text-red-400 text-sm">
                    {{ error }}
                </p>

                <button type="submit" class="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md font-medium">
                    Entrar
                </button>

            </form>

        </div>

    </div>
</template>