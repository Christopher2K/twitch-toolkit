import React, { useCallback, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { flex } from '~/styled-system/patterns';
import { useSocketEventListener, EventHandler } from '~/hooks/useSocketEventListener';

import { AlertItem } from './AlertItem';
import { TwitchEvent } from '@twitchtoolkit/types/index';

function useDebounce<T extends any[], R>(fn: (...input: T) => R, time: number) {
  const locked = useRef<boolean>(false);

  return useCallback((...params: Parameters<typeof fn>) => {
    if (locked.current) return;

    locked.current = true;
    setTimeout(() => {
      locked.current = false;
    }, time);
    return fn(...params);
  }, []);
}

export function Alerts() {
  const [displayedEvent, setDisplayedEvent] = useState<TwitchEvent | undefined>(undefined);

  const onEvent: EventHandler<'twitch:channel.subscribe'> = useDebounce((_, data) => {
    setDisplayedEvent(data);
    setTimeout(() => {
      setDisplayedEvent(undefined);
    }, 5000);
  }, 6000);

  useSocketEventListener({
    pattern: /twitch:.*/,
    onEvent,
  });

  return (
    <div
      id="alert_layer"
      className={flex({
        position: 'fixed',
        top: '4%',
        left: '2%',
        zIndex: '10',
        justifyContent: 'center',
      })}
    >
      <AnimatePresence>{displayedEvent && <AlertItem event={displayedEvent} />}</AnimatePresence>
    </div>
  );
}
