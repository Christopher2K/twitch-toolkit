import { Duration } from 'luxon';
import got from 'got';
import qs from 'qs';

import Env from '@ioc:Adonis/Core/Env';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { validator } from '@ioc:Adonis/Core/Validator';
import { string } from '@ioc:Adonis/Core/Helpers';

import LoginValidator from 'App/Validators/LoginValidator';
import OAuthCallbackValidator from 'App/Validators/OAuthCallbackValidator';
import TwitchCredential from 'App/Models/TwitchCredential';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator);
    const token = await auth.use('api').attempt(payload.username, payload.password, {
      expiresIn: Duration.fromObject({ day: 30 }).toFormat('s'),
    });

    return response.ok({
      data: {
        auth: token.toJSON(),
        user: token.user.serialize(),
      },
    });
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke();
    return response.noContent();
  }

  public async me({ auth, response }: HttpContextContract) {
    const user = auth.user;
    if (!user) return response.forbidden();

    return response.ok({
      data: {
        user: user.serialize(),
      },
    });
  }

  public async twitchLogin({ response, session }: HttpContextContract) {
    const state = string.generateRandom(32);
    session.put('oauth_state', state);

    const authorizationUrl =
      'https://id.twitch.tv/oauth2/authorize' +
      qs.stringify(
        {
          client_id: Env.get('TWITCH_CLIENT_ID'),
          redirect_uri: `${Env.get('APP_URL')}/api/auth/twitch/redirect`,
          response_type: 'code',
          scope:
            'moderation:read channel:moderate chat:edit chat:read user:read:email user:read:subscriptions channel:read:subscriptions',
          state,
        },
        { addQueryPrefix: true },
      );

    return response.redirect(authorizationUrl);
  }

  public async twitchRedirect({ request, response, session, inertia }: HttpContextContract) {
    const state = session.get('oauth_state');
    session.forget('oauth_state');

    const query = await validator.validate({
      schema: new OAuthCallbackValidator().schema,
      data: request.qs(),
    });

    if (state !== query.state) return inertia.render('Redirect', { error: 'STATE_MISMATCH' });

    // TODO: Find a way to make it work with ky, for having a common client
    const token = await got
      .post('https://id.twitch.tv/oauth2/token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: Env.get('TWITCH_CLIENT_ID'),
          client_secret: Env.get('TWITCH_CLIENT_SECRET'),
          redirect_uri: `${Env.get('APP_URL')}/api/auth/twitch/redirect`,
          code: query.code,
          grant_type: 'authorization_code',
        }).toString(),
      })
      .json<{ access_token: string; refresh_token: string }>();

    const {
      data: [user],
    } = await got
      .get('https://api.twitch.tv/helix/users', {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Client-ID': Env.get('TWITCH_CLIENT_ID'),
        },
      })
      .json<{ data: { id: string; login: string }[] }>();

    await TwitchCredential.updateOrCreate(
      {
        id: user.login,
      },
      {
        id: user.login,
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      },
    );

    return inertia.render('Redirect');
  }
}
