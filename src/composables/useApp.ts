import { useAppStore } from '@/stores/appStore'
import { storeToRefs } from 'pinia'

export const useApp = () => {
  const appStore = useAppStore()
  const { theme } = storeToRefs(appStore)
  const { toggleTheme } = appStore

  return {
    theme,
    toggleTheme,
  }
}
