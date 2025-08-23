import type { Base } from '@/app/shared/types/Base'
import type { Project } from '../../projects/domain/project'
import type { Tag } from '../../tags/domain/tag'
import type { Element } from '../../elements/domain/element'

export interface User extends Base {
  email: string
  password: string
  name: string
  lastName: string
  phoneNumber: string | null
  profileImageUrl: string | null
  projects?: Project[]
  tags?: Tag[]
  elements?: Element[]
  status: UserStatus
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export interface ICreateUserPayload {
  name: string
  lastName: string
  email: string
  password: string
}
