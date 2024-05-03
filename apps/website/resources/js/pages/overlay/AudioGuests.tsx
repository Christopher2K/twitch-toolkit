import React from 'react';

import { type GlobalScreenConfig, type GuestsScreensConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder, AudioParticipant, TitleBanner } from '~/components';
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
      className={css({
        width: 'full',
        height: 'full',
        backgroundColor: 'desktop',
        p: '4',
      })}
    >
      <div
        className={css({
          layerStyle: 'card',
          position: 'relative',
          width: 'full',
          height: 'full',
          backgroundColor: 'placeholder',
        })}
      >
        <TitleBanner title={globalData.title} banner={globalData.banner} />
        <section
          className={vstack({
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '4',
            bottom: '4',
            right: '4',
          })}
        >
          {guestsData.guests.map((guest) => (
            <AudioParticipant key={guest.name} name={guest.name} description={guest.description} />
          ))}
        </section>
      </div>
    </div>
  );
}

AudioGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default AudioGuests;
