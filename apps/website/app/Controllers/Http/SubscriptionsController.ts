import { RequestError } from 'got';
import crypto from 'crypto';

import TwitchService from '@ioc:TwitchToolkit/Services/Twitch';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { validator, schema } from '@ioc:Adonis/Core/Validator';
import Env from '@ioc:Adonis/Core/Env';

import { TwitchSubscriptionType } from '@twitchtoolkit/types';

import TwitchCredential from 'App/Models/TwitchCredential';
import TwitchSubscription from 'App/Models/TwitchSubscription';
import WebhookCallbackVerificationValidator from 'App/Validators/WebhookCallbackVerificationValidator';
import RevocationValidator from 'App/Validators/RevocationValidator';
import NotifcationValidator from 'App/Validators/NotificationValidator';

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

    let subscription: PromiseResolve<ReturnType<typeof TwitchService.apiCreateSubscription>>;
    try {
      subscription = await TwitchService.apiCreateSubscription({
        type: data.type,
        userId: twitchCredentials.id,
      });
    } catch (e) {
      if (e instanceof RequestError) {
        logger.error(e.response?.body as string); // Try to log the body of the failed request
      }
      return response.badGateway();
    }

    const dbSubscription = await TwitchSubscription.updateOrCreate(
      {
        subscriptionType: data.type,
      },
      {
        subscriptionId: subscription.data[0].id,
        subscriptionType: data.type,
      },
    );

    return response.ok({
      data: dbSubscription.serialize(),
    });
  }

  public async destroy({ request, response, logger }: HttpContextContract) {
    const data = await validator.validate({
      schema: schema.create({
        type: schema.enum(Object.values(TwitchSubscriptionType)),
      }),
      data: request.params(),
    });

    const maybeSubscription = await TwitchSubscription.findBy('subscriptionType', data.type);
    if (!maybeSubscription) return response.notFound();

    try {
      await TwitchService.apiRemoveSubscription(maybeSubscription.subscriptionId);
      await maybeSubscription.delete();

      const subscriptions = await TwitchSubscription.all();

      return response.ok({
        data: subscriptions.map((item) => item.toJSON()),
      });
    } catch (e) {
      const message = 'Failed to remove subscription from Twitch';

      if (e instanceof RequestError) {
        switch (e.response?.statusCode) {
          case 404:
            await maybeSubscription.delete();

            const subscriptions = await TwitchSubscription.all();

            return response.ok({
              data: subscriptions.map((item) => item.toJSON()),
            });
          default:
            logger.error(
              `${message}. Code: ${e.code} | Status: ${e.response?.statusCode} | Error: ${e.response?.body}`,
            );
        }
      } else {
        logger.error(e);
      }

      return response.badGateway();
    }
  }

  public async callback({ request, response, logger, websocket }: HttpContextContract) {
    logger.info('Processing a Twitch webhook callback call');

    // VERIFICATION
    const appSecret = Env.get('TWITCH_WEBHOOK_SECRET');

    const signature = request.header('Twitch-Eventsub-Message-Signature'.toLowerCase());
    if (!signature) return response.badRequest();

    const messageId = request.header('Twitch-Eventsub-Message-Id'.toLowerCase());
    const messageTs = request.header('Twitch-Eventsub-Message-Timestamp'.toLowerCase());
    const rawBody = request.raw();
    const hmac =
      'sha256=' +
      crypto
        .createHmac('sha256', appSecret)
        .update(`${messageId}${messageTs}${rawBody}`)
        .digest('hex');

    const validEvent = crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
    if (!validEvent) return response.badRequest();

    // EVENT HANDLING
    const eventType = request.header('twitch-eventsub-message-type'.toLowerCase());
    switch (eventType) {
      case 'notification':
        const notificationPayload = await request.validate(NotifcationValidator);
        websocket.emit(`twitch:${notificationPayload.subscription.type}`, {
          __type: notificationPayload.subscription.type,
          ...notificationPayload.event,
        });
        logger.info('Incoming event parsed');

        return response.noContent();

      case 'webhook_callback_verification':
        const verificationPayload = await request.validate(WebhookCallbackVerificationValidator);
        logger.info('Passed webhook callback verification');
        return response.header('Content-Type', 'text/plain').ok(verificationPayload.challenge);

      case 'revocation':
        const revocationPayload = await request.validate(RevocationValidator);
        const maybeSubscription = await TwitchSubscription.findBy(
          'subscriptionId',
          revocationPayload.subscription.id,
        );

        if (maybeSubscription) {
          await maybeSubscription.delete();
          websocket.emit(`twitch:revocation`, revocationPayload.subscription.type);
        }
        logger.info('Event has been revoked');

        return response.noContent();
      default:
        logger.warn(`Unhandled Twitch Eventsub Message Type: ${eventType}`);
        return response.badRequest();
    }
  }
}
