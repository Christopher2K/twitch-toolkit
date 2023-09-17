import Env from '@ioc:Adonis/Core/Env';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { validator, schema } from '@ioc:Adonis/Core/Validator';
import { string } from '@ioc:Adonis/Core/Helpers';
import TwitchService from '@ioc:TwitchToolkit/Services/Twitch';

import { TwitchAccountType } from '@twitchtoolkit/types/index';

import LoginValidator from 'App/Validators/LoginValidator';
import OAuthCallbackValidator from 'App/Validators/OAuthCallbackValidator';
import TwitchCredential from 'App/Models/TwitchCredential';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator);
    const token = await auth.use('api').attempt(payload.username, payload.password, {
      expiresIn: '30 days',
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

  public async refresh({ auth, response }: HttpContextContract) {
    const newToken = await auth.use('api').generate(auth.user!, {
      expiresIn: '30 days',
    });
    await auth.use('api').revoke();

    return response.ok({
      data: {
        auth: newToken.toJSON(),
        user: newToken.user.serialize(),
      },
    });
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

  public async twitchLogin({ request, response, session }: HttpContextContract) {
    const { accountType } = await validator.validate({
      schema: schema.create({
        accountType: schema.enum(['bot', 'main']),
      }),
      data: request.qs(),
    });

    const state = string.generateRandom(32);
    session.put('oauth_state', state);
    session.put('oauth_account_type', accountType);

    const authorizationUrl = TwitchService.getIdUrl('authorize', {
      client_id: Env.get('TWITCH_CLIENT_ID'),
      redirect_uri: `${Env.get('APP_URL')}/api/auth/twitch/redirect`,
      response_type: 'code',
      scope:
        'moderation:read channel:moderate chat:edit chat:read user:read:email user:read:subscriptions channel:read:subscriptions',
      state,
      force_verify: 'true',
    });
    return response.redirect(authorizationUrl);
  }

  public async twitchRedirect({ request, session, inertia }: HttpContextContract) {
    const state = session.get('oauth_state');
    const accountType = session.get('oauth_account_type') as TwitchAccountType;
    session.clear();

    const query = await validator.validate({
      schema: new OAuthCallbackValidator().schema,
      data: request.qs(),
    });

    if (state !== query.state) return inertia.render('Redirect', { error: 'STATE_MISMATCH' });

    const { access_token: accessToken, refresh_token: refreshToken } =
      await TwitchService.getUserToken({
        code: query.code,
      });
    const user = await TwitchService.apiGetCurrentUser({
      token: accessToken,
      refreshToken,
      accountType,
    });
    const authorizedAccounts = Env.get('AUTHORIZED_TWITCH_ACCOUNTS').split(',');

    if (!authorizedAccounts.includes(user.login)) {
      return inertia.render('Redirect', { error: 'UNKNOWN_TWITCH_ACCOUNT' });
    }

    await TwitchCredential.query().where('accountType', accountType).update({ accountType: null });

    await TwitchCredential.updateOrCreate(
      {
        id: user.login,
      },
      {
        id: user.login,
        accessToken,
        refreshToken,
        accountType,
      },
    );

    return inertia.render('Redirect');
  }

  public async checkTwitchAccountStatus({ request, response }: HttpContextContract) {
    const query = await validator.validate({
      schema: schema.create({
        accountType: schema.enum(['main', 'bot']),
      }),
      data: request.qs(),
    });
    const accountType = query.accountType as TwitchAccountType;

    const twitchCredentials = await TwitchCredential.findBy('accountType', accountType);
    if (!twitchCredentials) {
      return response.notFound();
    }

    await TwitchService.apiGetCurrentUser({
      token: twitchCredentials.accessToken,
      refreshToken: twitchCredentials.refreshToken,
      accountType,
    })
      .then((currentUser) => {
        return response.ok({
          data: {
            id: currentUser.login,
          },
        });
      })
      .catch(() => {
        return response.badGateway();
      });
  }
}
