import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { TwitchSubscriptionType } from '@twitchtoolkit/types';

export default class TwitchSubscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public subscriptionId: string;

  @column()
  public subscriptionType: TwitchSubscriptionType;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
