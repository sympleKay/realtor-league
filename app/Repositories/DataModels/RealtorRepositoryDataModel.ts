import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Realtor from 'App/Models/Realtor'
import RealtorRepositoryInterface from 'App/Repositories/Interfaces/RealtorRepositoryInterface'
import { PaginationQueryInterface } from 'App/Shared/Interfaces/PaginationQueryInterface'

export default class RealtorRespositoryDataModel implements RealtorRepositoryInterface {
  public async getRealtors(
    query?: PaginationQueryInterface
  ): Promise<ModelPaginatorContract<Realtor>> {
    try {
      const page = query?.page || 1
      const perPage = query?.perPage || 10
      const realtors = await Realtor.query().orderBy('total_pts', 'desc').paginate(page, perPage)
      return realtors
    } catch (error) {
      throw error
    }
  }
}
