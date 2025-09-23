import type { Base } from '@/app/shared/types/Base'
import type { Task } from '../../tasks/domain/task'

export interface Reminder extends Base {
  date: Date
  notified: boolean
  task?: Task
}

export interface IGetRemindersPayload {
  startDate?: string
  endDate?: string
}

export interface ICreateReminderPayload {
  taskId: string
  reminderDate: string
}

export interface IUpdateReminderPayload {
  reminderDate?: string
  notified?: boolean
}
