import type { Base } from '@/app/shared/types/Base'
import type { Element } from '../../elements/domain/element'
import type { Task } from '../../tasks/domain/task'

export interface TodoList extends Base {
  title: string
  tasks: Task[]
  element?: Element
}
