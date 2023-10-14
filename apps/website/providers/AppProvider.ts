import type { ApplicationContract } from '@ioc:Adonis/Core/Application';
import Twitch from 'App/Services/Twitch';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('TwitchToolkit/Services/Twitch', () => new Twitch());
  }

  public async boot() {
    // IoC container is ready
    const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm');
    const { default: CamelCaseNamingStrategy } = await import(
      'App/Helpers/CamelCaseNamingStrategy'
    );
    BaseModel.namingStrategy = new CamelCaseNamingStrategy();
  }

  public async ready() {
    const { default: TwitchService } = await import('@ioc:TwitchToolkit/Services/Twitch');
    await TwitchService.configureAppClient();
    await import('../start/socket');
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
