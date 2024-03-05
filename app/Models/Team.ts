import { DateTime } from 'luxon'
import {
  BelongsTo,
  HasMany,
  beforeCreate,
  beforeFetch,
  beforeFind,
  belongsTo,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './AppBaseModel'
import { softDeleteQuery, softDelete } from 'App/Actions/SoftDeleteAction'
import { v4 } from 'uuid'
import Teammate from './Teammate'
import User from './User'

export default class Team extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public avatar: string

  @column()
  public userId: string

  @hasMany(() => Teammate)
  public teammates: HasMany<typeof Teammate>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeCreate()
  public static async assignUuid(team: Team) {
    team.id = v4()
  }

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
