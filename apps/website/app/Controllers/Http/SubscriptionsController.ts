import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SubscriptionsController {
  // TODO: List all subscriptions and get their status from twitch API
  public async index(_: HttpContextContract) {
    return {};
  }

  // TODO: Create a subscription to Twitch (should replace the existing one if there is)
  public async store(_: HttpContextContract) {
    return {};
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
