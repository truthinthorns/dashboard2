import { defineStore } from 'pinia'
import weeklyForecast from '../models/weeklyForecast';
import hourlyForecast from '../models/hourlyForecast';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weeklyForecast: [] as weeklyForecast[],
        hourlyForecast: [] as hourlyForecast[],
        coords: ""
    }),
    actions: {
        async getWeekly() {
            this.weeklyForecast = []
            const url = new URL(`${import.meta.env.VITE_ROOT_API}/weather/weekly`)
            const params = {coords: this.coords};
            url.search = new URLSearchParams(params).toString();
            const result = await fetch(url);
            const forecast = await result.json();
            this.weeklyForecast = forecast;
        },
        async getHourly() {
            this.hourlyForecast = []
            const url = new URL(`${import.meta.env.VITE_ROOT_API}/weather/hourly`)
            const params = {coords: this.coords};
            url.search = new URLSearchParams(params).toString();
            const result = await fetch(url);
            const forecast = await result.json();
            this.hourlyForecast = forecast;
        },
        setCoords(newCoords: string) {
            this.coords = newCoords;
        }
    },
})
