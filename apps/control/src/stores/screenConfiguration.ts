import { create } from 'zustand';
import { API, APITypes } from '@/services/api';

type ScreenConfigurationStore = {
  ready: boolean;
  loading: boolean;
  data: APITypes.ConfigType | null;
  request: () => Promise<void>;
  // update: () => Promise<void>;
};

export const useScreenConfigurationStore = create<ScreenConfigurationStore>((set, get) => {
  return {
    loading: false,
    ready: false,
    data: null,
    request: async () => {
      set({ loading: true });
      API.getScreenConfigurations()
        .json(({ data }: APITypes.ScreenConfigResponse) => {
          set({
            ready: true,
            loading: false,
            data: data.reduce((acc, item) => {
              return {
                ...acc,
                [item.id]: item.config,
              };
            }, {} as APITypes.ConfigType),
          });
        })
        .catch(() => {
          set({ loading: false });
        });
    },
  };
});
