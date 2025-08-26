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

  const nextDay = () => {
    setDateCalendar(new Date(dateCalendar.value.getTime() + 24 * 60 * 60 * 1000))
  }

  const previousDay = () => {
    setDateCalendar(new Date(dateCalendar.value.getTime() - 24 * 60 * 60 * 1000))
  }

  return {
    validated,
    setValidated,
    dateCalendar,
    setDateCalendar,
    nextDay,
    previousDay,
  }
}
