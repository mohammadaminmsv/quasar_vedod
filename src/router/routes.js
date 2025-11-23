const routes = [
    {
    path: '/Register',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
  {
    path: '/Login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'healthStatistics', component: () => import('pages/HealthStatistics.vue') },
      { path: 'incomeStatistics', component: () => import('pages/IncomeStatistics.vue') },
      { path: 'stockStatistics', component: () => import('pages/StockStatistics.vue') },
      { path: 'surveyStatistics', component: () => import('pages/SurveyStatistics.vue') },
      { path: 'userStatistics', component: () => import('pages/UserStatistics.vue') },
      { path: 'weatherStatistics', component: () => import('pages/WeatherStatistics.vue') },
    ],
    meta: { requiresAuth: true } 
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
