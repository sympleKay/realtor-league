import Team from 'App/Models/Team'
import Teammate from 'App/Models/Teammate'
import TeammateRespositoryDataModel from 'App/Repositories/DataModels/TeammateRespositoryDataModel'
import TeammateRepositoryInterface from 'App/Repositories/Interfaces/TeammateRepositoryInterface'
import { TServiceResponse } from 'App/Shared/Interfaces/ServiceResponseInterface'
import {
  AddRemoveTeammateFromTeamInterface,
  AddTeammateInterface,
  RealtorInterface,
  UpdateTeamInterface,
} from 'App/Shared/Interfaces/TeammateInterface'

export class TeammateService {
  private static teammateRepository: TeammateRepositoryInterface =
    new TeammateRespositoryDataModel()
  public static async getRealtors(): Promise<TServiceResponse<RealtorInterface[]>> {
    try {
      const realtors = await this.teammateRepository.getAllRealtors()
      return {
        status: true,
        message: 'Realtors retrieved',
        data: realtors,
      }
    } catch (error) {
      throw error
    }
  }

  public static async createTeammate(
    payload: AddTeammateInterface
  ): Promise<TServiceResponse<Team>> {
    try {
      const teammate = await this.teammateRepository.createTeammate(payload)
      return {
        status: true,
        message: 'Team and teammate added',
        data: teammate,
      }
    } catch (error) {
      throw error
    }
  }

  public static async updateTeam(payload: UpdateTeamInterface): Promise<TServiceResponse<Team>> {
    try {
      const team = await this.teammateRepository.updateTeam(payload)
      return {
        status: true,
        message: 'Team updated',
        data: team,
      }
    } catch (error) {
      throw error
    }
  }

  public static async addRemoveTeammate(
    payload: AddRemoveTeammateFromTeamInterface
  ): Promise<TServiceResponse<Teammate>> {
    try {
      const action = await this.teammateRepository.addRemoveTeammateFromTeam(payload)
      return {
        status: true,
        message: 'Action taken',
        data: action,
      }
    } catch (error) {
      throw error
    }
  }

  public static async getMyTeammated(userId: string): Promise<TServiceResponse<Team[]>> {
    try {
      const teammates = await this.teammateRepository.getMyTeammates(userId)
      return {
        status: true,
        message: 'Teammates retrived',
        data: teammates,
      }
    } catch (error) {
      throw error
    }
  }
}
