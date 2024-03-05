import { DateTime } from 'luxon'
import { beforeCreate, beforeFetch, beforeFind, column } from '@ioc:Adonis/Lucid/Orm'
import { softDeleteQuery, softDelete } from 'App/Actions/SoftDeleteAction'
import { v4 } from 'uuid'
import AppBaseModel from './AppBaseModel'

export default class Realtor extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public pts_2022: number

  @column()
  public pts_2023: number

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

  @column()
  public sellerAgentName: string

  @column()
  public buyerAgentName: string

  @column()
  public dualAgent: string

  @column()
  public bedroom: number

  @column()
  public bathroom: number

  @column()
  public squareFt: number

  @column()
  public lotSquareFt: number

  @column()
  public dom: number

  @column()
  public soldAbove: number

  @column()
  public soldBelow: number

  @column()
  public listPrice: number

  @column()
  public soldPrice: number

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
