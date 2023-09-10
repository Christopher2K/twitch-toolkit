import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is readyS
    const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm');
    const { default: CamelCaseNamingStrategy } = await import(
      'App/Helpers/CamelCaseNamingStrategy'
    );
    BaseModel.namingStrategy = new CamelCaseNamingStrategy();
  }

  public async ready() {
    await import('../start/socket');
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
