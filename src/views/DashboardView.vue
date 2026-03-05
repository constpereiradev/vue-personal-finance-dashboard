<script setup lang="ts">

import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import TransactionTable from '@/components/TransactionTable.vue';
import NewTransactionModel from '@/components/NewTransactionModel.vue';
import GranoHeader from '@/components/GranoHeader.vue';
const from = ref('')
const to = ref('')
const showNewTransactionModel = ref(false)
const balance = ref(0)

const title = ref<string>('')
const category = ref<string>('')
const type = ref<string>('')
const value = ref<number>(0)
const viewExpenses = ref<boolean>(false)
const viewIncomes = ref<boolean>(false)

const incomes = ref(
    {
        total: 0,
        transactions: []
    }
)
const expenses = ref(
    {
        total: 0,
        transactions: []
    }
)


const financeDatas = computed(() => [
    {
        title: 'Saldo',
        value: 'R$' + balance.value
    },
    {
        title: 'Gastos',
        value: 'R$' + expenses.value.total
    },
    {
        title: 'Rendimentos',
        value: 'R$' + incomes.value.total
    },
])

const transactionId = ref<number | null>(null)

interface Transaction {
    id: number
    title: string
    category: string
    type: string
    value: number
}


const loading = ref(false)

onMounted(() => {
    getSummaryData()
})

const getSummaryData = () => {
    axios.get('api/dashboard', {
        params: {
            from: from.value,
            to: to.value
        }
    })
        .then((response) => {
            incomes.value = response.data.summary.incomes
            expenses.value = response.data.summary.expenses
            balance.value = response.data.summary.balance
        }).catch((error) => {
            console.log('err: ' + error)
        }).finally(() => {
            loading.value = false
        })
}

const registerTransaction = () => {
    axios.post(
        'api/finance-transaction',
        {
            title: title.value,
            category: category.value,
            type: type.value,
            value: value.value,
        }
    ).then((response) => {
        getSummaryData()
        console.log(response)
    })
        .catch((error) => { console.log(error) })
        .finally(() => { })
}

const deleteTransaction = () => {
    axios.delete('api/finance-transaction/' + transactionId.value, {
    }).then((response => {
        getSummaryData()
        console.log(response)
    }
    ))
        .catch((error) => console.log(error))
        .finally(() => { })
}

const closeModalHandler = () => {
    showNewTransactionModel.value = false
}

const handleRegisterTransaction = (data: Transaction) => {
    title.value = data.title
    category.value = data.category
    type.value = data.type
    value.value = data.value

    registerTransaction()
}

const handleDeleteTransaction = (transaction: Transaction) => {
    transactionId.value = transaction.id
    deleteTransaction()
}
</script>

<template>

    <div class="bg-gray-900 min-h-screen text-white w-full">

        <GranoHeader />

        <div class="max-w-6xl mx-auto px-6 py-10 space-y-12">
            <div class="flex items-end justify-between">

                <div class="flex gap-4">
                    <div class="flex flex-col">
                        <label for="from" class="text-sm font-medium text-white mb-1">
                            De
                        </label>
                        <input v-model="from" id="from" type="date" name="from"
                            class="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500" />
                    </div>

                    <div class="flex flex-col">
                        <label for="to" class="text-sm font-medium text-white mb-1">
                            Até
                        </label>
                        <input v-model="to" id="to" type="date" name="to"
                            class="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                </div>

                <button v-on:click="getSummaryData"
                    class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-md font-medium transition">
                    Buscar
                </button>

            </div>
        </div>
        <div class="max-w-6xl mx-auto px-6 py-10 space-y-12">

            <!-- CARDS -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 ">

                <div v-for="financeData in financeDatas" :key="financeData.title"
                    class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition">
                    <p class="text-gray-400 text-sm">
                        {{ financeData.title }}
                    </p>

                    <p class="text-2xl font-bold mt-2" :class="{
                        'text-green-400': financeData.title === 'Rendimentos',
                        'text-red-400': financeData.title === 'Gastos',
                        'text-white': financeData.title === 'Saldo'
                    }">
                        {{ financeData.value }}
                    </p>
                </div>

            </div>

            <!-- TABELA GASTOS -->
            <div class="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">

                <div @click="viewExpenses = !viewExpenses"
                    class="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <h3 class="text-lg font-semibold">
                        Gastos
                    </h3>

                    <span class="text-sm text-gray-400">
                        {{ expenses.transactions.length }} registros
                    </span>
                </div>

                <div v-if="viewExpenses" class="p-6 ">
                    <TransactionTable v-if="expenses.transactions.length" :data="expenses"
                        @delete-transaction="handleDeleteTransaction" />

                    <div v-else class="text-center text-gray-500 py-10">
                        Nenhum gasto registrado
                    </div>

                </div>
            </div>

            <br>
            <div class="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">

                <div @click="viewIncomes = !viewIncomes"
                    class="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <h3 class="text-lg font-semibold">
                        Rendimentos
                    </h3>

                    <span class="text-sm text-gray-400">
                        {{ incomes.transactions.length }} registros
                    </span>
                </div>

                <div v-if="viewIncomes" class="p-6 ">
                    <TransactionTable v-if="incomes.transactions.length" :data="incomes"
                        @delete-transaction="handleDeleteTransaction" />

                    <div v-else class="text-center text-gray-500 py-10">
                        Nenhum gasto registrado
                    </div>

                </div>
            </div>

        </div>
    </div>

    <RouterView />
</template>