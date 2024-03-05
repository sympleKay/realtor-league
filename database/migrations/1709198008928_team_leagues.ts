import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'team_leagues'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.bigInteger('points').after('team_id').defaultTo(0)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('points')
    })
  }
}
