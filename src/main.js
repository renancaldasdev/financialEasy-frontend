import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import '@/Assets/css/style.css'
import '@/Assets/css/fonts.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as FaIcons from 'oh-vue-icons/icons/fa'

const app = createApp(App)
const Fa = Object.values({ ...FaIcons })
addIcons(...Fa)

app.use(createPinia())
app.use(router)
app.use(Toast, { position: POSITION.TOP_RIGHT })
app.component('v-icon', OhVueIcon)

app.mount('#app')
