import React from 'react';

import {
  type GlobalScreenConfig,
  type GuestsScreensConfig,
  defaultGuest,
} from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder, TitleBanner, VideoParticipant } from '~/components';
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
        gap: '0',
        background: 'desktop',
      })}
    >
      {/* MAIN SCREEN */}
      <div
        className={css({
          flex: 1,
          w: 'full',
          height: 'full',
          p: '4',
          pr: '2 !important',
        })}
      >
        <div
          className={css({
            layerStyle: 'card',
            position: 'relative',
            backgroundColor: 'placeholder',
            w: 'full',
            height: 'full',
          })}
        >
          <TitleBanner title={globalData.title} banner={globalData.banner} />
        </div>
      </div>
      {/* CAMERAS */}
      <div
        className={vstack({
          width: '493px',
          height: 'full',
          gap: '4',
          pl: '2',
          pr: '4',
          py: '4',
        })}
      >
        {participants.map((participant) => (
          <div
            className={css({
              position: 'relative',
              layerStyle: 'card',
              w: 'full',
              flexGrow: '1',
              flexShrink: '0',
              background: 'placeholder',
            })}
          >
            <div
              className={css({
                position: 'absolute',
                bottom: '4',
                left: '4',
              })}
            >
              <VideoParticipant name={participant.name} description={participant.description} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ComputerGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default ComputerGuests;
