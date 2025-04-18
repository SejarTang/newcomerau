import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/newcomers',
      name: 'newcomers',
      component: () => import('../views/NewcomersView.vue'),
    },
    {
      path: '/language',
      name: 'Language',
      component: () => import('../views/LanguageView.vue'),
    },
  ],
})

export default router
