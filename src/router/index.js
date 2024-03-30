import authGuard from '@/services/authGuard'
import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/HomeView.vue')
const Dashboard = () => import('@/views/DashboardView.vue')
const CreateAccountView = () => import('@/views/CreateAccountView.vue')
const Unauthorized = () => import('@/views/WithoutAuthorizationView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },

    {
      path: '/createaccount',
      component: CreateAccountView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: authGuard
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    }
  ]
})

export default router
