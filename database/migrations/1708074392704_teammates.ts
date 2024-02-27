import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TEAMMATE_STATUS_ENUM } from 'App/Shared/Enums/TeammateEnum'

export default class extends BaseSchema {
  protected tableName = 'teammates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('team_id').notNullable()
      table.uuid('realtor_id').references('realtors.id').notNullable()
      table.uuid('user_id').references('users.id').notNullable()
      table.string('status').defaultTo(TEAMMATE_STATUS_ENUM.ACTIVE)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.dateTime('deleted_at').defaultTo(null)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
