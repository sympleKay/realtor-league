import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Realtor from 'App/Models/Realtor'
import { PaginationQueryInterface } from 'App/Shared/Interfaces/PaginationQueryInterface'

export default interface RealtorRepositoryInterface {
  getRealtors(query?: PaginationQueryInterface): Promise<ModelPaginatorContract<Realtor>>
}
