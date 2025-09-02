import type { UUID } from '@/app/shared/types/Id'

export interface ISignInPayload {
  email: string
  password: string
}

export interface ISignInResponse {
  user: UserAuth,
  token: string
}

export interface UserAuth {
  id: UUID
  email: string
  name: string
  lastName: string
  phoneNumber: string | null
  profileImageUrl: string | null
  createdAt: Date
  updatedAt: Date
}
