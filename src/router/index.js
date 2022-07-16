import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {layout: 'app-main-layout'},
    component: () => import('@/views/StatisticsView.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta: {layout: 'app-main-layout'},
    component: () => import('@/views/RecordView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'app-main-layout'},
    component: () => import('@/views/CategoryView.vue')
  },
  {
    path: '/bills',
    name: 'bills',
    meta: {layout: 'app-main-layout'},
    component: () => import('@/views/BillView.vue')
  },
  {
    path: '/currencies',
    name: 'currencies',
    meta: {layout: 'app-main-layout'},
    component: () => import('@/views/CurrencyView.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
