import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { ComputerScreenConfig } from '@twitchtoolkit/types';
import { css } from '~/styled-system/css';

type ComputerProps = {
  initialData: ComputerScreenConfig;
};

function Computer({ initialData }: ComputerProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const socket = io('/');
    socket.on('computer', setData);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      className={css({
        bg: 'desktop',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        w: 'full',
        h: 'full',
      })}
    >
      <div className={css({ w: '75%' })}>
        <section
          className={css({
            bg: 'placeholder',
            w: 'full',
            h: 'auto',
            aspectRatio: '16/9',
            flexShrink: 0,
          })}
        />

        <div
          className={css({
            flex: '1',
            h: 'full',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            py: '4',
            px: '10',
          })}
        >
          <h1
            className={css({
              textAlign: 'center',
              gap: '10',
              fontSize: 'six',
              color: 'accent',
            })}
          >
            {data.banner}
          </h1>
          <h2
            className={css({
              textAlign: 'center',
              fontSize: 'four',
              color: 'desktop-light',
            })}
          >
            {data.title}
          </h2>
        </div>
      </div>
      <div className={css({ w: '25%', p: '10', h: 'full', position: 'relative' })}>
        <CameraPlaceholder
          cameraType="portrait"
          className={css({
            w: 'full',
            borderWidth: '8px',
            borderColor: 'desktop-light',
            rounded: 'xl',
            flexShrink: '0',
          })}
        />
        <CameraPlaceholder
          cameraType="portrait"
          className={css({
            position: 'absolute',
            top: '55%',
            left: '50%',
            w: '50%',
            borderWidth: '8px',
            borderColor: 'desktop-light',
            rounded: 'xl',
            flexShrink: '0',
            transform: 'translateX(-50%)',
          })}
        />
      </div>
    </div>
  );
}

Computer.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Computer;
