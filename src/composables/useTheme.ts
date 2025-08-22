import { ref, onMounted, computed } from 'vue'

const isDarkMode = ref(false)

export function useTheme() {
  const isDark = computed(() => isDarkMode.value)

  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    const newTheme = isDarkMode.value ? 'dark' : 'light'
    applyTheme(newTheme)
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
      applyTheme(savedTheme)
    } else {
      applyTheme(isDarkMode.value ? 'dark' : 'light')
    }
  }

  onMounted(initTheme)

  return {
    isDark,
    toggleTheme,
  }
}
