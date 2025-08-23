import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.locale('es')
dayjs.extend(utc)
dayjs.extend(timezone)

const tz = new Intl.DateTimeFormat().resolvedOptions().timeZone

export const useDate = () => {
  const getCurrentDate = () => {
    // Regresa la fecha y hora en locale español por defecto en formato tipo (Martes, 1 de junio de 2021 12:00:00)
    return dayjs.utc().tz(tz).locale('es').format('dddd, D [de] MMMM hh:mm a')
  }

  const formatDatetime = (date: string | Date | undefined) => {
    if (!date) return ''
    return dayjs
      .utc(date)
      .tz(tz)
      .locale('es')
      .format('dddd, D [de] MMMM [de] YYYY hh:mm:ss a')
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return ''
    return dayjs
      .utc(date)
      .tz(tz)
      .locale('es')
      .format('dddd, D [de] MMMM [de] YYYY')
  }

  const formatAssignedDate = (date: Date | string | undefined) => {
    if (!date) return ''
    return dayjs
      .utc(date)
      .tz(tz)
      .format('YYYY-MM-DD')
  }


  const isToday = (date: Date | string | undefined): boolean => {
    if (!date) return false
    return dayjs(date).isSame(dayjs(), 'day')
  }

  return {
    getCurrentDate,
    formatDatetime,
    formatDate,
    formatAssignedDate,
    isToday,
  }
}
