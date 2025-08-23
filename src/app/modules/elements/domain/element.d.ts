import type { Base } from '@/app/shared/types/Base'
import type { Tag } from '../../tags/domain/tag'
import type { Note } from '../../notes/domain/note'
import type { TodoList } from '../../todo-lists/domain/todo-list'
import type { Project } from '../../projects/domain/project'
import type { User } from '../../users/domain/user'

export interface Element extends Base {
  title: string
  assignedDate: Date
  tags: Tag[]
  notes: Note[]
  lists: TodoList[]
  status: ElementStatus
  project?: Project
  user?: User
}

export enum ElementStatus {
  active = 'active',
  inactive = 'inactive',
  deleted = 'deleted',
}
