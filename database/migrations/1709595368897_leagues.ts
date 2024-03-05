import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'leagues'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_active').after('size').defaultTo(true)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_active')
    })
  }
}
