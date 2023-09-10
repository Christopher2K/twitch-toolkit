import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class OverlaysController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Index');
  }

  public async computerScreen({ inertia }: HttpContextContract) {
    return inertia.render('ComputerScreen');
  }
}
