import { useMemo } from 'react';

import { useAuthStore } from './auth';

type AppStore = {
  ready: boolean;
};

export function useAppStore(): AppStore {
  const authReady = useAuthStore((state) => state.ready);
  const state = useMemo(
    () => ({
      ready: authReady,
    }),
    [authReady],
  );

  return state;
}
