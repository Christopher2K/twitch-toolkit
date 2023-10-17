import { useEffect } from 'react';

import { useSocket } from '~/providers/SocketProvider';
import type { SocketEventData } from './utils';

export type EventHandler<T extends keyof SocketEventData> = (
  eventName: T,
  data: SocketEventData[T],
) => any;
export type UseSocketEventListenerArgs<T extends keyof SocketEventData> = {
  pattern: RegExp;
  onEvent: EventHandler<T>;
};
export function useSocketEventListener<T extends keyof SocketEventData>({
  pattern,
  onEvent,
}: UseSocketEventListenerArgs<T>) {
  const socket = useSocket();

  useEffect(() => {
    socket.onAny((eventName: T, data: SocketEventData[T]) => {
      if (pattern.test(eventName)) {
        onEvent(eventName, data);
      }
    });
    return () => {
      socket.offAny();
    };
  }, []);
}
