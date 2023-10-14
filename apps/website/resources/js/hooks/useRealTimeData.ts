import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import type { ScreenConfig } from '@twitchtoolkit/types';

type UseRealTimeDataArgs<T extends ScreenConfig> = {
  initialData: T;
};

export function useRealTimeData<T extends ScreenConfig>({ initialData }: UseRealTimeDataArgs<T>) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const socket = io('/');
    socket.on(initialData.type, setData);

    return () => {
      socket.disconnect();
    };
  }, []);

  return data;
}
