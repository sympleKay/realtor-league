import Realtor from 'App/Models/Realtor'
import RealtorRespositoryDataModel from 'App/Repositories/DataModels/RealtorRepositoryDataModel'
import RealtorRepositoryInterface from 'App/Repositories/Interfaces/RealtorRepositoryInterface'
import { PaginationQueryInterface } from 'App/Shared/Interfaces/PaginationQueryInterface'
import { TServiceResponse } from 'App/Shared/Interfaces/ServiceResponseInterface'

export class RealtorService {
  private static realtorRepository: RealtorRepositoryInterface = new RealtorRespositoryDataModel()
  public static async getRealtors(
    query?: PaginationQueryInterface
  ): Promise<TServiceResponse<Realtor[]>> {
    try {
      const realtors = await this.realtorRepository.getRealtors(query)
      return {
        status: true,
        message: 'Retrieved all realtors',
        data: realtors,
      }
    } catch (error) {
      throw error
    }
  }
}
