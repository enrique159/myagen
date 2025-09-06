import { ref, onMounted, computed } from 'vue'

const isDarkMode = ref(false)

// Colores para el meta tag theme-color según el tema
const THEME_COLORS = {
  light: '#F0F1F4', // Color base-200 del tema claro
  dark: '#1F2937',   // Color base-200 del tema oscuro
}

export function useTheme() {
  const isDark = computed(() => isDarkMode.value)

  // Actualiza el meta tag theme-color
  const updateThemeColorMeta = (theme: string) => {
    const themeColor = theme === 'dark' ? THEME_COLORS.dark : THEME_COLORS.light
    
    // Buscar el meta tag existente
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')
    
    // Si no existe, crearlo
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.setAttribute('name', 'theme-color')
      document.head.appendChild(metaThemeColor)
    }
    
    // Actualizar el contenido
    metaThemeColor.setAttribute('content', themeColor)
  }

  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    updateThemeColorMeta(theme)
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
