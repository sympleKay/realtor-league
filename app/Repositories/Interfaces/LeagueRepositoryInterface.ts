import League from 'App/Models/League'
import TeamLeague from 'App/Models/TeamLeague'
import { LeagueType } from 'App/Shared/Enums/LeagueEnum'
import {
  CreateLeagueInterface,
  JoinLeagueInterface,
  UpdateLeagueInterface,
} from 'App/Shared/Interfaces/LeagueInterface'

export default interface LeagueRepositoryInterface {
  create(payload: CreateLeagueInterface): Promise<League>
  update(payload: UpdateLeagueInterface): Promise<League>
  delete(id: string, userId: string): Promise<League>
  get(id: string): Promise<League>
  getAllLeagues(): Promise<League[]>
  getMyLeagues(userId: string): Promise<League[]>
  getByLeagueType(type: LeagueType): Promise<League[]>
  joinLeague(payload: JoinLeagueInterface): Promise<TeamLeague>
  joinPrivateLeague(code: string, teamId: string): Promise<TeamLeague>
  verifyPrivateLeagueCode(leagueId: string, code: string): Promise<boolean>
}
