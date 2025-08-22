import type { Base } from '@/app/shared/types/Base'
import type { Tag } from '../../tags/domain/tag'

export interface Element extends Base {
  title: string
  date: Date
  tags: Tag[]
  status: ElementStatus
}

export enum ElementStatus {
  active = 'active',
  inactive = 'inactive',
  deleted = 'deleted',
}
