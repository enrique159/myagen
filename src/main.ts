import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import './style.css'
// Components
import ToggleTheme from './components/ToggleTheme.vue'
import InputErrors from './components/InputErrors.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import BasicModal from './components/BasicModal.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('ToggleTheme', ToggleTheme)
app.component('InputErrors', InputErrors)
app.component('DatePicker', VueDatePicker)
app.component('LoadingSpinner', LoadingSpinner)
app.component('BasicModal', BasicModal)
app.mount('#app')
