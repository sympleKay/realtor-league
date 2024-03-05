import BadRequestException from 'App/Exceptions/BadRequestException'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import League from 'App/Models/League'
import TeamLeague from 'App/Models/TeamLeague'
import LeagueRepositoryDataModel from 'App/Repositories/DataModels/LeagueRepositoryDataModel'
import TeammateRespositoryDataModel from 'App/Repositories/DataModels/TeammateRespositoryDataModel'
import LeagueRepositoryInterface from 'App/Repositories/Interfaces/LeagueRepositoryInterface'
import TeammateRepositoryInterface from 'App/Repositories/Interfaces/TeammateRepositoryInterface'
import UtilityRepositoryDataModel from 'App/Repositories/DataModels/UtilityRepositoryDataModel'
import UtilityRepositoryInterface from 'App/Repositories/Interfaces/UtilityRepositoryInterface'
import { LEAGUE_ENUM_TYPE, LeagueType } from 'App/Shared/Enums/LeagueEnum'
import { CreateLeagueInterface, UpdateLeagueInterface } from 'App/Shared/Interfaces/LeagueInterface'
import { TServiceResponse } from 'App/Shared/Interfaces/ServiceResponseInterface'

export class LeagueService {
  private static LeagueRepository: LeagueRepositoryInterface = new LeagueRepositoryDataModel()
  private static teammateRepository: TeammateRepositoryInterface =
    new TeammateRespositoryDataModel()
  private static utilityRepository: UtilityRepositoryInterface = new UtilityRepositoryDataModel()

  public static async create(payload: CreateLeagueInterface): Promise<TServiceResponse<League>> {
    try {
      const league = await this.LeagueRepository.create(payload)
      return {
        status: true,
        message: 'League created',
        data: league,
      }
    } catch (error) {
      throw error
    }
  }
  public static async update(payload: UpdateLeagueInterface): Promise<TServiceResponse<League>> {
    try {
      const league = await this.LeagueRepository.update(payload)
      return {
        status: true,
        message: 'League updated',
        data: league,
      }
    } catch (error) {
      throw error
    }
  }

  public static async delete(id: string, userId: string): Promise<TServiceResponse<null>> {
    try {
      await this.LeagueRepository.delete(id, userId)
      return {
        status: true,
        message: 'League deleted',
        data: null,
      }
    } catch (error) {
      throw error
    }
  }

  public static async getAllLeagues(): Promise<TServiceResponse<League[]>> {
    try {
      const leagues = await this.LeagueRepository.getAllLeagues()
      return {
        status: true,
        message: 'League retrieved',
        data: leagues,
      }
    } catch (error) {
      throw error
    }
  }

  public static async getMyLeagues(userId: string): Promise<TServiceResponse<League[]>> {
    try {
      const leagues = await this.LeagueRepository.getMyLeagues(userId)
      return {
        status: true,
        message: 'League retrieved',
        data: leagues,
      }
    } catch (error) {
      throw error
    }
  }

  public static async get(id: string): Promise<TServiceResponse<League>> {
    try {
      const league = await this.LeagueRepository.get(id)
      return {
        status: true,
        message: 'League retrieved',
        data: league,
      }
    } catch (error) {
      throw error
    }
  }
  public static async getLeagueByType(type: LeagueType): Promise<TServiceResponse<League[]>> {
    try {
      const leagues = await this.LeagueRepository.getByLeagueType(type)
      return {
        status: true,
        message: 'League retrieved',
        data: leagues,
      }
    } catch (error) {
      throw error
    }
  }

  public static async joinLeague({
    leagueId,
    userId,
    code,
  }: {
    leagueId: string
    userId: string
    code?: string
  }): Promise<TServiceResponse<null>> {
    try {
      const team = await this.teammateRepository.getMyTeammates(userId)
      const league = await this.LeagueRepository.get(leagueId)
      const teamLeagues = await TeamLeague.query().where('league_id', league.id)
      if (teamLeagues.length >= league.size)
        throw new ForbiddenException(
          'You can not join again. This leagues has already reached his maximun size, join another league'
        )
      if (league.type === LEAGUE_ENUM_TYPE.PUBLIC) {
        await this.LeagueRepository.joinLeague({ leagueId: league.id, teamId: team.id })
        return {
          status: true,
          message: 'You have successfully joined the league',
          data: null,
        }
      }
      if (!code) throw new BadRequestException('Provide the code to join this private league')
      const verifyCode = await this.LeagueRepository.verifyPrivateLeagueCode(leagueId, code)
      if (!verifyCode) throw new ForbiddenException('Invalid league code provided')
      await this.LeagueRepository.joinLeague({ leagueId: league.id, teamId: team.id })
      return {
        status: true,
        message: 'You have successfully joined the league',
        data: null,
      }
    } catch (error) {
      throw error
    }
  }

  public static async joinPrivateLeague({
    userId,
    code,
  }: {
    userId: string
    code: string
  }): Promise<TServiceResponse<null>> {
    try {
      const team = await this.teammateRepository.getMyTeammates(userId)

      await this.LeagueRepository.joinPrivateLeague(code, team.id)
      return {
        status: true,
        message: 'You have successfully joined the league',
        data: null,
      }
    } catch (error) {
      throw error
    }
  }

  public static async getTopLeagues() {
    try {
      const query = await this.utilityRepository.topLeagues()
      const topLeagues = query.map((data) => ({
        id: data.id,
        name: data.league.name,
        commissioner: data.league.creator.fullName,
        teams: data.league.teams.length,
        start: data.league.start,
        end: data.league.end,
      }))

      return {
        status: true,
        message: 'Top leagues',
        data: topLeagues,
      }
    } catch (error) {
      throw error
    }
  }

  public static async getTeamRank(leagueId: string, teamId: string) {
    try {
      const query = await this.utilityRepository.getTeamLeagueRank(leagueId, teamId)
      return {
        status: true,
        message: 'Team rank',
        data: {
          rank: query,
        },
      }
    } catch (error) {
      throw error
    }
  }

  public static async getLeagueHistory() {
    try {
      const query = await this.utilityRepository.getLeagueHistory()
      return {
        status: true,
        message: 'League History',
        data: query,
      }
    } catch (error) {
      throw error
    }
  }

  public static async getLeagueTable(leagueId: string) {
    try {
      const query = await this.utilityRepository.getTeamLeagues(leagueId)
      return {
        status: true,
        message: 'League Table',
        data: query,
      }
    } catch (error) {
      throw error
    }
  }
}
