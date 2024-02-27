import { DateTime } from 'luxon'
import {
  HasMany,
  beforeCreate,
  beforeFetch,
  beforeFind,
  beforeSave,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { softDeleteQuery, softDelete } from 'App/Actions/SoftDeleteAction'
import { v4 } from 'uuid'
import { LeagueType } from 'App/Shared/Enums/LeagueEnum'
import AppBaseModel from 'App/Models/AppBaseModel'
import TeamLeague from 'App/Models/TeamLeague'

export default class League extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public createdBy: string

  @column.dateTime()
  public start: DateTime

  @column()
  public duration: number

  @column.dateTime()
  public end: DateTime

  @column()
  public size: number

  @column()
  public region: string

  @column()
  public type: LeagueType

  @column({ serializeAs: null })
  public code: string

  @hasMany(() => TeamLeague)
  public teams: HasMany<typeof TeamLeague>

  @beforeSave()
  public static async calculateEndDate(league: League) {
    if (league.$dirty.duration) {
      league.end = league.start.plus({ weeks: league.duration })
    }
  }

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeCreate()
  public static async assignUuid(league: League) {
    league.id = v4()
  }

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
