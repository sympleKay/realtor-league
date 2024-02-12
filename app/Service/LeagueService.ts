import League from 'App/Models/League'
import LeagueRepositoryDataModel from 'App/Repositories/DataModels/LeagueRepositoryDataModel'
import LeagueRepositoryInterface from 'App/Repositories/Interfaces/LeagueRepositoryInterface'
import { LeagueType } from 'App/Shared/Enums/LeagueEnum'
import { CreateLeagueInterface, UpdateLeagueInterface } from 'App/Shared/Interfaces/LeagueInterface'
import { TServiceResponse } from 'App/Shared/Interfaces/ServiceResponseInterface'

export class LeagueService {
  private static LeagueRepository: LeagueRepositoryInterface = new LeagueRepositoryDataModel()

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
}
