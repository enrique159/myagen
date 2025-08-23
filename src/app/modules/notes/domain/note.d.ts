import type { Base } from '@/app/shared/types/Base'
import type { Element } from '../../elements/domain/element'

export interface Note extends Base {
  content: string
  element?: Element
}
