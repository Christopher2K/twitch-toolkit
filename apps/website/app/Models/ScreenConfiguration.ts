import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

import {
  type ScreenConfig,
  type ScreenConfigId,
  defaultComputerScreenConfig,
  defaultTalkScreenConfig,
  defaultAudioGuestsScreenConfig,
  defaultVideoGuestsScreenConfig,
} from '@twitchtoolkit/types';

export default class ScreenConfiguration extends BaseModel {
  @column({ isPrimary: true })
  public id: ScreenConfigId;

  @column()
  public config: ScreenConfig | null = null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Managers
  public static async findOrCreate(id: ScreenConfigId): Promise<ScreenConfiguration> {
    let configuration = await ScreenConfiguration.find(id);
    if (configuration == null) {
      configuration = await ScreenConfiguration.create({ id, config: this.getDefaultConfig(id) });
    }

    return configuration;
  }

  // Helpers
  public static getDefaultConfig(id: ScreenConfigId): ScreenConfiguration['config'] {
    switch (id) {
      case 'audioGuests':
        return defaultAudioGuestsScreenConfig;
      case 'talk':
        return defaultTalkScreenConfig;
      case 'computer':
        return defaultComputerScreenConfig;
      case 'videoGuests':
        return defaultVideoGuestsScreenConfig;
    }
  }
}
