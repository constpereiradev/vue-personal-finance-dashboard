<script setup lang="ts">

import { ref, onMounted } from 'vue';
import axios from 'axios';

import TransactionTable from '@/components/TransactionTable.vue';
import NewTransactionModel from '@/components/NewTransactionModel.vue';

const expensesTitle = ref('Gastos - R$: ')
const incomesTitle = ref('Redimentos - R$: ')
const noTransactionMessage = ref('Nenhuma transação para visualizar.')
const from = ref('')
const to = ref('')
const showNewTransactionModel = ref(false)

const title = ref('')
const category = ref('')
const type = ref('')
const value = ref(0)

const transactionId = ref(null)

const token = localStorage.getItem('token')
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
const balance = ref(0)

const loading = ref(false)

onMounted(() => {
    getSummaryData()
})

const getSummaryData = () => {
    axios.get('api/dashboard', {
        params: {
            from: from.value,
            to: to.value
        },
        headers: {
            'Authorization': 'Bearer ' + token
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
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
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
        headers: {
            'Authorization': 'Bearer ' + token
        }
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

const handleRegisterTransaction = (data) => {
    title.value = data.title
    category.value = data.category
    type.value = data.type
    value.value = data.value

    registerTransaction()
}

const handleDeleteTransaction = (transaction) => {
    transactionId.value = transaction.id
    deleteTransaction()
}
</script>

<template>

    <NewTransactionModel v-on:close-modal="closeModalHandler" v-on:register-transaction="handleRegisterTransaction"
        v-if="showNewTransactionModel" />

    Saldo: {{ balance }}
    <div class="row">
        <div class="col-sm-12">
            <div class="row">
                <div class="col-sm-6">
                    De: <input type="date" v-model="from">
                    Até: <input type="date" v-model="to">
                </div>

                <div class="col-sm-3">
                    <button v-on:click="getSummaryData" class="btn btn-primary">Buscar</button>
                </div>

                <div class="col-sm-3">
                    <button v-on:click="showNewTransactionModel = true" class="btn btn-primary">Cadastrar
                        transação</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-sm-12">
            <h1>{{ expensesTitle }}{{ expenses.total }}</h1>
        </div>
        <div class="col-sm-12">
            <div v-if="!expenses.transactions.length" class="row">
                <div class="col-sm-12">
                    {{ noTransactionMessage }}
                </div>
            </div>

            <TransactionTable v-on:delete-transaction="handleDeleteTransaction" :data="expenses"></TransactionTable>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12">
            <h1>{{ incomesTitle }}{{ incomes.total }}</h1>
        </div>
        <div class="col-sm-12">
            <div v-if="!incomes.transactions.length" class="row">
                <div class="col-sm-12">
                    {{ noTransactionMessage }}
                </div>
            </div>

            <TransactionTable v-on:delete-transaction="handleDeleteTransaction" :data="incomes"></TransactionTable>
        </div>
    </div>
    <RouterView />
</template>