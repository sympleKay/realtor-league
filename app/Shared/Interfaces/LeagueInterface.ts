import { DateTime } from 'luxon'
import { LeagueType } from 'App/Shared/Enums/LeagueEnum'

export interface CreateLeagueInterface {
  name: string
  createdBy: string
  start: DateTime
  duration: number
  size: number
  region: string
  type: LeagueType
  code?: string
}

export interface UpdateLeagueInterface {
  id: string
  createdBy: string
  name?: string
  start?: DateTime
  duration?: number
  size?: number
  region?: string
  type?: LeagueType
}

export interface JoinLeagueInterface {
  teamId: string
  leagueId: string
}
