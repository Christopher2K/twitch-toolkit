import { create } from 'zustand';

import { ScreenConfig, ScreenConfigObject } from '@twitchtoolkit/types';

import { API } from '@/services/api';

type ScreenConfigurationStore = {
  ready: boolean;
  loading: boolean;
  data: Partial<ScreenConfigObject> | null;
  request: () => Promise<void>;
  update: (config: ScreenConfig) => Promise<void>;
};

export const useScreenConfigurationStore = create<ScreenConfigurationStore>((set) => {
  return {
    loading: false,
    ready: false,
    data: null,
    request: async () => {
      set({ loading: true });
      API.getScreenConfigurations()
        .then(({ data }) => {
          set({
            ready: true,
            loading: false,
            data: data.reduce((acc, item) => {
              return {
                ...acc,
                [item.id]: item.config,
              };
            }, {} as ScreenConfigObject),
          });
        })
        .catch(() => {
          set({ loading: false });
        });
    },
    update: async (config: ScreenConfig) => {
      set({ loading: true });

      API.updateScreenConfiguration(config)
        .then(({ data }) => {
          set((state) => ({
            loading: false,
            data: {
              ...state.data,
              [data.config.type]: data.config,
            },
          }));
        })
        .catch(() => set({ loading: false }));
    },
  };
});
