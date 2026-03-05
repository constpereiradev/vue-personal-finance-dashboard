<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const email = ref('')
const password = ref('')

const login = () => {
  axios.post('api/auth/login', {
    username: email.value,
    password: password.value
  }).then((response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
  })
}
</script>

<template>
  <main>
    <div class="row">
      <div class="col-sm-12">
        <form v-on:submit.prevent="login">
          <div class="row">
            <div class="col-sm-12">
              <div class="row mb-3">
                <div class="col-sm-12">
                  <label for="email">Email</label>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <input v-model="email" type="text">
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12">
                  <label for="password">Senha</label>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <input v-model="password" type="password">
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12">
                  <button class="btn btn-primary">Entrar</button>
                </div>

              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>
