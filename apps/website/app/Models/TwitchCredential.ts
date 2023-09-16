import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TwitchCredential extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public accessToken: string;

  @column()
  public refreshToken: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
