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
            const result = await fetch(`${import.meta.env.VITE_ROOT_API}/weekly/${this.coords}`);
            const forecast = await result.json();
            this.weeklyForecast = forecast;
        },
        async getHourly() {
            this.hourlyForecast = []
            const result = await fetch(`${import.meta.env.VITE_ROOT_API}/hourly/${this.coords}`);
            const forecast = await result.json();
            this.hourlyForecast = forecast;
        },
        setCoords(newCoords: string) {
            this.coords = newCoords;
        }
    },
})
