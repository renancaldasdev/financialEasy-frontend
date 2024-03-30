import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/HomeView.vue')
const Dashboard = () => import('@/views/DashboardView.vue')
const CreateAccountView = () => import('@/views/CreateAccountView.vue')

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
      meta: {
        hasAuth: true
      }
    }
  ]
})

export default router
