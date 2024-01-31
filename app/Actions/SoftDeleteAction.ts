import { LucidRow, BaseModel, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
// Optional null check query
export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}
export const softDelete = async (row: LucidRow, column = 'deleted_at') => {
  if (row[column]) {
    if (row[column].isLuxonDateTime) {
      // Deleted represented by a datetime
      row[column] = DateTime.now().toSQL({ includeOffset: false })
    } else {
      // Deleted represented by a boolean
      row[column] = true
    }
    await row.save()
  }
}
