import { useAppStore } from '@/stores/appStore'
import { storeToRefs } from 'pinia'


export const useApp = () => {
  const appStore = useAppStore()
  const { validated } = storeToRefs(appStore)

  const setValidated = (val: boolean) => {
    appStore.setValidated(val)
  }

  return {
    validated,
    setValidated,
  }
}
