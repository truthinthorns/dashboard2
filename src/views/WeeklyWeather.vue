<template>
    <div class="container-fluid px-5">
        <div class="row py-5">
            <h1 class="text-light">Weekly Forecast</h1>
        </div>
        <div class="row">
            <div v-for="forecast in formatForecast" :key="forecast.name" class="card col" style="width: 18rem;">
                <forecast-card :key="forecast.name" :forecast="forecast"></forecast-card>
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
    interface weatherFormat {
        number: number;
        name: string;
        lowTemp: string;
        highTemp: string;
        dayPrecipitation: string;
        nightPrecipitation: string;
        dayWind: string;
        nightWind: string;
        dayIcon: string;
        nightIcon: string;
        dayDetailed: string;
        nightDetailed: string;
        highestChanceOfRain: string;
        highestWind: string;
    }
    const newForecasts = [];
    
    for(let i = 2; i < weatherStore.weeklyForecast.length; i+=3) {
        const w = weatherStore.weeklyForecast[i];
        newForecasts.push(w)
        console.log(w)
    }
    return newForecasts;
});

onMounted(async () => {
    await weatherStore.getWeekly();
})
</script>