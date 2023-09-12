import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ScreenConfiguration from 'App/Models/ScreenConfiguration';

export default class OverlaysController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Index');
  }

  public async startScreen({ inertia }: HttpContextContract) {
    return inertia.render('overlay/StartStreaming');
  }

  public async endScreen({ inertia }: HttpContextContract) {
    return inertia.render('overlay/EndStreaming');
  }

  public async brbScreen({ inertia }: HttpContextContract) {
    return inertia.render('overlay/BeRightBack');
  }

  public async computerScreen({ inertia }: HttpContextContract) {
    const configuration = await ScreenConfiguration.findOrCreate('computer');
    return inertia.render('overlay/Computer', {
      initialData: configuration.config,
    });
  }

  public async talkScreen({ inertia }: HttpContextContract) {
    const configuration = await ScreenConfiguration.findOrCreate('talk');
    return inertia.render('overlay/Talk', {
      initialData: configuration.config,
    });
  }

  public async audioGuestsScreen({ inertia }: HttpContextContract) {
    const configuration = await ScreenConfiguration.findOrCreate('audioGuests');
    return inertia.render('overlay/AudioGuests', {
      initialData: configuration.config,
    });
  }
}
