<template>
  <div class="flex justify-center items-center h-screen">
    <div class="border-2 rounded-lg shadow-xl w-1/3 h-4/5 p-12">
      <h1 class="text-center text-4xl">My FinancyEasy</h1>

      <div class="mt-10">
        <form @submit.prevent="login">
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            id="email"
            type="email"
            class="mt-1 block w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Digite seu e-mail"
            v-model="email"
          />

          <label for="password" class="block text-sm font-medium text-gray-700 mt-8">Senha</label>
          <input
            id="password"
            type="password"
            class="mt-1 block w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Digite sua senha"
            v-model="password"
          />

          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const router = useRouter()

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: email.value,
          password: password.value
        })
        localStorage.setItem('access_token', response.data.access_token)
        router.push('/dashboard')
      } catch (error) {
        console.error('Erro ao fazer o login')
      }
    }

    router.beforeEach((to, from, next) => {
      if (to.path === '/dashboard') {
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) {
          next('/home')
        } else {
          next()
        }
      } else {
        next()
      }
    })

    return { email, password, login }
  }
}
</script>

<style scoped></style>
