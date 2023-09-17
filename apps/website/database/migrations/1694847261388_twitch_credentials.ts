import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'twitch_credentials';

  public async up() {
    this.schema.raw(`DROP TYPE IF EXISTS "accountTypes";`);

    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary();
      table.text('access_token').notNullable();
      table.text('refresh_token').notNullable();
      table
        .enum('account_type', ['bot', 'main'], {
          useNative: true,
          existingType: false,
          enumName: 'accountTypes',
        })
        .nullable()
        .unique()
        .defaultTo(null);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
    this.schema.raw(`DROP TYPE IF EXISTS "accountTypes";`);
  }
}
