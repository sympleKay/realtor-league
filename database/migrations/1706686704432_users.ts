import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { USERTYPE } from 'App/Shared/Enums/UserEnum'

export default class extends BaseSchema {
  protected tableName = 'users'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email').unique().notNullable()
      table.string('phone_number').unique()
      table.string('first_name')
      table.string('last_name')
      table.string('avatar')
      table.string('profession')
      table.string('address')
      table.string('password').notNullable()
      table.string('remember_me_token')
      table.string('token')
      table.enum('type', Object.values(USERTYPE)).defaultTo(USERTYPE.USER)
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_email_verified').defaultTo(false)
      table.boolean('is_phone_number_verified').defaultTo(false)
      table.boolean('is_registration_completed').defaultTo(false)
      table.boolean('is_terms_and_conditions_accepted').defaultTo(false)
      table.boolean('is_verified').defaultTo(false)

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
