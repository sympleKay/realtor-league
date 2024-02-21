import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeFetch, beforeFind, column } from '@ioc:Adonis/Lucid/Orm'
import { softDeleteQuery, softDelete } from 'App/Actions/SoftDeleteAction'
import { v4 } from 'uuid'

export default class Realtor extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public pts2022: number

  @column()
  public pts2023: number

  @column()
  public totalPts: number

  @column()
  public brokerage: string

  @column()
  public sold: number

  @column()
  public image: string

  @column()
  public listed: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeCreate()
  public static async assignUuid(realtor: Realtor) {
    realtor.id = v4()
  }

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
