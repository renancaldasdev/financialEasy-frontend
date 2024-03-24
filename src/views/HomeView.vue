<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h3 class="text-5xl font-thin mb-10">MyFinancyEasy</h3>
    <LoginForm />
    <WaveSgv class="fixed bottom-0" />
  </div>
</template>

<script>
import WaveSgv from '@/components/WaveHome.vue'
import LoginForm from '@/components/form/LoginForm.vue'

export default {
  components: {
    WaveSgv,
    LoginForm
  }
}
</script>
