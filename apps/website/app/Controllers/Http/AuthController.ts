import { Duration } from 'luxon';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';

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
}
