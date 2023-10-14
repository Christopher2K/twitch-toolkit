import React from 'react';
import { Volume2Icon } from 'lucide-react';
import type { AudioGuestsScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder, AudioParticipant } from '~/components';
import { useRealTimeData } from '~/hooks/useRealTimeData';
import { css } from '~/styled-system/css';
import { flex } from '~/styled-system/patterns';

type AudioGuestsProps = {
  initialData: AudioGuestsScreenConfig;
};

function AudioGuests({ initialData }: AudioGuestsProps) {
  const data = useRealTimeData<AudioGuestsScreenConfig>({ initialData });

  return (
    <div
      className={flex({
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        py: '10',
        px: '20',
        background: 'desktop',
        height: 'full',
      })}
    >
      <header
        className={css({
          w: 'full',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          mb: '10',
        })}
      >
        <p className={css({ fontSize: 'six', color: 'accent' })}>{data.banner ?? ''}</p>
        <h1 className={css({ fontSize: 'four', color: 'desktop-light' })}>{data.title ?? ''}</h1>
      </header>
      <section
        className={flex({
          w: '100%',
          flex: 1,
          flexDir: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '10',
        })}
      >
        <CameraPlaceholder cameraType="landscape" className={css({ width: '70%' })} />

        {data.guests.length > 0 && (
          <section className={css({ flex: 1, width: 'full' })}>
            <div
              className={flex({
                flexDir: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '4',
                backgroundColor: 'accent',
                px: '4',
                py: '2',
                rounded: 'xl',
              })}
            >
              <Volume2Icon className={css({ width: '50px', h: 'auto', color: 'white' })} />
              <p className={css({ fontSize: 'five', color: 'white' })}>Guests audio</p>
            </div>

            {data.guests.map((guest) => {
              return (
                <AudioParticipant key={guest.name} name={`${guest.name}, ${guest.description}`} />
              );
            })}
          </section>
        )}
      </section>
    </div>
  );
}

AudioGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default AudioGuests;
