import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import WeeklyWeatherVue from '../views/WeeklyWeather.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeeklyWeatherVue
    }
  ]
})

export default router
