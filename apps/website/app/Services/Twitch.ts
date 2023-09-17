import Env from '@ioc:Adonis/Core/Env';
import qs from 'qs';
import got, { type Got, type Response, type Options, type CancelableRequest } from 'got';

import { TwitchAccountType } from '@twitchtoolkit/types/index';

class Twitch {
  private ID_URL: string = 'https://id.twitch.tv/oauth2/';
  private API_URL: string = 'https://api.twitch.tv/helix/';
  private idClient: Got;
  private apiClient: Got;

  constructor() {
    this.idClient = got.extend({
      prefixUrl: this.ID_URL,
    });

    this.apiClient = got.extend({
      prefixUrl: this.API_URL,
      headers: {
        'Client-ID': Env.get('TWITCH_CLIENT_ID'),
      },
      retry: 2,
    });
  }

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
    return await TwitchCredential.query()
      .where('accountType', accountType)
      .update({
        accessToken,
        refreshToken,
      })
      .returning('*');
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

  public getIdUrl(path: string, query?: Record<string, string>) {
    return `${this.ID_URL}${path}` + qs.stringify(query, { addQueryPrefix: true });
  }

  public getApiUrl(path: string, query?: Record<string, string>) {
    return `${this.API_URL}${path}` + qs.stringify(query, { addQueryPrefix: true });
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
}

export default Twitch;
