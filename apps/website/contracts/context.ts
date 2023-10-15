declare module '@ioc:Adonis/Core/HttpContext' {
  import { Server } from 'socket.io';

  interface HttpContextContract {
    websocket: Server;
  }
}
