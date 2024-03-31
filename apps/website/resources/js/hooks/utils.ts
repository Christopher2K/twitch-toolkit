import type {
  ComputerScreenConfig,
  GlobalScreenConfig,
  GuestsScreensConfig,
  TwitchSubscriptionEvent,
} from '@twitchtoolkit/types';

export type SocketEventData = {
  'config:guests': GuestsScreensConfig;
  'config:computer': ComputerScreenConfig;
  'config:global': GlobalScreenConfig;
  'twitch:channel.follow': null;
  'twitch:channel.subscribe': TwitchSubscriptionEvent;
  'twitch:channel.subscription.gift': null;
  'twitch:channel.subscription.message': null;
  'twitch:channel.raid': null;
  'twitch:channel.cheer': null;
};
