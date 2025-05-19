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
        top: 80,
      };
    }
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
  routes: [
    // Core routes
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
      children: [
        {
          path: '',
          redirect: '/healthcare/guidance'
        },
        {
          path: 'guidance',
          name: 'HealthcareGuidance',
          component: () => import('../views/healthcare/GuidanceView.vue')
        },
        {
          path: 'symptom-checker',
          name: 'SymptomChecker',
          component: () => import('../views/healthcare/SymptomCheckerView.vue')
        },
        {
          path: 'medical-map',
          name: 'MedicalMap',
          component: () => import('../views/healthcare/MedicalMapView.vue')
        },
        {
          path: 'health-statistics',
          name: 'HealthStatistics',
          component: () => import('../views/healthcare/HealthStatisticsView.vue')
        }
      ]
    },
    {
      path: '/education',
      name: 'Education',
      component: () => import('../views/EducationView.vue'),
    },

    // Integration routes
    {
      path: '/integration',
      redirect: '/integration/holidays',
    },
    {
      path: '/integration/holidays',
      name: 'Holidays',
      component: () => import('../views/HolidaysView.vue'),
    },
    {
      path: '/integration/history',
      name: 'History',
      component: () => import('../views/HistoryView.vue'),
    },
      {
      path: '/integration/more-holidays',
      name: 'MoreHolidays',
      component: () => import('../views/MoreHolidaysView.vue'),
    },
    {
      path: '/integration/quiz',
      name: 'CultureQuiz',
      component: () => import('../views/CultureQuizView.vue'),
    },


    // Holiday detail pages
    {
      path: '/holidays/new-years-day',
      name: 'NewYearsDay',
      component: () => import('../views/HolidayDetailView/NewYearsDay.vue'),
    },
    {
      path: '/holidays/australia-day',
      name: 'AustraliaDay',
      component: () => import('../views/HolidayDetailView/AustraliaDay.vue'),
    },
    {
      path: '/holidays/labour-day',
      name: 'LabourDay',
      component: () => import('../views/HolidayDetailView/LabourDay.vue'),
    },
    {
      path: '/holidays/good-friday',
      name: 'GoodFriday',
      component: () => import('../views/HolidayDetailView/GoodFriday.vue'),
    },
    {
      path: '/holidays/easter-saturday',
      name: 'EasterSaturday',
      component: () => import('../views/HolidayDetailView/EasterSaturday.vue'),
    },
    {
      path: '/holidays/easter-sunday',
      name: 'EasterSunday',
      component: () => import('../views/HolidayDetailView/EasterSunday.vue'),
    },
    {
      path: '/holidays/easter-monday',
      name: 'EasterMonday',
      component: () => import('../views/HolidayDetailView/EasterMonday.vue'),
    },
    {
      path: '/holidays/anzac-day',
      name: 'AnzacDay',
      component: () => import('../views/HolidayDetailView/AnzacDay.vue'),
    },
    {
      path: '/holidays/kings-birthday',
      name: 'KingsBirthday',
      component: () => import('../views/HolidayDetailView/KingsBirthday.vue'),
    },
    {
      path: '/holidays/afl-grand-final',
      name: 'AFLGrandFinal',
      component: () => import('../views/HolidayDetailView/AFLGrandFinal.vue'),
    },
    {
      path: '/holidays/melbourne-cup',
      name: 'MelbourneCup',
      component: () => import('../views/HolidayDetailView/MelbourneCup.vue'),
    },
    {
      path: '/holidays/christmas-day',
      name: 'ChristmasDay',
      component: () => import('../views/HolidayDetailView/ChristmasDay.vue'),
    },
    {
      path: '/holidays/boxing-day',
      name: 'BoxingDay',
      component: () => import('../views/HolidayDetailView/BoxingDay.vue'),
    },
  ],
})

export default router
