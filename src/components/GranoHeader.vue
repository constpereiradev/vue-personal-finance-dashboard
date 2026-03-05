<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>


<template>
    <header class="border-b border-gray-800 mb-8">
        <nav class="max-w-6xl mx-auto flex items-center justify-between p-6">

            <h1 class="text-xl font-bold">
                Grano
            </h1>

            <div class="flex gap-6 text-sm">
                <a href="#">Produto</a>
                <a href="#">Funcionalidades</a>
                <a href="#">Contato</a>
            </div>

            <RouterLink to="/login">
                <button class="bg-indigo-500 px-4 py-2 rounded-md">
                    Entrar
                </button>
            </RouterLink>
        </nav>
    </header>
</template>