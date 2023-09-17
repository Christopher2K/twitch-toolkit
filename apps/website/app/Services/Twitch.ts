import Env from '@ioc:Adonis/Core/Env';
import qs from 'qs';
import got, { type Got } from 'got';

// TODO: Refresh mechanism is NEEDED is
// Can try to leverage the `afterResponse` hook
// Source: https://github.com/sindresorhus/got/blob/v11.8.6/readme.md#hooksafterresponse
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
    });
  }

  public getIdUrl(path: string, query?: Record<string, string>) {
    return `${this.ID_URL}${path}` + qs.stringify(query, { addQueryPrefix: true });
  }

  public getApiUrl(path: string, query?: Record<string, string>) {
    return `${this.API_URL}${path}` + qs.stringify(query, { addQueryPrefix: true });
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

  public async apiGetCurrentUser({ token }: { token: string }) {
    const data = await this.apiClient
      .get('users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // This return type is incomplete but I just need those
        // Source: https://dev.twitch.tv/docs/api/reference/#get-users
      })
      .json<{ data: Array<{ id: string; login: string }> }>();

    return data.data[0];
  }
}

export default new Twitch();
