import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { TwitchAccountType } from '@twitchtoolkit/types';

export default class TwitchCredential extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public username: string;

  @column()
  public accountType: TwitchAccountType | null;

  @column({ serializeAs: null })
  public accessToken: string;

  @column({ serializeAs: null })
  public refreshToken: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
