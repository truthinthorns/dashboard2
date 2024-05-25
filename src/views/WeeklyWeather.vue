<template>
    <div class="container-fluid px-5">
        <div class="row py-5">
            <h1 class="text-light">Weekly Forecast</h1>
        </div>
        <div class="row">
            <div v-for="forecast in formatForecast" :key="forecast.number" class="card col" style="width: 18rem;">
                <forecast-card :key="forecast.number" :forecast="forecast"></forecast-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '../store/weather';
import { computed, onMounted } from 'vue';
import ForecastCard from '../components/ForecastCard.vue';

const weatherStore = useWeatherStore();

const formatForecast = computed(() => {
    const newForecasts = [];
    let currentDate = null;
    for(let i = 0; i < weatherStore.weeklyForecast.length; i++) {
        
        const w = weatherStore.weeklyForecast[i];
        const wDate = new Date(w.startTime).toDateString();
        if(currentDate === wDate) {
            continue;
        } else {
            currentDate = wDate;
            newForecasts.push(w);
        }
    }
    return newForecasts;
});

onMounted(async () => {
    await weatherStore.getWeekly();
})
</script>