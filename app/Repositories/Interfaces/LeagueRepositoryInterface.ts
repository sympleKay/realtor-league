import League from 'App/Models/League'
import { LeagueType } from 'App/Shared/Enums/LeagueEnum'
import { CreateLeagueInterface, UpdateLeagueInterface } from 'App/Shared/Interfaces/LeagueInterface'

export default interface LeagueRepositoryInterface {
  create(payload: CreateLeagueInterface): Promise<League>
  update(payload: UpdateLeagueInterface): Promise<League>
  delete(id: string, userId: string): Promise<League>
  getAllLeagues(): Promise<League[]>
  getMyLeagues(userId: string): Promise<League[]>
  getByLeagueType(type: LeagueType): Promise<League[]>
}
