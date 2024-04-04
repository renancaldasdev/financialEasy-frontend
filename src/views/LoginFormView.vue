<template>
  <form @submit.prevent="login" class="w-1/2 lg:w-1/3">
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

    <div class="sm:col-span-4 mt-4">
      <div class="flex justify-between items-center">
        <label for="email" class="block text-base font-medium leading-6 text-gray-900">Senha</label>
        <p @click="toggleModal" class="font-light text-primaryColor text-sm cursor-pointer">
          Esqueceu a senha?
        </p>
      </div>
      <div class="relative mt-2">
        <input
          v-model="user.password"
          id="password"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="password"
          placeholder="●●●●●●●●●●●●●●●●●●"
          :class="{
            borderError: !!validate.password
          }"
          class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 outline-none text-base"
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
          id="keepLogged"
          name="keepLogged"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 accent-primaryColor"
        />
      </div>
      <div class="leading-6">
        <label for="keepLogged" class="font-light text-base">Manter conectado</label>
      </div>
    </div>

    <ButtonStandard> Entrar </ButtonStandard>

    <div class="flex items-center justify-center mt-4">
      <div class="flex-grow border-t border-gray-400"></div>
      <p class="mx-4 text-gray-500 font-regular">ou</p>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>

    <RouterLink
      to="/createaccount"
      class="mt-2 block text-center font-semiBold text-gray02 hover:text-gray01 transition-all duration-300"
    >
      Criar uma conta
    </RouterLink>
  </form>

  <teleport to="body">
    <ModalStandard
      :visible="modalVisible"
      :title="modalTitle"
      @update:visible="modalVisible = $event"
    >
      <form class="space-y-4" @submit.prevent="forgetPassword">
        <div class="sm:col-span-4">
          <label for="email" class="block font-medium leading-6 text-gray-900 text-base"
            >Email</label
          >
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
        <div class="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
          <button
            type="submit"
            class="text-white bg-primaryColor hover:bg-specialGreen focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Enviar email
          </button>
          <button
            @click="toggleModal"
            type="button"
            class="py-2.5 px-5 text-sm font-medium text-gray focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Cancelar
          </button>
        </div>
      </form>
    </ModalStandard>
  </teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import http from '@/services/http.js'
import ModalStandard from '@/components/Modal/ModalStandard.vue'
import ButtonStandard from '@/components/Buttons/ButtonStandard.vue'

import eyeClose from '@/components/icons/eyeClose.vue'
import eyeOpen from '@/components/icons/eyeOpen.vue'

const user = reactive({
  email: '',
  password: ''
})

const modalVisible = ref(false)
const modalTitle = ref('Recuperar senha')

const showPassword = ref(false)

const router = useRouter()
const toast = useToast()
const validate = reactive({})

const toggleModal = () => {
  modalVisible.value = !modalVisible.value
}

const clearError = (field) => {
  validate[field] = null
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const login = async () => {
  try {
    const response = await http.post('login', {
      email: user.email,
      password: user.password
    })
    localStorage.setItem('access_token', response.data.access_token)
    toast.success(response.data.message)
    router.push('/dashboard')
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors
      Object.assign(validate, validationErrors)
    } else {
      toast.error(error.response.data.message)
    }
  }
}

const forgetPassword = () => {
  console.log('oi')
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
