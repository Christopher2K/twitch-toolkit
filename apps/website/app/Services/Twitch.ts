import Env from '@ioc:Adonis/Core/Env';
import qs from 'qs';
import got, { type Got, type Response, type Options, type CancelableRequest } from 'got';

import {
  TwitchAccountType,
  TwitchSubscriptionType,
  twitchSubscriptionVersionByType,
} from '@twitchtoolkit/types';

class Twitch {
  private ID_URL: string = 'https://id.twitch.tv/oauth2/';
  private API_URL: string = 'https://api.twitch.tv/helix/';
  private idClient: Got;
  private apiClient: Got;
  private appClient: Got;

  constructor() {
    this.idClient = got.extend({
      prefixUrl: this.ID_URL,
    });

    this.apiClient = got.extend({
      prefixUrl: this.API_URL,
      headers: {
        'Client-ID': Env.get('TWITCH_CLIENT_ID'),
        'Content-Type': 'application/json',
      },
      retry: 2,
    });

    this.appClient = got.extend({});
  }

  // INTERNAL STUFF
  private async onRefreshToken({
    accessToken,
    refreshToken,
    accountType,
  }: {
    accessToken: string;
    refreshToken: string;
    accountType: string;
  }) {
    const TwitchCredential = (await import('App/Models/TwitchCredential')).default;
    return TwitchCredential.query()
      .where('accountType', accountType)
      .update({
        accessToken,
        refreshToken,
      })
      .returning('*');
  }

