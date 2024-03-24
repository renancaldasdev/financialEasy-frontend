import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import '@/Assets/css/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, { position: POSITION.TOP_RIGHT })

app.mount('#app')
