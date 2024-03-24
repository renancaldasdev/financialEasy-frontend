<template>
  <form @submit.prevent="login" class="p-10 border rounded w-1/3">
    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        type="email"
        v-model="email"
        id="email"
        name="email"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Digite seu email"
      />
    </div>
    <div>
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
      <input
        type="password"
        v-model="password"
        id="password"
        name="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Digite sua senha"
      />
    </div>

    <div class="flex gap-2 mt-4">
      <button class="w-full bg-buttton_confirm p-2 rounded text-black">Entrar</button>
    </div>

    <div class="mt-2 flex justify-end">
      <a href="">Não tem conta? <span class="underline font-bold">Criar conta</span></a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const email = ref('')
const password = ref('')

const router = useRouter()

const toast = useToast()

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('access_token', response.data.access_token)
    toast.success('Login realizado com sucesso!')
    router.push('/dashboard')
  } catch (error) {
    toast.error(error.response.data.message)
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
</script>
