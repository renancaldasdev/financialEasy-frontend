<template>
  <div class="flex justify-end p-2">
    <p class="text-sm mb-10 font-bold">MyFinancy<span class="font-light">Easy</span></p>
  </div>
  <div class="flex flex-col justify-center items-center min-h-screen -mt-20">
    <h3 class="text-5xl mb-10 font-bold">MyFinancy<span class="font-light">Easy</span></h3>
    <form @submit.prevent="handleRegister" class="w-1/2 lg:w-1/3">
      <div class="sm:col-span-4 mb-2">
        <label for="email" class="block font-medium leading-6 text-gray-900 text-base">Nome</label>
        <div class="mt-2">
          <input
            v-model="user.name"
            id="name"
            name="name"
            type="name"
            autocomplete="name"
            placeholder="John Doe"
            class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 outline-none text-base font-regular"
            :class="{
              borderError: !!validate.name
            }"
            @input="clearError('name')"
          />
        </div>
        <span v-if="validate.name" class="block font-medium text-red-500 text-xs mt-1">{{
          validate.name[0]
        }}</span>
      </div>

      <div class="sm:col-span-4">
        <label for="email" class="block font-medium leading-6 text-gray-900 text-base">Email</label>
        <div class="mt-2">
          <input
            v-model="user.email"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="johndoe@email.com"
            class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 outline-none text-base font-regular"
            :class="{
              borderError: !!validate.email
            }"
            @input="clearError('email')"
          />
        </div>
        <span v-if="validate.email" class="block font-medium text-red-500 text-xs mt-1">{{
          validate.email[0]
        }}</span>
      </div>

      <div class="sm:col-span-4 mt-2">
        <div class="flex justify-between items-center">
          <label for="email" class="block text-base font-medium leading-6 text-gray-900"
            >Senha</label
          >
        </div>
        <div class="relative mt-2">
          <input
            v-model="user.password"
            id="password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="password"
            placeholder="●●●●●●●●●●●●●●●●●●"
            class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 outline-none text-base"
            :class="{
              borderError: !!validate.password
            }"
            @input="clearError('password')"
          />
          <span v-if="validate.password" class="block font-medium text-red-500 text-xs mt-1">{{
            validate.password[0]
          }}</span>
          <span
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
            :class="{ eyeError: !!validate.password }"
          >
            <eyeOpen v-show="!showPassword" />
            <eyeClose v-show="showPassword" />
          </span>
        </div>
      </div>

      <div class="relative flex gap-x-2 mt-2">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 accent-primaryColor"
          />
        </div>
        <div class="leading-6">
          <label for="comments" class="font-light text-base">Li e concordo com os </label>
          <span class="text-primaryColor font-bold cursor-pointer" @click="toggleModal"
            >termos de uso</span
          >
        </div>
      </div>

      <ButtonStandard> Criar </ButtonStandard>

      <div class="flex items-center justify-center mt-4">
        <div class="flex-grow border-t border-gray-400"></div>
        <p class="mx-4 text-gray-500 font-regular">Já tem uma conta?</p>
        <div class="flex-grow border-t border-gray-400"></div>
      </div>

      <RouterLink
        to="/"
        class="mt-2 block text-center font-semiBold text-gray02 hover:text-gray01 transition-all duration-300"
      >
        Fazer Login
      </RouterLink>
    </form>
  </div>

  <teleport to="body">
    <ModalStandard
      :visible="modalVisible"
      :title="modalTitle"
      @update:visible="modalVisible = $event"
    >
      <p class="font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </ModalStandard>
  </teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/http.js'
import ModalStandard from '@/components/Modal/ModalStandard.vue'
import ButtonStandard from '@/components/Buttons/ButtonStandard.vue'

import eyeClose from '@/components/icons/eyeClose.vue'
import eyeOpen from '@/components/icons/eyeOpen.vue'
import { sleep } from '@/utils/sleep'

const user = reactive({
  name: '',
  email: '',
  password: ''
})
const showPassword = ref(false)
const modalVisible = ref(false)
const modalTitle = ref('Termos de uso da aplicação')

const router = useRouter()
const validate = reactive({})

const clearError = (field) => {
  validate[field] = null
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleModal = () => {
  modalVisible.value = !modalVisible.value
}

const handleRegister = async (e) => {
  e.preventDefault()
  const resp = await register(user)
  if (resp.status === 201) {
    await sleep(1000)
    router.push({ path: '/dashboard' })
  } else {
    console.log(resp)
    Object.assign(validate, resp)
  }
}
</script>

<style scoped>
.borderError {
  border: 1px solid red;
}

.eyeError {
  top: -15px;
}
</style>
