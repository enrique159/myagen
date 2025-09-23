import Exception from '@/app/shared/error/Exception'
import notify from '@/utils/notifications'

export const handleFetchErrors = (error: Error | Exception) => {
  console.log('ERROR🚨: ', error)
  if (error instanceof Exception) {
    for (const message of error.errors) {
      notify.error(message)
    }
  } else {
    console.log('ERROR🚨: ', error)
    notify.error('Ha ocurrido un error, intenta de nuevo.')
  }
}
