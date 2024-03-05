import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'realtors'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('seller_agent_name').after('listed')
      table.string('buyer_agent_name').after('listed')
      table.string('dual_agent').after('listed')
      table.integer('bedroom').after('listed')
      table.integer('bathroom').after('listed')
      table.float('square_ft').after('listed')
      table.float('lot_square_ft').after('listed')
      table.float('dom').after('listed')
      table.float('sold_above').after('listed')
      table.float('sold_below').after('listed')
      table.float('list_price').after('listed')
      table.float('sold_price').after('listed')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns(
        'seller_agent_name',
        'buyer_agent_name',
        'dual_agent',
        'bedroom',
        'bathroom',
        'square_ft',
        'lot_square_ft',
        'dom',
        'sold_above',
        'sold_below',
        'list_price',
        'sold_price'
      )
    })
  }
}
