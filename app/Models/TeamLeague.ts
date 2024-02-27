import { DateTime } from 'luxon'
import {
  BelongsTo,
  beforeCreate,
  beforeFetch,
  beforeFind,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from 'App/Models/AppBaseModel'
import { softDeleteQuery, softDelete } from 'App/Actions/SoftDeleteAction'
import { v4 } from 'uuid'
import Team from 'App/Models/Team'
import League from 'App/Models/League'

export default class TeamLeague extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public leagueId: string

  @column()
  public teamId: string

  @belongsTo(() => Team)
  public team: BelongsTo<typeof Team>

  @belongsTo(() => League)
  public league: BelongsTo<typeof League>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeCreate()
  public static async assignUuid(teamLeague: TeamLeague) {
    teamLeague.id = v4()
  }

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
