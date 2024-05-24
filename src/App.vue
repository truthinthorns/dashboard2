<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationView from '@/views/NavigationView.vue'
</script>

<template>
  <div class="h-100 w-100 background">
    <NavigationView />
    <RouterView />
  </div>
</template>

<style>

</style>