  private getNewAppAccessToken() {
    return this.appClient
      .post(`${this.ID_URL}token`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: new URLSearchParams({
          client_id: Env.get('TWITCH_CLIENT_ID'),
          client_secret: Env.get('TWITCH_CLIENT_SECRET'),
          grant_type: 'client_credentials',
        }).toString(),
      })
      .json<{
        access_token: string;
        expires_in: number;
        token_type: 'bearer';
      }>();
  }

  private async getCachedAppToken() {
    const { default: Cache } = await import('@ioc:Adonis/Addons/Cache');
    return await Cache.get<string>('app_token');
  }

  private async setCachedAppToken(token: string) {
    const { default: Cache } = await import('@ioc:Adonis/Addons/Cache');
    await Cache.forever('app_token', token);
  }

  private getConditionsForSubscription({
    type,
    userId,
  }: {
    type: TwitchSubscriptionType;
    userId: string;
  }) {
    const broadcasterUserId = { broadcaster_user_id: userId };
    const moderatorUserId = { moderator_user_id: userId };
    const destination = { to_broadcaster_user_id: userId };

    switch (type) {
      case TwitchSubscriptionType.ChannelFollow:
        return {
          ...broadcasterUserId,
          ...moderatorUserId,
        };
      case TwitchSubscriptionType.ChannelSubscribe:
      case TwitchSubscriptionType.ChannelSubscriptionGift:
      case TwitchSubscriptionType.ChannelSubscriptionMessage:
      case TwitchSubscriptionType.ChannelCheer:
        return broadcasterUserId;
      case TwitchSubscriptionType.ChannelRaid:
        return destination;
    }
  }

  // PUBLIC UTILS STUFF
  public getIdUrl(path: string, query?: Record<string, string>) {
    return `${this.ID_URL}${path}` + qs.stringify(query, { addQueryPrefix: true });
  }

  public getApiUrl(path: string, query?: Record<string, string>) {
    return `${this.API_URL}${path}` + qs.stringify(query, { addQueryPrefix: true });
  }

  public async configureAppClient() {
    const { default: Logger } = await import('@ioc:Adonis/Core/Logger');

    Logger.info('Configure Twitch service...');
    const { access_token: accessToken } = await this.getNewAppAccessToken();
    this.setCachedAppToken(accessToken);

    this.appClient = got.extend({
      prefixUrl: this.API_URL,
      headers: {
        'Client-ID': Env.get('TWITCH_CLIENT_ID'),
        'Content-Type': 'application/json',
      },
      retry: 2,
      hooks: {
        afterResponse: [
          async (
            response: Response,
            retryWithMergedOptions: (options: Options) => CancelableRequest<Response>,
          ) => {
            switch (response.statusCode) {
              case 401:
              case 403:
                try {
                  const { access_token: accessToken } = await this.getNewAppAccessToken();
                  this.setCachedAppToken(accessToken);
                  return retryWithMergedOptions({
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  });
                } catch (e) {
                  return response;
                }
              default:
                return response;
            }
          },
        ],
      },
    });

    Logger.info('Succesfully configured Twitch service!');
  }

  private async idRefreshToken({ refreshToken }: { refreshToken: string }) {
    return this.idClient
      .post('token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: Env.get('TWITCH_CLIENT_ID'),
          client_secret: Env.get('TWITCH_CLIENT_SECRET'),
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }).toString(),
        // This return type is incomplete but I just need those
        // Source: https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
      })
      .json<{ access_token: string; refresh_token: string }>();
  }

  private retryApiCall({
    refreshToken,
    accountType,
  }: {
    refreshToken: string;
    accountType: TwitchAccountType;
  }) {
    return async (
      response: Response,
      retryWithMergedOptions: (options: Options) => CancelableRequest<Response>,
    ) => {
      switch (response.statusCode) {
        case 401:
        case 403:
          try {
            const newToken = await this.idRefreshToken({ refreshToken });
            this.onRefreshToken({
              accessToken: newToken.access_token,
              refreshToken: newToken.refresh_token,
              accountType,
            });
            return retryWithMergedOptions({
              headers: {
                Authorization: `Bearer ${newToken.access_token}`,
              },
            });
          } catch (e) {
            return response;
          }
        default:
          return response;
      }
    };
  }

  // PUBLIC API
  public async getUserToken({ code }: { code: string }) {
    return this.idClient
      .post('token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: Env.get('TWITCH_CLIENT_ID'),
          client_secret: Env.get('TWITCH_CLIENT_SECRET'),
          redirect_uri: `${Env.get('APP_URL')}/api/auth/twitch/redirect`,
          code: code,
          grant_type: 'authorization_code',
        }).toString(),
        // This return type is incomplete but I just need those
        // Source: https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
      })
      .json<{ access_token: string; refresh_token: string }>();
  }

  public async apiGetCurrentUser({
    token,
    refreshToken,
    accountType,
  }: {
    token: string;
    refreshToken: string;
    accountType: TwitchAccountType;
  }) {
    const data = await this.apiClient
      .get('users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        hooks: {
          afterResponse: [this.retryApiCall({ refreshToken, accountType })],
        },
        // This return type is incomplete but I just need those
        // Source: https://dev.twitch.tv/docs/api/reference/#get-users
      })
      .json<{ data: Array<{ id: string; login: string }> }>();

    return data.data[0];
  }

  public async apiCreateSubscription({
    type,
    userId,
  }: {
    type: TwitchSubscriptionType;
    userId: string;
  }) {
    const { default: Route } = await import('@ioc:Adonis/Core/Route');

    const condition = this.getConditionsForSubscription({
      type,
      userId,
    });
    const accessToken = await this.getCachedAppToken();

    return this.appClient
      .post('eventsub/subscriptions', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: {
          type,
          version: twitchSubscriptionVersionByType[type],
          condition,
          transport: {
            method: 'webhook',
            callback:
              Env.get('NODE_ENV') === 'production'
                ? Route.makeUrl('SubscriptionsController.callback', undefined, {
                    prefixUrl: Env.get('APP_URL'),
                  })
                : 'https://christopher2k.dev', // FIXME: Use NGROK for local testing
            secret: Env.get('TWITCH_WEBHOOK_SECRET'),
          },
        },
      })
      .json<{
        data: [
          {
            id: string;
            status: 'enabled' | 'webhook_callback_verification_pending';
            type: TwitchSubscriptionType;
            version: string;
            created_at: string;
            cost: number;
          },
        ];
        total: number;
        total_cost: number;
        max_total_cost: number;
      }>();
  }

  public async apiRemoveSubscription(subscriptionId: string) {
    const accessToken = await this.getCachedAppToken();

    return this.appClient.delete('eventsub/subscriptions', {
      headers: {
        'Client-Id': Env.get('TWITCH_CLIENT_ID'),
        Authorization: `Bearer ${accessToken}`,
      },
      searchParams: {
        id: subscriptionId,
      },
    });
  }
}

export default Twitch;
