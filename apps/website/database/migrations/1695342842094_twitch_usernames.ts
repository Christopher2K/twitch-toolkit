import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'twitch_credentials';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('username').notNullable().unique();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('username');
    });
  }
}
