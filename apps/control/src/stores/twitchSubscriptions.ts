import { create } from 'zustand';

import { type APITypes, API } from '@/services/api';
import { TwitchSubscriptionType } from '@twitchtoolkit/types/index';

type TwitchSubscriptionsStore = {
  ready: boolean;
  subscriptions: APITypes.TwitchSubscription[];
  request(): Promise<void>;
  create(type: TwitchSubscriptionType): Promise<boolean>;
  delete(type: TwitchSubscriptionType): Promise<boolean>;
};

export const useTwitchSubscriptionsStore = create<TwitchSubscriptionsStore>((set) => {
  return {
    ready: false,
    subscriptions: [],
    request: async () => {
      return API.getTwitchSubscriptions()
        .then(({ data }) => set({ subscriptions: data }))
        .finally(() => set({ ready: true }));
    },
    create: async (type) => {
      return API.createTwitchSubscription(type)
        .then(({ data }) => {
          set((state) => ({ subscriptions: [...state.subscriptions, data] }));
          return true;
        })
        .catch(() => false);
    },
    delete: async () => {
      // TODO
      return true;
    },
  };
});
