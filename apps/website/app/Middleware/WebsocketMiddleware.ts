import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Ws from 'App/Services/Ws';

export default class WebsocketMiddleware {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    ctx.websocket = Ws.io;
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next();
  }
}
