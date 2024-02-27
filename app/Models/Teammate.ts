import { DateTime } from 'luxon'
import {
  BelongsTo,
  beforeCreate,
  beforeFetch,
  beforeFind,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './AppBaseModel'
import { softDeleteQuery, softDelete } from 'App/Actions/SoftDeleteAction'
import { v4 } from 'uuid'
import Team from 'App/Models/Team'
import { TeammateStatusType } from 'App/Shared/Enums/TeammateEnum'
import User from 'App/Models/User'
import Realtor from 'App/Models/Realtor'

export default class Teammate extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public realtorId: string

  @column()
  public teamId: string

  @column()
  public userId: string

  @column()
  public status: TeammateStatusType

  @belongsTo(() => Team)
  public team: BelongsTo<typeof Team>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Realtor)
  public realtor: BelongsTo<typeof Realtor>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeCreate()
  public static async assignUuid(teammate: Teammate) {
    teammate.id = v4()
  }

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
