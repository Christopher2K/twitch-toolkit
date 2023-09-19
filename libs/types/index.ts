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
};

export type ScreenConfigId = keyof ScreenConfigObject;
export type ScreenConfig = ScreenConfigObject[keyof ScreenConfigObject];

export type ComputerScreenConfig = ScreenConfigObject['computer'];
export type TalkScreenConfig = ScreenConfigObject['talk'];
export type AudioGuestsScreenConfig = ScreenConfigObject['audioGuests'];

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

export type TwitchAccountType = 'bot' | 'main';

export enum TwitchSubscriptionType {
  ChannelFollow = 'channel.follow',
  ChannelSubscribe = 'channel.subscribe',
  ChannelSubscribeGift = 'channel.subscribe.gift',
  ChannelSubscriptionMessage = 'channel.subscription.message',
  ChannelCheer = 'channel.cheer',
  ChannelRaid = 'channel.raid',
}
