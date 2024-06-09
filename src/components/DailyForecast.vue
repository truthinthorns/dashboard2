<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="text-center">Today's Forecast</h1>
                <div v-for="forecast in formatForecast" :key="forecast.number">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="container">
                                <div class="row align-items-start p-1 m-2">
                                    <div class="col">
                                        {{ forecast.temperature }}&#176;{{ forecast.temperatureUnit }}
                                    </div>
                                    <div class="col">
                                        {{ forecast.probabilityOfPrecipitation.value }}%
                                    </div>
                                    <div class="col">
                                        {{ forecast.windSpeed }} {{ forecast.windDirection }} 
                                    </div>
                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col">
                <h1 class="text-center text-light">Today's Forecast</h1>
                <table class="table table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">Time</th>
                            <th scope="col" class="text-center">Temperature</th>
                            <th scope="col" class="text-center">Chance of Rain</th>
                            <th scope="col" class="text-center">Wind</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="forecast in formatForecast" :key="forecast.number">
                            <th scope="row" class="text-center"><b>{{ formatTime(forecast.startTime) }}</b></th>
                            <td class="text-center">{{ forecast.temperature }}&#176;{{ forecast.temperatureUnit }}</td>
                            <td class="text-center">{{ forecast.probabilityOfPrecipitation.value }}%</td>
                            <td class="text-center">{{ forecast.windSpeed }} {{ forecast.windDirection }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '../store/weather';
import { computed, onMounted } from 'vue';

const weatherStore = useWeatherStore();

const formatTime = (fDate: any) => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzDate = new Date((typeof fDate === "string" ? new Date(fDate) : fDate).toLocaleString("en-US", { timeZone: tz }))
    if (tzDate.getHours() >= 12) {
        return tzDate.getHours() > 12 ? `${tzDate.getHours() - 12}:00 pm` : `12:00 pm`;
    } else {
        return `${tzDate.getHours()}:00 am`;
    }
}

const formatForecast = computed(() => {
    const newForecasts = [];
    let currentDate = new Date().toDateString();
    for (let i = 0; i < weatherStore.hourlyForecast.length; i++) {
        const w = weatherStore.hourlyForecast[i];
        const wDate = new Date(w.startTime).toDateString();
        if (currentDate !== wDate) {
            break;
        } else {
            newForecasts.push(w);
        }
    }
    return newForecasts;
});

onMounted(async () => {
    await weatherStore.getHourly();
})
</script>