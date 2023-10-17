import { useEffect, useState } from 'react';

import { useSocket } from '~/providers/SocketProvider';
import type { SocketEventData } from './utils';

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
