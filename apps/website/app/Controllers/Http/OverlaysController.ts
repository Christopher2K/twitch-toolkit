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
    const globalConf = await ScreenConfiguration.findOrCreate('global');
    const computerConf = await ScreenConfiguration.findOrCreate('computer');

    return inertia.render('overlay/Computer', {
      initialData: {
        global: globalConf.config,
        computer: computerConf.config,
      },
    });
  }

  public async talkScreen({ inertia }: HttpContextContract) {
    const globalConf = await ScreenConfiguration.findOrCreate('global');
    return inertia.render('overlay/Talk', {
      initialData: {
        global: globalConf.config,
      },
    });
  }

  public async audioGuestsScreen({ inertia }: HttpContextContract) {
    const globalConf = await ScreenConfiguration.findOrCreate('global');
    const guestsConf = await ScreenConfiguration.findOrCreate('guests');

    return inertia.render('overlay/AudioGuests', {
      initialData: {
        global: globalConf.config,
        guests: guestsConf.config,
      },
    });
  }

  public async videoGuestsScreen({ inertia }: HttpContextContract) {
    const globalConf = await ScreenConfiguration.findOrCreate('global');
    const guestsConf = await ScreenConfiguration.findOrCreate('guests');

    return inertia.render('overlay/VideoGuests', {
      initialData: {
        global: globalConf.config,
        guests: guestsConf.config,
      },
    });
  }

  public async computerGuestsScreen({ inertia }: HttpContextContract) {
    const globalConf = await ScreenConfiguration.findOrCreate('global');
    const guestsConf = await ScreenConfiguration.findOrCreate('guests');

    return inertia.render('overlay/ComputerGuests', {
      initialData: {
        global: globalConf.config,
        guests: guestsConf.config,
      },
    });
  }
}
