import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import DailyForecast from '../views/DailyForecast.vue';
import Login from '../views/Login.vue';
import Todo from '../views/TodoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/weather',
      name: 'weather',
      component: DailyForecast
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    }
  ]
})

export default router
