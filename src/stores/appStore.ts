import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const theme = useLocalStorage('theme', 'light')
  
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const validated = ref(false)

  const setValidated = (val: boolean) => {
    validated.value = val
  }


  return {
    theme,
    toggleTheme,
    validated,
    setValidated,
  }
})