import React from 'react';
import {
  type GlobalScreenConfig,
  type GuestsScreensConfig,
  defaultGuest,
} from '@twitchtoolkit/types';

import { OverlaysLayout, VideoParticipant, TitleBanner } from '~/components';
import { css } from '~/styled-system/css';
import { hstack } from '~/styled-system/patterns';
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
        gap: '4',
        p: '4',
        background: 'desktop',
      })}
    >
      {participants.map((participant, index) => (
        <div
          key={participant.name}
          className={css({
            position: 'relative',
            layerStyle: 'card',
            backgroundColor: 'placeholder',
            flex: 1,
            flexShrink: 0,
            height: '100%',
          })}
        >
          {index === 0 && <TitleBanner title={globalData.title} banner={globalData.banner} />}
          {index > 0 && (
            <div className={css({ position: 'absolute', bottom: '4', left: '4' })}>
              <VideoParticipant name={participant.name} description={participant.description} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

VideoGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default VideoGuests;
