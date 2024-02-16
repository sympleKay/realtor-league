export const TEAMMATE_ACTION_ENUM = {
  ADD: 'add',
  REMOVE: 'remove',
} as const

export const TEAMMATE_STATUS_ENUM = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type TeammateStatusType = (typeof TEAMMATE_STATUS_ENUM)[keyof typeof TEAMMATE_STATUS_ENUM]

export type TeammateActionType = (typeof TEAMMATE_ACTION_ENUM)[keyof typeof TEAMMATE_ACTION_ENUM]
