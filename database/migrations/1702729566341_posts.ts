import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('d_snowflake').index('posts_d_snowflake_idx').unique().notNullable()
      table.text('d_name').notNullable()
      table.text('d_content').notNullable()
      table.text('d_content_html').notNullable()
      table.text('d_author_name').notNullable()
      table.json('d_initial_message_data')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
