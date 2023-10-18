export type ScreenConfigObject = {
  audioGuests: {
    type: 'audioGuests';
    banner: string;
    title: string;
    guests: Array<{ name: string; description: string }>;
  };
  talk: {
    type: 'talk';
    banner: string;
    title: string;
  };
  computer: {
    type: 'computer';
    banner: string;
    title: string;
    focusMode: boolean;
  };
  videoGuests: {
    type: 'videoGuests';
    banner: string;
    title: string;
  };
  computerGuests: {
    type: 'computerGuests';
    banner: string;
    title: string;
  };
};

export type ScreenConfigId = keyof ScreenConfigObject;
export type ScreenConfig = ScreenConfigObject[keyof ScreenConfigObject];

export type ComputerScreenConfig = ScreenConfigObject['computer'];
export type TalkScreenConfig = ScreenConfigObject['talk'];
export type AudioGuestsScreenConfig = ScreenConfigObject['audioGuests'];
export type VideoGuestsScreenConfig = ScreenConfigObject['videoGuests'];
export type ComputerGuestsScreenConfig = ScreenConfigObject['computerGuests'];

export const defaultComputerScreenConfig: ComputerScreenConfig = {
  type: 'computer',
  banner: '',
  title: '',
  focusMode: false,
};

export const defaultTalkScreenConfig: TalkScreenConfig = {
  type: 'talk',
  banner: '',
  title: '',
};

export const defaultAudioGuestsScreenConfig: AudioGuestsScreenConfig = {
  type: 'audioGuests',
  banner: '',
  title: '',
  guests: [],
};

export const defaultVideoGuestsScreenConfig: VideoGuestsScreenConfig = {
  type: 'videoGuests',
  banner: '',
  title: '',
};

export const defaultComputerGuestsScreenConfig: ComputerGuestsScreenConfig = {
  type: 'computerGuests',
  banner: '',
  title: '',
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
