import type { Base } from '@/app/shared/types/Base'
import type { User } from '../../users/domain/user'

export interface Tag extends Base {
  name: string
  color: string
  user?: User
  elements?: Element[]
}

export interface ICreateTagPayload {
  name: string
  color: string
}

export interface IUpdateTagPayload {
  name?: string
  color?: string
}
