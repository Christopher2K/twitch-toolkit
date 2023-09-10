import { DateTime } from 'luxon';
import { match } from 'ts-pattern';
import { BaseModel, afterFind, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import { validator } from '@ioc:Adonis/Core/Validator';

import {
  type ScreenConfig,
  type ScreenConfigId,
  defaultComputerScreenConfig,
  defaultTalkScreenConfig,
  defaultGuestScreenConfig,
} from '@twitchtoolkit/types';

import ComputerConfigurationValidator from 'App/Validators/ComputerConfigurationValidator';
import TalkConfigurationValidator from 'App/Validators/TalkConfigurationValidator';
import GuestConfigurationValidator from 'App/Validators/GuestConfigurationValidator';

export default class ScreenConfiguration extends BaseModel {
  @column({ isPrimary: true })
  public id: ScreenConfigId;

  @column()
  public config: ScreenConfig | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @afterFind()
  public static async populateDefaultConfig(screenConfig: ScreenConfiguration) {
    if (screenConfig.config === null) {
      switch (screenConfig.id) {
        case 'guest':
          screenConfig.config = defaultGuestScreenConfig;

        case 'talk':
          screenConfig.config = defaultTalkScreenConfig;

        case 'computer':
          screenConfig.config = defaultComputerScreenConfig;
      }
      screenConfig.save();
    }
  }

  @beforeSave()
  public static async checkIntegrity(screenConfig: ScreenConfiguration) {
    const configSchema = match(screenConfig.id)
      .with('computer', () => new ComputerConfigurationValidator().schema)
      .with('talk', () => new TalkConfigurationValidator().schema)
      .with('guest', () => new GuestConfigurationValidator().schema)
      .run();

    await validator.validate({
      schema: configSchema,
      data: screenConfig.config,
    });
  }
}
