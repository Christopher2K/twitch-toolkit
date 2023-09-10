import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { validator } from '@ioc:Adonis/Core/Validator';
import ScreenConfiguration from 'App/Models/ScreenConfiguration';
import ConfigurationIdValidator from 'App/Validators/ConfigurationIdValidator';

import { ScreenConfigId, ScreenConfig } from '@twitchtoolkit/types';

export default class ScreenConfigurationsController {
  public async index({ response }: HttpContextContract) {
    const configurations = await ScreenConfiguration.all();
    return response.ok({
      data: configurations.map((c) => c.serialize()),
    });
  }

  public async show({ request, response }: HttpContextContract) {
    const params = await validator.validate({
      schema: new ConfigurationIdValidator().schema,
      data: request.params(),
    });
    const configuration = await ScreenConfiguration.findOrFail(params.id);

    return response.ok({
      data: configuration.serialize(),
    });
  }

  public async update({ request, response }: HttpContextContract) {
    const params = await validator.validate({
      schema: new ConfigurationIdValidator().schema,
      data: request.params(),
    });

    const config = request.body();

    const configuration = await ScreenConfiguration.updateOrCreate(
      {
        id: params.id as ScreenConfigId,
      },
      {
        id: params.id as ScreenConfigId,
        config: config as ScreenConfig,
      },
    );

    return response.ok({
      data: configuration.serialize(),
    });
  }
}
