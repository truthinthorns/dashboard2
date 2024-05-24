<template>
    <div class="container-fluid px-5">
        <div class="row py-5">
            <h1>Weekly Forecast</h1>
        </div>
        <div class="row">
            <div v-for="forecast in formatForecast" class="card col" style="width: 18rem;">
                <img :src="forecast.icon" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ forecast.name }}</h5>
                    <p class="card-text">{{ forecast.temperature }}&#176;{{ forecast.temperatureUnit }}</p>
                    <p class="card-text">{{ forecast.shortForecast }}</p>
                    
                </div>
                <div class="card-footer">
                    <a href="#" class="card-link">View Full Forecast</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '../store/weather';
import { computed, onMounted } from 'vue';


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
    // formattedForecast.push(formatForecast());
})
</script>