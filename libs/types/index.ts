export type ScreenConfigObject = {
  global: {
    type: 'global';
    banner: string;
    title: string;
  };
  guests: {
    type: 'guests';
    guests: Array<{ name: string; description: string }>;
  };
  computer: {
    type: 'computer';
    focusMode: boolean;
  };
};

export type ScreenConfigId = keyof ScreenConfigObject;
export type ScreenConfig = ScreenConfigObject[keyof ScreenConfigObject];

export type ComputerScreenConfig = ScreenConfigObject['computer'];
export type GlobalScreenConfig = ScreenConfigObject['global'];
export type GuestsScreensConfig = ScreenConfigObject['guests'];

export const defaultGlobalScreenConfig: GlobalScreenConfig = {
  type: 'global',
  banner: '',
  title: '',
};

export const defaultComputerScreenConfig: ComputerScreenConfig = {
  type: 'computer',
  focusMode: false,
};

export const defaultGuestsScreensConfig: GuestsScreensConfig = {
  type: 'guests',
  guests: [],
};

export const defaultGuest: GuestsScreensConfig['guests'][number] = {
  name: '@LLCoolChris_',
  description: 'Senior Software Eng',
};

export type TwitchAccountType = 'bot' | 'main';

export enum TwitchSubscriptionType {
  ChannelFollow = 'channel.follow',
  ChannelSubscribe = 'channel.subscribe',
  ChannelSubscriptionGift = 'channel.subscription.gift',
  ChannelSubscriptionMessage = 'channel.subscription.message',
  ChannelCheer = 'channel.cheer',
  ChannelRaid = 'channel.raid',
}

export type TwitchSubscriptionEvent = {
  __type: TwitchSubscriptionType.ChannelSubscribe;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  is_gift: boolean;
  tier: '1000' | '2000' | '3000';
  user_id: string;
  user_login: string;
  user_name: string;
};

export type TwitchFollowEvent = {
  __type: TwitchSubscriptionType.ChannelFollow;
  user_id: string;
  user_login: string;
  user_name: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  followed_at: string;
};

export type TwitchSubscriptionGiftEvent = {
  __type: TwitchSubscriptionType.ChannelSubscriptionGift;
  user_id: string;
  user_login: string;
  user_name: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  total: number;
  tier: '1000' | '2000' | '3000';
  cumulative_total: number | null; //null if anonymous or not shared by the user
  is_anonymous: boolean;
};

export type TwitchSubscriptionMessageEvent = {
  __type: TwitchSubscriptionType.ChannelSubscriptionMessage;
  user_id: string;
  user_login: string;
  user_name: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  tier: '1000' | '2000' | '3000';
  message: {
    text: string;
    emotes: Array<{
      begin: number;
      end: number;
      id: string;
    }>;
  };
  cumulative_months: number;
  streak_months: number | number; // null if not shared
  duration_months: number;
};

export type TwitchCheerEvent = {
  __type: TwitchSubscriptionType.ChannelCheer;
  is_anonymous: boolean;
  user_id: string | null; // null if is_anonymous=true
  user_login: string | null; // null if is_anonymous=true
  user_name: string | null; // null if is_anonymous=true
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  message: string;
  bits: number;
};

export type TwitchRaidEvent = {
  __type: TwitchSubscriptionType.ChannelRaid;
  from_broadcaster_user_id: string;
  from_broadcaster_user_login: string;
  from_broadcaster_user_name: string;
  to_broadcaster_user_id: string;
  to_broadcaster_user_login: string;
  to_broadcaster_user_name: string;
  viewers: number;
};

export type TwitchEvent =
  | TwitchFollowEvent
  | TwitchSubscriptionEvent
  | TwitchSubscriptionGiftEvent
  | TwitchSubscriptionMessageEvent
  | TwitchCheerEvent
  | TwitchRaidEvent;

export const twitchSubscriptionVersionByType: Record<TwitchSubscriptionType, string> = {
  [TwitchSubscriptionType.ChannelFollow]: '2',
  [TwitchSubscriptionType.ChannelSubscribe]: '1',
  [TwitchSubscriptionType.ChannelSubscriptionGift]: '1',
  [TwitchSubscriptionType.ChannelSubscriptionMessage]: '1',
  [TwitchSubscriptionType.ChannelCheer]: '1',
  [TwitchSubscriptionType.ChannelRaid]: '1',
};
