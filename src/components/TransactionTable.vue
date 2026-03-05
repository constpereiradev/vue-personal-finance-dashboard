<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
    data: {
        required: true,
        type: Object
    }
})

const emit = defineEmits(['delete-transaction'])

const deleteTransaction = (transaction) => {
    emit('delete-transaction', transaction)
}

</script>

<template>
    <div v-if="props.data.transactions.length > 0" class="row bg-secondary-subtle p-5">
        <div class="col-sm-12 ">
            <div class="row">
                <div class="col-sm-12">
                    <h3>Transações</h3>
                </div>
            </div>

            <table class="table table-secondary">
                <thead>
                    <tr>
                        <th scope="col"><strong>Título</strong></th>
                        <th scope="col"><strong>Categoria</strong></th>
                        <th scope="col"><strong>Valor</strong></th>
                        <th scope="col"><strong>Ação</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in props.data.transactions || []" :key="transaction.id">
                        <td>{{ transaction.title }}</td>
                        <td>{{ transaction.category }}</td>
                        <td>{{ transaction.value }}</td>
                        <td>
                            <button v-on:click="deleteTransaction(transaction)" class="btn btn-danger">Deletar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>