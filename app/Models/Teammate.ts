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
import Team from './Team'
import { TeammateStatusType } from 'App/Shared/Enums/TeammateEnum'

export default class Teammate extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public teammateId: number

  @column()
  public teamId: string

  @column()
  public status: TeammateStatusType

  @belongsTo(() => Team)
  public team: BelongsTo<typeof Team>

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
