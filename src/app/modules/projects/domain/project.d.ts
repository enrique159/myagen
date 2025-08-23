import type { Base } from '@/app/shared/types/Base'
import type { User } from '../../users/domain/user'

export interface Project extends Base {
  name: string
  color: string | null
  icon: string | null
  elements: Element[]
  user?: User
}

export interface ICreateProjectPayload {
  name: string
  color: string | null
  icon: string | null
}

export interface IUpdateProjectPayload {
  name: string | null
  color: string | null
  icon: string | null
}