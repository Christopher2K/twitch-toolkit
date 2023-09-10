import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'));
      table.string('username').unique().notNullable();
      table.string('password').notNullable();

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
