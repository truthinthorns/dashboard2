<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationView from './views/NavigationView.vue';
import { useWeatherStore } from './store/weather';
import { onBeforeMount } from 'vue'

const weatherStore = useWeatherStore();
// const locationAllowed = async (position: any) => {
//   await weatherStore.setCoords(position.coords.latitude + "," + position.coords.longitude);
// }
// navigator.geolocation.getCurrentPosition(locationAllowed);
onBeforeMount(async () => {
  await weatherStore.setCoords("40.7128,-74.006");
})

</script>

<template>
  <div class="h-100 w-100 background" v-if="weatherStore.coords && weatherStore.hourlyForecast.length > 0">
    <NavigationView />
    <RouterView />
  </div>
</template>

<style>

</style>
