import React from 'react';
import {
  type GlobalScreenConfig,
  type GuestsScreensConfig,
  defaultGuest,
} from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { css } from '~/styled-system/css';
import { flex, hstack, vstack } from '~/styled-system/patterns';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';

type VideoGuestsProps = {
  initialData: {
    guests: GuestsScreensConfig;
    global: GlobalScreenConfig;
  };
};

function VideoGuests({ initialData }: VideoGuestsProps) {
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
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 'full',
        width: 'full',
        gap: 0,
      })}
    >
      <section
        className={flex({
          w: '100%',
          h: '100%',
        })}
      >
        {participants.map((participant) => (
          <CameraPlaceholder
            key={participant.name}
            cameraType="portrait"
            className={css({ width: 'full', flex: 1, height: '100%', margin: 'auto' })}
          />
        ))}
      </section>
      <section
        className={css({
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          w: 'full',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          px: '10',
          py: '4',
        })}
      >
        <div
          className={hstack({
            position: 'absolute',
            top: 0,
            left: 0,
            w: 'full',
            transform: 'translateY(-100%)',
          })}
        >
          {participants.map((participant) => (
            <div key={participant.name} className={css({ flex: 1, p: 10, marginX: 'auto' })}>
              <div
                className={vstack({
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
        <p className={css({ fontSize: 'six', color: 'accent' })}>{globalData.banner ?? ''}</p>
        <h1 className={css({ fontSize: 'four', color: 'desktop-light' })}>
          {globalData.title ?? ''}
        </h1>
      </section>
    </div>
  );
}

VideoGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default VideoGuests;
