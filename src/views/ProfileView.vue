<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref({
    id: null,
    email: null,
})

const getUserData = () => {
    axios.get('api/user', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then((response) => {
        user.value = response.data.user
    })
}

onMounted(() => {
    getUserData()
})
</script>

<template>
    <div class="row">
        <div class="col-sm-12">
            Email: {{ user.email }}
        </div>
    </div>
</template>