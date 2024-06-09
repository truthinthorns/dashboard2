<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationView from './views/NavigationView.vue'
import { useGeolocation } from '@vueuse/core';
import { useWeatherStore } from './store/weather';
// import { onBeforeMount } from 'vue';

// const weatherStore = useWeatherStore();
// const {coords, locatedAt, error, resume, pause} = useGeolocation();

// useGeo
// if (coords.value.latitude != Infinity)
//   console.log(`coords: ${coords}`);

</script>

<template>
  <div class="h-100 w-100 background">
    <NavigationView />
    <RouterView />
  </div>
</template>

<style>

</style>