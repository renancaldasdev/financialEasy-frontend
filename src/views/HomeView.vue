<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h3 class="text-5xl mb-10 font-bold">MyFinancy<span class="font-light">Easy</span></h3>

    <RouterView>
      <LoginFormView />
    </RouterView>
  </div>
</template>

<script>
import LoginFormView from './LoginFormView.vue'

export default {
  components: {
    LoginFormView
  }
}
</script>
