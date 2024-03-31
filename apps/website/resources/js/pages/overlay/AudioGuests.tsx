import React from 'react';
import { Volume2Icon } from 'lucide-react';

import {
  type GlobalScreenConfig,
  type GuestsScreensConfig,
  defaultGuest,
} from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder, AudioParticipant } from '~/components';
import { css } from '~/styled-system/css';
import { hstack, vstack } from '~/styled-system/patterns';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';

type AudioGuestsProps = {
  initialData: {
    guests: GuestsScreensConfig;
    global: GlobalScreenConfig;
  };
};

function AudioGuests({ initialData }: AudioGuestsProps) {
  const { 'config:global': globalData } = useSocketDataEvents({
    events: ['config:global'],
    initialData: { 'config:global': initialData.global },
  });

  const { 'config:guests': guestsData } = useSocketDataEvents({
    events: ['config:guests'],
    initialData: { 'config:guests': initialData.guests },
  });

  return (
    <div
      className={hstack({
        position: 'relative',
        gap: '0',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 'full',
        height: 'full',
      })}
    >
      <CameraPlaceholder cameraType="landscape" />

      <section
        className={hstack({
          position: 'absolute',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          gap: '0',
          top: 0,
          left: 0,
          h: 'full',
          w: 'full',
        })}
      >
        <section
          className={css({
            position: 'relative',
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

        <section
          className={hstack({
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            h: 'full',
            w: '25%',
            p: '4',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
          })}
        >
          {guestsData.guests.map((guest) => (
            <AudioParticipant key={guest.name} name={guest.name} description={guest.description} />
          ))}
        </section>
      </section>
    </div>
  );
}

AudioGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default AudioGuests;
