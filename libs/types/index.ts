export type ScreenConfigObject = {
  guest: {
    type: 'guest';
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

export type ScreenConfigId  = keyof ScreenConfigObject;
export type ScreenConfig = ScreenConfigObject[keyof ScreenConfigObject];

export type ComputerScreenConfig = ScreenConfigObject['computer'];
export type TalkScreenConfig = ScreenConfigObject['talk'];
export type GuestScreenConfig = ScreenConfigObject['guest'];


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

export const defaultGuestScreenConfig: GuestScreenConfig = {
  type: 'guest',
  banner: '',
  title: '',
  guests: [],
};
