import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { validator } from '@ioc:Adonis/Core/Validator';
import ScreenConfiguration, {
  type ScreenConfigId,
  type ScreenConfig,
} from 'App/Models/ScreenConfiguration';
import ConfigurationIdValidator from 'App/Validators/ConfigurationIdValidator';

export default class ScreenConfigurationsController {
  public async index({ response }: HttpContextContract) {
    const configurations = await ScreenConfiguration.all();
    return response.ok(configurations.map((c) => c.serialize()));
  }

  // GET ONE
  public async show({ request, response }: HttpContextContract) {
    const params = await validator.validate({
      schema: new ConfigurationIdValidator().schema,
      data: request.params,
    });
    const configuration = await ScreenConfiguration.findOrFail(params.id);

    return response.ok({
      data: configuration.serialize(),
    });
  }

  // UPDATE ONE
  public async update({ request, response }: HttpContextContract) {
    const params = await validator.validate({
      schema: new ConfigurationIdValidator().schema,
      data: request.params,
    });

    const config = request.body();

    const configuration = await ScreenConfiguration.updateOrCreate(
      {
        id: params.id as ScreenConfigId,
      },
      {
        config: config as ScreenConfig,
      },
    );

    return response.ok({
      data: configuration.serialize(),
    });
  }
}
