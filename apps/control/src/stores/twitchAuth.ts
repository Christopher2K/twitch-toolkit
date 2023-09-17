import { create } from 'zustand';

import { useAuthStore } from './auth';
import { API } from '@/services/api';

type TwitchAuthStore = {
  botAccount: null | string;
  checkingBotAccount: boolean;
  mainAccount: null | string;
  checkingMainAccount: boolean;

  checkAccounts(): Promise<void>;
};

export const useTwitchAuthStore = create<TwitchAuthStore>((set) => {
  return {
    botAccount: null,
    checkingBotAccount: false,
    mainAccount: null,
    checkingMainAccount: false,
    checkAccounts: async () => {
      set({ checkingBotAccount: true, checkingMainAccount: true });
      Promise.allSettled([
        API.checkTwitchAccount('main')
          .then(({ data }) => set({ mainAccount: data.id }))
          .catch(() => set({ mainAccount: null }))
          .finally(() => set({ checkingMainAccount: false })),
        API.checkTwitchAccount('bot')
          .then(({ data }) => set({ botAccount: data.id }))
          .catch(() => set({ botAccount: null }))
          .finally(() => set({ checkingBotAccount: false })),
      ]);
    },
  };
});

useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    if (user) {
      useTwitchAuthStore.getState().checkAccounts();
    }
  },
);
