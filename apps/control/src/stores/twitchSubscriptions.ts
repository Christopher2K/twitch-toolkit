import { create } from 'zustand';

import { type APITypes, API } from '@/services/api';

type TwitchSubscriptionsStore = {
  ready: boolean;
  subscriptions: APITypes.TwitchSubscription[];
  request(): Promise<void>;
  // update(): Promise<void>;
};

export const useTwitchSubscriptionsStore = create<TwitchSubscriptionsStore>((set) => {
  return {
    ready: false,
    subscriptions: [],
    request: async () => {
      return API.getTwitchSubscriptions()
        .then(({ data }) => set({ subscriptions: data }))
        .catch(() => set({ ready: true }));
    },
  };
});
