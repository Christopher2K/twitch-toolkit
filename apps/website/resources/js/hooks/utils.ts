import type {
  AudioGuestsScreenConfig,
  ComputerGuestsScreenConfig,
  ComputerScreenConfig,
  TalkScreenConfig,
  VideoGuestsScreenConfig,
  TwitchSubscriptionEvent,
} from '@twitchtoolkit/types';

export type SocketEventData = {
  'config:audioGuests': AudioGuestsScreenConfig;
  'config:computer': ComputerScreenConfig;
  'config:computerGuests': ComputerGuestsScreenConfig;
  'config:talk': TalkScreenConfig;
  'config:videoGuests': VideoGuestsScreenConfig;
  'twitch:channel.follow': null;
  'twitch:channel.subscribe': TwitchSubscriptionEvent;
  'twitch:channel.subscription.gift': null;
  'twitch:channel.subscription.message': null;
  'twitch:channel.raid': null;
  'twitch:channel.cheer': null;
};
