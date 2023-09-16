import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ComputerScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { css } from '~/styled-system/css';

type ComputerProps = {
  initialData: ComputerScreenConfig;
};

function Computer({ initialData }: ComputerProps) {
  const [data, setData] = useState(initialData);
  const focusModeEnabled = data.focusMode;

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
            position: 'relative',
            bg: 'placeholder',
            w: 'full',
            h: 'auto',
            aspectRatio: '16/9',
            flexShrink: 0,
          })}
        >
          {focusModeEnabled && (
            <div
              className={css({
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                py: '2',

                display: 'flex',
                flexDir: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              })}
            >
              <p
                className={css({
                  background: 'red.500',
                  px: '4',
                  py: '2',
                  fontSize: 'lg',
                  borderTopLeftRadius: 'lg',
                  borderTopRightRadius: 'lg',
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                })}
              >
                🔇FOCUS MODE 🔇
              </p>
              <p
                className={css({
                  background: 'red.500',
                  px: '4',
                  py: '2',
                  borderRadius: 'lg',
                  textAlign: 'center',
                })}
              >
                <span>🇬🇧 Can't talk right now, but checking the chat!</span>
                <br />
                <span>🇫🇷 Je parle pas mais je check le chat!</span>
              </p>
            </div>
          )}
        </section>

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
