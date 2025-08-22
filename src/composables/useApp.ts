import { useAppStore } from '@/stores/appStore'
import { storeToRefs } from 'pinia'

export const useApp = () => {
  const appStore = useAppStore()
  const { validated, dateCalendar } = storeToRefs(appStore)

  const setValidated = (val: boolean) => {
    appStore.setValidated(val)
  }

  const setDateCalendar = (val: Date) => {
    appStore.setDateCalendar(val)
  }

  return {
    validated,
    setValidated,
    dateCalendar,
    setDateCalendar,
  }
}
