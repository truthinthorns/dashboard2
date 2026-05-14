<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigationView from "./views/NavigationView.vue";
import { useWeatherStore } from "./store/weather";

const weatherStore = useWeatherStore();
const locationAllowed = (position: any) => {
  weatherStore.setCoords(
    position.coords.latitude + "," + position.coords.longitude,
  );
};
navigator.geolocation.getCurrentPosition(locationAllowed);
console.log(import.meta.env)
console.log(import.meta.env.VITE_API_URL);
</script>

<template>
  <div class="h-100 w-100 background">
    <NavigationView />
    <RouterView v-if="weatherStore.coords" />
  </div>
</template>

<style></style>
