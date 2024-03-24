import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/HomeView.vue')
const Dashboard = () => import('@/views/DashboardView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        hasAuth: true
      }
    }
  ]
})

export default router
