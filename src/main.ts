import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/index'
// Components
import ToggleTheme from './components/ToggleTheme.vue'
import InputErrors from './components/InputErrors.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('ToggleTheme', ToggleTheme)
app.component('InputErrors', InputErrors)
app.mount('#app')
