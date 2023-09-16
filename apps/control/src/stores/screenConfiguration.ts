import { create } from 'zustand';

import { ScreenConfig, ScreenConfigObject } from '@twitchtoolkit/types';

import { API, APITypes } from '@/services/api';
import { toast } from '@/services/toast';
import { handleHttpError } from '@/services/httpClient';
import type { ToastId } from '@chakra-ui/react';

type ScreenConfigurationStore = {
  ready: boolean;
  loading: boolean;
  data: Partial<ScreenConfigObject> | null;
  request: () => Promise<APITypes.ScreenConfigResponse | ToastId | void>;
  update: (config: ScreenConfig) => Promise<APITypes.UpdateScreenConfigResponse | ToastId | void>;
};

export const useScreenConfigurationStore = create<ScreenConfigurationStore>((set) => {
  return {
    loading: false,
    ready: false,
    data: null,

    request: async () => {
      set({ loading: true });
      return API.getScreenConfigurations()
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
        .catch(handleHttpError)
        .finally(() => {
          set({ loading: false });
        });
    },
    update: async (config: ScreenConfig) => {
      set({ loading: true });

      return API.updateScreenConfiguration(config)
        .then(({ data }) => {
          set((state) => ({
            loading: false,
            data: {
              ...state.data,
              [data.config.type]: data.config,
            },
          }));

          toast({
            description: 'Saved!',
            status: 'success',
          });
        })
        .catch(handleHttpError)
        .finally(() => set({ loading: false }));
    },
  };
});
