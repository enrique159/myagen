import type { Base } from '@/app/shared/types/Base'
import type { Element } from '../../elements/domain/element'
import type { Task } from '../../tasks/domain/task'

export interface TodoList extends Base {
  tasks: Task[]
  element?: Element
  content?: string
  type: TodoListType
  order: number
}

export enum TodoListType {
  NOTE = 'note',
  TODO = 'list',
}
  
export interface ICreateTodoListPayload {
  elementId: string
  type: TodoListType
  order: number
}

export interface IUpdateTodoListPayload {
  content?: string
  order?: number
}
  