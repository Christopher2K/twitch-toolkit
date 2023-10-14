import TwitchService from '@ioc:TwitchToolkit/Services/Twitch';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';

import TwitchCredential from 'App/Models/TwitchCredential';
import TwitchSubscription from 'App/Models/TwitchSubscription';
import { TwitchSubscriptionType } from '@twitchtoolkit/types';

export default class SubscriptionsController {
  // TODO: List all subscriptions and get their status from twitch API
  public async index({ response }: HttpContextContract) {
    const subscriptions = await TwitchSubscription.all();

    return response.ok({
      data: subscriptions.map((item) => item.toJSON()),
    });
  }

  // Create a subscription to Twitch (should replace the existing one if there is)
  public async store({ request, response, logger }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        type: schema.enum(Object.values(TwitchSubscriptionType)),
      }),
    });

    const twitchCredentials = await TwitchCredential.findByOrFail('accountType', 'main');
    const condition = await TwitchService.getConditonsForSubscription({
      type: data.type,
      credentials: twitchCredentials,
    });
    // TODO: Do better Chris!!!!
    let subscription: PromiseResolve<ReturnType<typeof TwitchService.apiCreateSubscription>>;
    try {
      subscription = await TwitchService.apiCreateSubscription({
        type: data.type,
        accessToken: twitchCredentials.accessToken,
        condition,
      });
    } catch (e) {
      logger.error(e);
      return response.badGateway();
    }

    const dbSubscription = await TwitchSubscription.updateOrCreate(
      {
        subscriptionType: data.type,
      },
      {
        subscriptionId: subscription.data.id,
        subscriptionType: data.type,
      },
    );

    return response.ok({
      data: dbSubscription.serialize(),
    });
  }

  // TODO: Remove a subscription from Twitch and from DB
  public async destroy(_: HttpContextContract) {
    return {};
  }

  // TODO: handler for twitch events / notifications
  public async callback(_: HttpContextContract) {
    return {};
  }
}
