<template>
  <h2>Seja Bem vindo</h2>
  <form @submit.prevent="login" class="w-1/2 lg:w-1/3">
    <div class="sm:col-span-4">
      <label for="email" class="block font-medium leading-6 text-gray-900 text-base">Email</label>
      <div class="mt-2">
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          placeholder="johndoe@email.com"
          class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 outline-none text-base font-regular"
        />
      </div>
    </div>

    <div class="sm:col-span-4 mt-4">
      <div class="flex justify-between items-center">
        <label for="email" class="block text-base font-medium leading-6 text-gray-900">Senha</label>
        <p class="font-light text-primaryColor text-sm">Esqueceu a senha?</p>
      </div>
      <div class="mt-2">
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          autocomplete="password"
          placeholder="●●●●●●●●●●●●●●●●●●"
          class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 outline-none text-base"
        />
      </div>
    </div>

    <div class="relative flex gap-x-2 mt-2">
      <div class="flex h-6 items-center">
        <input
          id="comments"
          name="comments"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-primaryColor focus:ring-primaryColor bg-primaryColor"
        />
      </div>
      <div class="leading-6">
        <label for="comments" class="font-light text-base">Manter conectado</label>
      </div>
    </div>

    <div class="flex gap-2 mt-4">
      <button class="w-full bg-primaryColor text-white p-2 rounded font-bold">Entrar</button>
    </div>

    <div class="flex items-center justify-center mt-4">
      <div class="flex-grow border-t border-gray-400"></div>
      <p class="mx-4 text-gray-500 font-regular">Ou</p>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>

    <RouterLink
      to="/createaccount"
      class="mt-2 block text-center font-semiBold text-gray02 hover:text-gray01 transition-all duration-300"
    >
      Criar uma conta
    </RouterLink>
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
