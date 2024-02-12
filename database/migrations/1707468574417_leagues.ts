import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'leagues'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('name').notNullable()
      table.uuid('created_by').references('users.id').notNullable()
      table.date('start').notNullable()
      table.integer('duration').notNullable()
      table.date('end').notNullable()
      table.integer('size').notNullable()
      table.string('region').notNullable()
      table.string('type').notNullable()
      table.string('code')

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
