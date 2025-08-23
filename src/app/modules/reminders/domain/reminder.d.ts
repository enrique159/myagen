import type { Base } from '@/app/shared/types/Base'
import type { Task } from '../../tasks/domain/task'

export interface Reminder extends Base {
  date: Date
  notified: boolean
  task?: Task
}
