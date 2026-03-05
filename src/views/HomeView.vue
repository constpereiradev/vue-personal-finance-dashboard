<script setup lang="ts">
import GranoHeader from '@/components/GranoHeader.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => {
  login()
})

const login = () => {
  axios.post('api/auth/login', {
    username: 'admin@example.com',
    password: '1234'
  })
}
</script>

<template>
  <div class="bg-gray-900 min-h-screen text-white w-full">

    <GranoHeader />


    <main class="max-w-4xl mx-auto text-center py-32 px-6">

      <h1 class="text-4xl font-bold mb-6">
        Organize suas finanças num só lugar
      </h1>

      <p class="text-gray-400 mb-10">
        Cadastre gastos e rendimentos e tenha controle financeiro.
      </p>

      <div class="flex justify-center gap-4">
        <RouterLink to="/register" class="text-white">
          <button class="bg-indigo-500 px-6 py-3 rounded-md">
            Começar
          </button>
        </RouterLink>

        <button class="border border-gray-600 px-6 py-3 rounded-md">
          Saber mais
        </button>
      </div>

    </main>

  </div>
</template>