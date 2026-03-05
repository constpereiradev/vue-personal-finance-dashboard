<script setup lang="ts">
const props = defineProps({
    data: {
        required: true,
        type: Object
    }
})

type Transaction = Object

const emit = defineEmits(['delete-transaction'])

const deleteTransaction = (transaction: Transaction) => {
    emit('delete-transaction', transaction)
}
</script>

<template>
    <div v-if="props.data.transactions.length > 0" class="">

        <div class="overflow-hidden rounded-xl shadow border border-gray-200">
            <table class="min-w-full bg-white">

                <thead class="bg-gray-500">
                    <tr class="text-left text-sm text-black tracking-wider">
                        <th class="px-6 py-3 fs-5">Título</th>
                        <th class="px-6 py-3 fs-5">Categoria</th>
                        <th class="px-6 py-3 fs-5">Valor</th>
                        <th class="px-6 py-3 fs-5 text-center">Ação</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">

                    <tr v-for="transaction in props.data.transactions || []" :key="transaction.id"
                        class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 text-gray-800">
                            {{ transaction.title }}
                        </td>

                        <td class="px-6 py-4 text-gray-600">
                            {{ transaction.category }}
                        </td>

                        <td class="px-6 py-4 font-semibold text-gray-900">
                            R$ {{ transaction.value }}
                        </td>

                        <td class="px-6 py-4 text-center">
                            <button @click="deleteTransaction(transaction)"
                                class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition">
                                Deletar
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

    </div>
</template>