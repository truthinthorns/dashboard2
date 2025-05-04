<template>
    <h1>Login</h1>
    <button class="btn btn-primary" @click="doStuff">Signup</button>
    <button class="btn btn-primary" @click="doStuff2">Login</button>
    <button class="btn btn-primary" @click="doStuff3">Logout</button>
    <button class="btn btn-primary" @click="test">Get All Todos</button>
</template>
  
<script setup lang="ts">
import { useUserStore } from '../store/user';

const userStore = useUserStore();


const doStuff = async() => {
    await userStore.signup();
}

const doStuff2 = async() => {
    await userStore.login();
}

const doStuff3 = async() => {
    await userStore.logout();
}

const test = async() => {
    await userStore.test();
}

</script>