import { TeammateActionType } from '../Enums/TeammateEnum'

export interface RealtorInterface {
  id: number
  price: number
  realtor: string
  pts2022: number
  pts2023: number
  totalPts: number
  brokerage: string
  listed: number
  sold: number
  image: string
}

export interface AddTeammateInterface {
  name: string
  avatar?: string
  realtorIds: Array<string>
  userId: string
}

export interface UpdateTeamInterface {
  id: string
  name?: string
  avatar?: string
  userId: string
}

export interface AddRemoveTeammateFromTeamInterface {
  id: string
  realtorId: string
  userId: string
  action: TeammateActionType
}
