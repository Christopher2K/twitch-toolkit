/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'AuthController.login');
    Route.post('logout', 'AuthController.logout').middleware('auth');
    Route.get('me', 'AuthController.me').middleware('auth');
    Route.get('twitch/login', 'AuthController.twitchLogin');
    Route.get('twitch/redirect', 'AuthController.twitchRedirect');
  }).prefix('auth');

  Route.resource('screen-config', 'ScreenConfigurationsController')
    .apiOnly()
    .except(['destroy', 'store'])
    .middleware({
      update: 'auth',
    });
}).prefix('api');

Route.group(() => {
  Route.get('', 'OverlaysController.index');
  Route.get('start-streaming', 'OverlaysController.startScreen');
  Route.get('end-streaming', 'OverlaysController.endScreen');
  Route.get('brb', 'OverlaysController.brbScreen');
  Route.get('computer', 'OverlaysController.computerScreen');
  Route.get('talk', 'OverlaysController.talkScreen');
  Route.get('audio-guests', 'OverlaysController.audioGuestsScreen');
});
