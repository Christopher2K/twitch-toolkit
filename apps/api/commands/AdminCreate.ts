import { BaseCommand } from '@adonisjs/core/build/standalone';

export default class CreateAdmin extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'admin:create';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Create an admin account';

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  };

  public async run() {
    const { default: User } = await import('App/Models/User');
    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      this.logger.fatal(
        '❌ ADMIN_USERNAME and ADMIN_PASSWORD needs to be defined to user this command',
      );
      return;
    }

    const maybeUser = await User.findBy('username', ADMIN_USERNAME);
    if (maybeUser != null) {
      this.logger.info('🔄 ADMIN_USER is already created!');
      return;
    }

    await User.create({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });

    this.logger.success('✅ Admin account created!');
  }
}
