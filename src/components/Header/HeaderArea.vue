<template>
  <div class="flex items-center justify-between py-5 px-8">
    <div class="flex items-center gap-2">
      <p v-if="userData" class="font-regular">
        {{ userData.data.name }}
      </p>
      <p class="font-light text-gray02">
        <v-icon name="fa-chevron-right" />
        <v-icon name="fa-chevron-right" class="-ml-3" />
      </p>
      <p class="font-light text-gray02">{{ currenteDate }}</p>
    </div>
    <div class="flex items-center gap-6">
      <div class="relative inline-block cursor-pointer">
        <v-icon name="fa-bell" fill="#666666" class="h-6 w-6 shadow-icon" animation="ring" hover />
        <div class="absolute h-2 w-2 bg-primaryColor rounded-full top-0.5 right-0.5"></div>
      </div>

      <SearchFocus class="bg-gray0" />
    </div>
  </div>
</template>

<script setup>
import { getUser } from '@/services/DashboardService'
import { onMounted, ref } from 'vue'
import { getCurrentDate } from '@/utils/getCurrentDate'

import SearchFocus from '@/components/Header/SearchFocus.vue'

const userData = ref('')
const currenteDate = getCurrentDate()

const getUserHeader = async () => {
  try {
    const user = await getUser()
    return (userData.value = user)
  } catch {
    console.log('Erro ao obter dados do usuário')
  }
}

onMounted(async () => {
  await getUserHeader()
})
</script>
