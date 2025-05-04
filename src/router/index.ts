import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DailyForecastVue from '../views/DailyForecast.vue';
import LoginVue from '../views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather',
      name: 'weather',
      component: DailyForecastVue
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    }
  ]
})

export default router
