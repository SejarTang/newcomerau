import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // Add offset for fixed header
      }
    }
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
    {
      path: '/languagehub',
      name: 'Languagehub',
      component: () => import('../views/LanguageHubView.vue'),
    },
    {
      path: '/healthcare',
      name: 'Healthcare',
      component: () => import('../views/HealthcareView.vue'),
    },
    {
      path: '/education',
      name: 'Education',
      component: () => import('../views/EducationView.vue'),
    },
  ],
})

export default router
