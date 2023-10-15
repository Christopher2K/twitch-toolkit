import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import type {
  AudioGuestsScreenConfig,
  ComputerGuestsScreenConfig,
  ComputerScreenConfig,
  TalkScreenConfig,
  VideoGuestsScreenConfig,
} from '@twitchtoolkit/types';

export type SocketEventData = {
  'config:audioGuests': AudioGuestsScreenConfig;
  'config:computer': ComputerScreenConfig;
  'config:computerGuests': ComputerGuestsScreenConfig;
  'config:talk': TalkScreenConfig;
  'config:videoGuests': VideoGuestsScreenConfig;
};

export type UseSocketDataEventArgs = {
  events: Array<keyof SocketEventData>;
  initialData?: Partial<SocketEventData>;
};

export function useSocketDataEvents({ events, initialData = {} }: UseSocketDataEventArgs) {
  const [data, setData] = useState<Partial<SocketEventData>>(initialData);
  const { current: socket } = useRef(io('/'));

  useEffect(() => {
    events.forEach((eventName) => {
      socket.on(eventName, (eventData) => setData((d) => ({ ...d, [eventName]: eventData })));
    });

    return () => {
      events.forEach((eventName) => {
        socket.off(eventName);
      });
    };
  }, [events]);

  useEffect(
    () => () => {
      socket.disconnect();
    },
    [],
  );

  return data;
}
