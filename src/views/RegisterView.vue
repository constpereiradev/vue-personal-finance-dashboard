<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const register = async () => {
    error.value = ''
    success.value = ''

    try {
        await axios.post('api/user/register', {
            email: email.value,
            password: password.value
        })

        success.value = 'Conta criada com sucesso!'

        setTimeout(() => {
            router.push('/login')
        }, 1500)

    } catch (e) {
        error.value = 'Erro ao criar conta'
    }
}
</script>

<template>
    <div class="bg-gray-900 min-h-screen flex items-center justify-center text-white">

        <div class="bg-gray-800 p-8 rounded-lg w-full max-w-sm">

            <h1 class="text-2xl font-bold mb-6 text-center">
                Criar conta
            </h1>

            <form @submit.prevent="register" class="space-y-4">

                <div>
                    <label class="text-sm text-gray-400">Email</label>
                    <input v-model="email" type="email"
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

                <p v-if="success" class="text-green-400 text-sm">
                    {{ success }}
                </p>

                <button type="submit" class="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md font-medium">
                    Criar conta
                </button>

            </form>

        </div>

    </div>
</template>