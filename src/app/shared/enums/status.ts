export const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
} as const

export type BaseStatus = (typeof Status)[keyof typeof Status]
