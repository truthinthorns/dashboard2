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

const getDayName = (dayNumber: number) => {
    if(dayNumber === 0) return 'Sunday';
    if(dayNumber === 1) return 'Monday';
    if(dayNumber === 2) return 'Tuesday';
    if(dayNumber === 3) return 'Wednesday';
    if(dayNumber === 4) return 'Thursday';
    if(dayNumber === 5) return 'Friday';
    if(dayNumber === 6) return 'Saturday';
    return 'invalid dayNumber';
}

const getHighestWind = (windList: any) => {
    const newWindList = []
    for(let i = 0; i < windList.length; i++) {
        if(!isNaN(windList[i])) newWindList.push(Number(windList[i]))
    }
    return Math.max(...newWindList);
}

const formatForecast = computed(() => {
    interface weatherFormat {
        number: number;
        name: string;
        lowTemp: string;
        highTemp: string;
        dayPrecipitation: string;
        nightPrecipitation: string;
        //dayHumidity: string;
        //nightHumidity: string;
        dayWind: string;
        nightWind: string;
        dayIcon: string;
        nightIcon: string;
        dayDetailed: string;
        nightDetailed: string;
        highestChanceOfRain: string;
        highestWind: string;
        onlyNight: boolean;
    }
    const newForecasts = [] as weatherFormat[];
    
    let previousDate = null;
    let newForecast = {} as weatherFormat;
    for(let i = 0; i < weatherStore.weeklyForecast.length; i++) {
        const w = weatherStore.weeklyForecast[i];
        const wDate = new Date(w.startTime).toDateString();
        if(previousDate === null) {
            if(new Date(weatherStore.weeklyForecast[i+1].startTime).toDateString() !== wDate) {
                //newForecast.nightHumidity = `${w.relativeHumidity.value}%`
                newForecast.nightPrecipitation = `${w.probabilityOfPrecipitation.value !== null ? w.probabilityOfPrecipitation.value : 0}%`
                newForecast.nightWind = `${w.windSpeed} ${w.windDirection}`
                newForecast.nightIcon = w.icon;
                newForecast.nightDetailed = w.detailedForecast;
                newForecast.lowTemp = `${w.temperature}F` 
                newForecast.number = i+1;
                newForecast.name = getDayName(new Date(w.startTime).getDay());
                newForecast.highestChanceOfRain = newForecast.nightPrecipitation;
                newForecast.highestWind = newForecast.nightWind;
                newForecast.onlyNight = true;
                newForecasts.push(newForecast);
                newForecast = {} as weatherFormat;
            } else {
                //newForecast.dayHumidity = `${w.relativeHumidity.value}%`
                newForecast.dayPrecipitation = `${w.probabilityOfPrecipitation.value !== null ? w.probabilityOfPrecipitation.value : 0}%`
                newForecast.dayWind = `${w.windSpeed} ${w.windDirection}`
                newForecast.dayIcon = w.icon;
                newForecast.dayDetailed = w.detailedForecast;
                newForecast.highTemp = `${w.temperature}F`
            }
            previousDate = wDate;
        } 
        else if(previousDate === wDate) {
            //newForecast.nightHumidity = `${w.relativeHumidity.value}%`
            newForecast.nightPrecipitation = `${w.probabilityOfPrecipitation.value !== null ? w.probabilityOfPrecipitation.value : 0}%`
            newForecast.nightWind = `${w.windSpeed} ${w.windDirection}`
            newForecast.nightIcon = w.icon;
            newForecast.nightDetailed = w.detailedForecast;
            newForecast.highestChanceOfRain = `${Math.max(Number(newForecast.dayPrecipitation.slice(0,-1)),Number(newForecast.nightPrecipitation.slice(0,-1)))}%`
            const max1 = getHighestWind(newForecast.dayWind.split(' '));
            const max2 = getHighestWind(newForecast.nightWind.split(' '));
            newForecast.highestWind= `${Math.max(max1, max2)} mph`
            newForecast.lowTemp = `${w.temperature}F`   
            newForecast.number = i+1;
            newForecast.name = getDayName(new Date(w.startTime).getDay());
            newForecast.onlyNight = false;
            newForecasts.push(newForecast);
            newForecast = {} as weatherFormat;
        }
        else {
            //newForecast.dayHumidity = `${w.relativeHumidity.value}%`
            newForecast.dayPrecipitation = `${w.probabilityOfPrecipitation.value !== null ? w.probabilityOfPrecipitation.value : 0}%`
            newForecast.dayWind = `${w.windSpeed} ${w.windDirection}`
            newForecast.dayIcon = w.icon;
            newForecast.dayDetailed = w.detailedForecast;
            newForecast.highTemp = `${w.temperature}F`
            previousDate = wDate;
        }
    }
    return newForecasts;
});

onMounted(async () => {
    await weatherStore.getWeekly();
})
</script>