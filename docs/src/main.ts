import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from "./router"
import App from './App.vue'

import "primevue/resources/themes/arya-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

// Grid

import "primeflex/primeflex.scss"

import "primeflex/themes/arya-blue.scss"
//icons

import './style.scss'


const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue);
app.use(pinia)
app.use(router)
app.mount('#app')
