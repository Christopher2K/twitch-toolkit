import { useEffect } from 'react';

import { useSocket } from '~/providers/SocketProvider';
import type { SocketEventData } from './utils';

export type UseSocketEventListenerArgs = {
  pattern: RegExp;
  onEvent: <T extends keyof SocketEventData>(eventName: T, data: SocketEventData[T]) => any;
};
export function useSocketEventListener({ pattern, onEvent }: UseSocketEventListenerArgs) {
  const socket = useSocket();

  useEffect(() => {
    socket.onAny(
      (eventName: keyof SocketEventData, data: SocketEventData[keyof SocketEventData]) => {
        if (pattern.test(eventName)) {
          onEvent(eventName, data);
        }
      },
    );
    return () => {
      socket.offAny();
    };
  }, []);
}
