import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'screen_configurations';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary();
      table.json('config').defaultTo({});

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: false });
      table.timestamp('updated_at', { useTz: false });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
