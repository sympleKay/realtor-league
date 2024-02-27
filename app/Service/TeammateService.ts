import Team from 'App/Models/Team'
import Teammate from 'App/Models/Teammate'
import TeammateRespositoryDataModel from 'App/Repositories/DataModels/TeammateRespositoryDataModel'
import TeammateRepositoryInterface from 'App/Repositories/Interfaces/TeammateRepositoryInterface'
import { TEAMMATE_ACTION_ENUM } from 'App/Shared/Enums/TeammateEnum'
import { TServiceResponse } from 'App/Shared/Interfaces/ServiceResponseInterface'
import {
  AddRemoveTeammateFromTeamInterface,
  AddTeammateInterface,
  UpdateTeamInterface,
} from 'App/Shared/Interfaces/TeammateInterface'

export class TeammateService {
  private static teammateRepository: TeammateRepositoryInterface =
    new TeammateRespositoryDataModel()

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
        message:
          payload.action === TEAMMATE_ACTION_ENUM.ADD
            ? 'Realtor added to team'
            : 'Realtor removed from team',
        data: action,
      }
    } catch (error) {
      throw error
    }
  }

  public static async getMyTeammates(userId: string): Promise<TServiceResponse<Team>> {
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
