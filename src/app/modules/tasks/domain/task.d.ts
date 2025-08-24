import type { Base } from '@/app/shared/types/Base'
import type { Reminder } from '../../reminders/domain/reminder'
import type { TodoList } from '../../todo-lists/domain/todo-list'

export interface Task extends Base {
  description: string
  completed: boolean
  reminder?: Reminder | null
  list?: TodoList
}

export interface ICreateTaskPayload {
  listId: string
  description: string
}

export interface IUpdateTaskPayload {
  description: string
  completed: boolean
}