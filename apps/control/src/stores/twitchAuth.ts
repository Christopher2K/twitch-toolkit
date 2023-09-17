import { create } from 'zustand';

import { TwitchAccountType } from '@twitchtoolkit/types';

import { useAuthStore } from './auth';
import { API } from '@/services/api';

type TwitchAuthStore = {
  botAccount: null | string;
  checkingBotAccount: boolean;
  mainAccount: null | string;
  checkingMainAccount: boolean;

  init(): Promise<void>;
  checkAccount(accountType: TwitchAccountType): Promise<void>;
};

export const useTwitchAuthStore = create<TwitchAuthStore>((set, get) => {
  return {
    ready: false,
    botAccount: null,
    checkingBotAccount: false,
    mainAccount: null,
    checkingMainAccount: false,
    init: async () => {
      set({ checkingBotAccount: true, checkingMainAccount: true });
      Promise.allSettled([
        API.checkTwitchAccount('main')
          .then(({ data }) => set({ mainAccount: data.id }))
          .finally(() => set({ checkingMainAccount: false })),
        API.checkTwitchAccount('bot')
          .then(({ data }) => set({ botAccount: data.id }))
          .finally(() => set({ checkingBotAccount: false })),
      ]);
    },
    checkAccount: async (accountType: TwitchAccountType) => {},
  };
});

useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    console.log(user);
    if (user) {
      useTwitchAuthStore.getState().init();
    }
  },
);
