import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { is } from 'core-js/core/object'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {auth: true},
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'app-login-layout'},
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {layout: 'app-main-layout', auth: true},
    component: () => import('@/views/StatisticsView.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta: {layout: 'app-main-layout', auth: true},
    component: () => import('@/views/RecordView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'app-main-layout', auth: true},
    component: () => import('@/views/CategoryView.vue')
  },
  {
    path: '/bills',
    name: 'bills',
    meta: {layout: 'app-main-layout', auth: true},
    component: () => import('@/views/BillView.vue')
  },
  {
    path: '/currencies',
    name: 'currencies',
    meta: {layout: 'app-main-layout', auth: true},
    component: () => import('@/views/CurrencyView.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  const isAuth = to.matched.some(obj => obj.meta.auth)

  if (isAuth && !localStorage.getItem('id')) next('/login')
  else next()
})

export default router
