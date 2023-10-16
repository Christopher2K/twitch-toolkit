import { useEffect, useState } from 'react';

import type {
  AudioGuestsScreenConfig,
  ComputerGuestsScreenConfig,
  ComputerScreenConfig,
  TalkScreenConfig,
  VideoGuestsScreenConfig,
} from '@twitchtoolkit/types';
import { useSocket } from '~/providers/SocketProvider';

export type SocketEventData = {
  'config:audioGuests': AudioGuestsScreenConfig;
  'config:computer': ComputerScreenConfig;
  'config:computerGuests': ComputerGuestsScreenConfig;
  'config:talk': TalkScreenConfig;
  'config:videoGuests': VideoGuestsScreenConfig;
  'twitch:channel.follow': null;
  'twitch:channel.subscribe': null;
  'twitch:channel.subscription.gift': null;
  'twitch:channel.subscription.message': null;
  'twitch:channel.raid': null;
  'twitch:channel.cheer': null;
};

export type UseSocketDataEventArgs = {
  events: Array<keyof SocketEventData>;
  initialData?: Partial<SocketEventData>;
};

export function useSocketDataEvents({ events, initialData = {} }: UseSocketDataEventArgs) {
  const [data, setData] = useState<Partial<SocketEventData>>(initialData);
  const socket = useSocket();

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

  return data;
}
