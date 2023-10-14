import React from 'react';
import type { VideoGuestsScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { useRealTimeData } from '~/hooks/useRealTimeData';
import { css } from '~/styled-system/css';
import { flex } from '~/styled-system/patterns';

type VideoGuestsProps = {
  initialData: VideoGuestsScreenConfig;
  nbOfParticipants: number;
};

function VideoGuests({ initialData, nbOfParticipants }: VideoGuestsProps) {
  const data = useRealTimeData<VideoGuestsScreenConfig>({ initialData });

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
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        })}
      >
        {Array(nbOfParticipants)
          .fill(null)
          .map((_, index) => {
            return (
              <div key={index} className={css({ p: '5', width: '50%' })}>
                <CameraPlaceholder cameraType="landscape" className={css({ width: 'full' })} />
              </div>
            );
          })}
      </section>
    </div>
  );
}

VideoGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default VideoGuests;
