<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')
const category = ref('')
const type = ref('')
const value = ref()

const emit = defineEmits([
    'close-modal',
    'register-transaction'
])

const closeModal = () => {
    emit('close-modal')
}

const registerTransaction = () => {
    emit('register-transaction', {
        title: title.value,
        category: category.value,
        type: type.value,
        value: value.value
    })

    emit('close-modal')
}
</script>

<template>

    <div class="modal show" style="display: block;" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cadastrar transação</h5>
                    <button v-on:click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label for="title">Título</label>

                                </div>
                            </div>
                            <div class="col-sm-12">
                                <input type="text" v-model="title">
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label for="type">Tipo</label>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <select v-model="type" name="type" id="">
                                    <option value="expense">Gasto</option>
                                    <option value="income">Rendimento</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label for="category">Categoria</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <select v-model="category" name="category" id="">
                                        <!-- Receitas -->
                                        <option value="salary">Salário</option>
                                        <option value="freelance">Freelance</option>
                                        <option value="investments">Investimentos</option>
                                        <option value="other_income">Outro rendimento</option>

                                        <!-- Moradia -->
                                        <option value="rent">Aluguel</option>
                                        <option value="utilities">Contas (luz, água, gás)</option>
                                        <option value="internet">Internet</option>
                                        <option value="condominium">Condomínio</option>

                                        <!-- Alimentação -->
                                        <option value="food">Alimentação</option>
                                        <option value="restaurant">Restaurante</option>

                                        <!-- Transporte -->
                                        <option value="transport">Transporte</option>
                                        <option value="fuel">Combustível</option>
                                        <option value="public_transport">Transporte público</option>

                                        <!-- Saúde -->
                                        <option value="healthcare">Saúde</option>
                                        <option value="pharmacy">Farmácia</option>

                                        <!-- Financeiro -->
                                        <option value="credit_card">Cartão de crédito</option>
                                        <option value="taxes">Impostos</option>

                                        <!-- Estilo de vida -->
                                        <option value="entertainment">Entretenimento</option>
                                        <option value="shopping">Compras</option>
                                        <option value="education">Educação</option>
                                        <option value="subscriptions">Assinaturas</option>

                                        <!-- Outros -->
                                        <option value="other">Outros</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label for="value">Valor</label>

                                </div>
                            </div>
                            <div class="col-sm-12">
                                <input type="number" v-model="value">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        v-on:click="closeModal">Fechar</button>
                    <button v-on:click="registerTransaction" type="button" class="btn btn-primary">Cadastrar</button>
                </div>
            </div>
        </div>
    </div>
</template>