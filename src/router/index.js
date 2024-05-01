import authGuard from '@/services/authGuard'
import { createRouter, createWebHistory } from 'vue-router'

const Dashboard = () => import('@/views/DashboardView.vue')
const CreateAccountView = () => import('@/views/CreateAccountView.vue')
const loginView = () => import('@/views/LoginFormView.vue')
const Unauthorized = () => import('@/views/WithoutAuthorizationView.vue')
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          component: loginView,
          meta: {
            title: 'Login'
          }
        },
        {
          path: 'criarconta',
          component: CreateAccountView,
          meta: {
            title: 'Registre-se'
          }
        }
      ]
    },
    {
      path: '/app',
      component: DefaultLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          beforeEnter: authGuard,
          meta: {
            title: 'Dashboard'
          }
        }
      ]
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    }
  ]
})

export default router
