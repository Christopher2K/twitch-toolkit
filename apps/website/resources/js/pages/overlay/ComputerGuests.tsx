import React from 'react';

import {
  type GlobalScreenConfig,
  type GuestsScreensConfig,
  defaultGuest,
} from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { css } from '~/styled-system/css';
import { hstack, vstack } from '~/styled-system/patterns';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';

type ComputerGuestsProps = {
  initialData: {
    guests: GuestsScreensConfig;
    global: GlobalScreenConfig;
  };
};

function ComputerGuests({ initialData }: ComputerGuestsProps) {
  const { 'config:global': globalData } = useSocketDataEvents({
    events: ['config:global'],
    initialData: { 'config:global': initialData.global },
  });

  const { 'config:guests': guestsData } = useSocketDataEvents({
    events: ['config:guests'],
    initialData: { 'config:guests': initialData.guests },
  });

  const participants = [defaultGuest, ...guestsData.guests];

  return (
    <div
      className={hstack({
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        w: 'full',
        h: 'full',
        gap: 0,
      })}
    >
      <div
        className={vstack({
          flex: 1,
          flexShrink: 1,
          gap: 0,
          height: 'full',
        })}
      >
        <div id="pcPlaceholder" className={css({ flex: 1 })}></div>
        <section
          className={css({
            w: 'full',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            px: '10',
            py: '4',
          })}
        >
          <p className={css({ fontSize: 'six', color: 'accent' })}>{globalData.banner ?? ''}</p>
          <h1 className={css({ fontSize: 'four', color: 'desktop-light' })}>
            {globalData.title ?? ''}
          </h1>
        </section>
      </div>

      <div
        className={vstack({
          width: '450px',
          height: 'full',
          flexShrink: 0,
          gap: 0,
        })}
      >
        {participants.map((participant) => (
          <div
            key={participant.name}
            className={css({
              position: 'relative',
              w: 'full',
              flexGrow: '1',
              flexBasis: '0',
              flexShrink: '0',
            })}
          >
            <CameraPlaceholder
              cameraType="portrait"
              className={css({
                gap: 0,
                width: 'full',
                height: 'full',
                flexShrink: 0,
              })}
            />

            <div
              className={vstack({
                position: 'absolute',
                bottom: '4',
                left: '4',
                display: 'inline-flex',
                gap: 0,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              })}
            >
              <p
                className={css({
                  px: '6',
                  py: '4',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  color: 'white',
                })}
              >
                {participant.name}
              </p>
              <p
                className={css({
                  px: '6',
                  py: '4',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  color: 'white',
                })}
              >
                {participant.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ComputerGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default ComputerGuests;
