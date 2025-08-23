import type { Base } from '@/app/shared/types/Base'
import type { User } from '../../users/domain/user'

export interface Tag extends Base {
  name: string
  color: string
  user?: User
  elements?: Element[]
}
