import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const theme = useLocalStorage('theme', 'light')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme,
  }
})