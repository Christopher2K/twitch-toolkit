import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

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
    return inertia.render('overlay/Computer');
  }

  public async talkScreen({ inertia }: HttpContextContract) {
    return inertia.render('overlay/Talk');
  }

  public async audioGuestsScreen({ inertia }: HttpContextContract) {
    return inertia.render('overlay/AudioGuests');
  }
}
