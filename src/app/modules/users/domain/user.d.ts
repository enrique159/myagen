import type { Base } from '@/app/shared/types/Base'

export interface User extends Base {
  email: string
  password: string
  name: string
  lastName: string
  phoneNumber: string | null
  profileImageUrl: string | null
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
