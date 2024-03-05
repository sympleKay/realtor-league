import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'league_logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('team_id').references('teams.id').notNullable()
      table.uuid('league_id').references('leagues.id').notNullable()
      table.uuid('realtor_id').references('realtors.id').notNullable()
      table.float('points').notNullable()
      table.string('activity').defaultTo(null)
      table.string('details').defaultTo(null)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.dateTime('deleted_at').defaultTo(null)
    })
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName)
  }
}
