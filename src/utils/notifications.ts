import flashy, { type FlashyOptions } from '@pablotheblink/flashyjs'

export type NotifyOptions = Omit<FlashyOptions, 'type'>
export type NotifyType = 'success' | 'error' | 'warning' | 'info' | 'default'

flashy.setDefaults({
  closable: true,
  duration: 5000,
  position: 'top-right',
  animation: 'slide',
})

export default class Notify {
  static success(message: string, options?: NotifyOptions) {
    flashy.success(message, options)
  }

  static error(message: string, options?: NotifyOptions) {
    flashy.error(message, options)
  }

  static warning(message: string, options?: NotifyOptions) {
    flashy.warning(message, options)
  }

  static info(message: string, options?: NotifyOptions) {
    flashy.info(message, options)
  }

  static default(message: string, options?: NotifyOptions, type?: NotifyType) {
    flashy(message, {
      ...options,
      type,
    })
  }
}
