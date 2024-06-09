import { defineStore } from 'pinia'
import weeklyForecast from '../models/weeklyForecast';
import hourlyForecast from '../models/hourlyForecast';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weeklyForecast: [] as weeklyForecast[],
        hourlyForecast: [] as hourlyForecast[],
        coords: String
    }),
    actions: {
        async getWeekly() {
            this.weeklyForecast = []
            const result = await fetch('http://127.0.0.1:8000/weekly');
            const forecast = await result.json();
            this.weeklyForecast = forecast;
        },
        async getHourly() {
            this.hourlyForecast = []
            const result = await fetch('http://127.0.0.1:8000/hourly');
            const forecast = await result.json();
            this.hourlyForecast = forecast;
        }
    },
})