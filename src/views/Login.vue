<template>
    <h1>{{ userStore.signedIn ? "Logout" : newAccount ? "Create Account" : "Login" }}</h1>
    <div class="login-container">
        <div v-if="!userStore.signedIn">
            <form v-if="newAccount === true" @submit.prevent="signup">
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username" @blur="validateCreateUsername">
                    <span v-if="errors.username" class="error">{{ errors.username }}</span>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" @blur="validateCreateEmail">
                    <span v-if="errors.email" class="error">{{ errors.email }}</span>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" @blur="validateCreatePassword">
                    <span v-if="errors.password" class="error">{{ errors.password }}</span>
                </div>
                <button class="btn btn-primary" type="submit" :disabled="!createButtonEnabled()">Create Account</button>
            </form>
            <form v-else @submit.prevent="login">
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username">
                    <span v-if="errors.username" class="error">{{ errors.username }}</span>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password">
                    <span v-if="errors.password" class="error">{{ errors.password }}</span>
                </div>
                <button class="btn btn-primary" type="submit">Login</button>
            </form>

            <div v-if="newAccount === true" class="toggle-container">
                <span>Already have an account?</span>
                <button @click="newAccount = false; errors = { username: '', email: '', password: '' }">
                    Login
                </button>
            </div>

            <div v-else class="toggle-container">
                <span>Don't have an account?</span>
                <button @click="newAccount = true; errors = { username: '', email: '', password: '' }">
                    Create Account
                </button>
            </div>
        </div>
    </div>

    <button v-if="userStore.signedIn" class="btn btn-primary" @click="logout">Logout</button>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useToast } from 'vue-toastification';
import { useUserStore } from '../store/user';
import User from "../models/user";

const toast = useToast();
const userStore = useUserStore();

const username = ref();
const email = ref();
const password = ref();
const newAccount = ref(false);

const errors = reactive({ username: '', email: '', password: '' });


const validateCreateUsername = () => {
    errors.username = '';
    const regex = /^[A-Za-z0-9_]+$/;
    if (!username.value) {
        errors.username = 'Username is required';
    } else if (username.value.length < 6) {
        errors.username = 'Username must be at least 3 characters long';
    } else if (username.value.length > 32) {
        errors.username = 'Username must be at most 32 characters long';
    } else if (!regex.test(username.value)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
    }
}

const validateCreateEmail = () => {
    errors.email = ''
    if (!email.value) {
        errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        errors.email = 'Email is invalid'
    }
}

const validateCreatePassword = () => {
    errors.password = ''
    if (!password.value) {
        errors.password = 'Password is required';
    } else if (password.value.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    } else if (password.value.length > 48) {
        errors.password = 'Password must be at most 48 characters long';
    }
}

const isValidPassword = () => {
    if (!password.value || password.value.length < 8 || password.value.length > 48) {
        return false;
    }
    return true;
}

const isValidEmail = () => {
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        return false;
    }
    return true;
}

const isValidUsername = () => {
    if (!username.value || username.value.length < 6 || username.value.length > 32 || !/^[A-Za-z0-9_]+$/.test(username.value)) {
        return false;
    }
    return true;
}

const createButtonEnabled = () => {
    return isValidUsername() && isValidEmail() && isValidPassword();
}

const signup = async () => {
    validateCreateEmail();
    validateCreatePassword();
    validateCreateUsername();
    if (!createButtonEnabled())
        return;
    const response = await userStore.signup(new User(username.value, email.value, password.value, [], "web"));
    if (response === true) {
        username.value = "";
        email.value = "";
        password.value = "";
        toast.success('Successfully created account!');
    } else {
        toast.error('Failed to create account!');
    }
}

const login = async () => {
    const response = await userStore.login(username.value, password.value);
    if (response === true) {
        username.value = "";
        password.value = "";
        toast.success('Successfully logged in!');
    } else {
        if (response !== false)
            toast.error(response!);
        else
            toast.error('Failed to log in!');
    }
}

const logout = async () => {
    if (await userStore.logout()) {
        toast.success('Successfully logged out!');
    }
    else {
        toast.error('Failed to log out!');
    }
}
</script>

<style>
/* Container */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 1rem;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
}

/* Form card */
form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 400px;
    animation: fadeIn 0.4s ease-in-out;
}

/* Title */
h1 {
    text-align: center;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #374151;
}

/* Form layout */
form div {
    margin-bottom: 1.25rem;
}

/* Labels */
label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.4rem;
    color: #374151;
}

/* Inputs */
input {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #f9fafb;
    font-size: 0.95rem;
    transition: border-color 0.2s ease, background-color 0.2s ease;
}

input:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Error text */
.error {
    color: #dc2626;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: block;
}

/* Primary buttons */
.btn {
    display: inline-block;
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.25s ease, transform 0.1s ease;
}

.btn-primary {
    background-color: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
}

.btn-primary:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
}

/* Toggle link-style buttons */
.toggle-container {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.95rem;
    color: #4b5563;
}

.toggle-container button {
    background: none;
    border: none;
    padding: 0;
    margin-left: 0.3rem;
    color: #3b82f6;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s ease;
}

.toggle-container button:hover {
    color: #2563eb;
    text-decoration: underline;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>