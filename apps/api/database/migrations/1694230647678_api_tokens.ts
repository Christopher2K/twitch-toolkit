import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'api_tokens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'));
      table.uuid('user_id').references('users.id').onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.string('token', 64).notNullable().unique();

      table.timestamp('expires_at', { useTz: false }).nullable();
      table.timestamp('created_at', { useTz: false }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
