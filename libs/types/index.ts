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
  ChannelSubscribeGift = 'channel.subscribe.gift',
  ChannelSubscriptionMessage = 'channel.subscription.message',
  ChannelCheer = 'channel.cheer',
  ChannelRaid = 'channel.raid',
}

export const twitchSubscriptionVersionByType: Record<TwitchSubscriptionType, string> = {
  [TwitchSubscriptionType.ChannelFollow]: '2',
  [TwitchSubscriptionType.ChannelSubscribe]: '1',
  [TwitchSubscriptionType.ChannelSubscribeGift]: '1',
  [TwitchSubscriptionType.ChannelSubscriptionMessage]: '1',
  [TwitchSubscriptionType.ChannelCheer]: '1',
  [TwitchSubscriptionType.ChannelRaid]: '1',
};
