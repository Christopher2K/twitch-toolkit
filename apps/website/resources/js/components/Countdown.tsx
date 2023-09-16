import React, { useState, useEffect, PropsWithChildren } from 'react';
import { css } from '~/styled-system/css';
import { flex } from '~/styled-system/patterns';

export type CountdownProps = PropsWithChildren<{
  minutes: number;
}>;

export function Countdown({ children, minutes }: CountdownProps) {
  const [time, setTime] = useState(minutes * 60);

  const getMinutesLabel = () => {
    const value = (time / 60) >> 0;
    return value.toString().length === 1 ? `0${value}` : value;
  };

  const getSecondsLabel = () => {
    const value = time % 60;
    return value.toString().length === 1 ? `0${value}` : value;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => {
        if (time === 1) clearInterval(interval);
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (time === 0) return <>{children}</>;

  return (
    <div
      className={flex({
        justifyContent: 'center',
        alignItems: 'center',
        minH: 100,
        px: '10',
        py: '2',
        border: 'solid',
        borderWidth: 'thick',
        borderColor: 'white',
        borderRadius: 'xl',
      })}
    >
      <p className={css({ fontSize: 'four' })}>
        {getMinutesLabel()}:{getSecondsLabel()}
      </p>
    </div>
  );
}
