import React from 'react';
import type { ComputerGuestsScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { css } from '~/styled-system/css';
import { flex } from '~/styled-system/patterns';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';

type ComputerGuestsProps = {
  initialData: ComputerGuestsScreenConfig;
  nbOfParticipants: number;
};

function ComputerGuests({ initialData, nbOfParticipants }: ComputerGuestsProps) {
  const { 'config:computerGuests': data } = useSocketDataEvents({
    events: ['config:computerGuests'],
    initialData: { 'config:computerGuests': initialData },
  });

  return (
    <div
      className={flex({
        flexDir: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        background: 'desktop',
        w: 'full',
        height: 'full',
        px: '10',
        gap: '10',
      })}
    >
      <div
        className={flex({
          direction: 'column',
          justifyContent: 'center',
          gap: '10',
          py: '10',
          height: '100%',
        })}
      >
        <CameraPlaceholder cameraType="portrait" className={css({ height: '45%', w: 'auto' })} />
        {nbOfParticipants >= 3 && (
          <CameraPlaceholder cameraType="portrait" className={css({ height: '45%', w: 'auto' })} />
        )}
      </div>
      <div
        className={flex({
          flex: 1,
          flexShrink: 1,
          direction: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          py: '10',
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

        <main
          className={css({
            bg: 'placeholder',
            w: 'full',
            h: 'auto',
            aspectRatio: '16/9',
            flexShrink: 0,
          })}
        ></main>
      </div>
      <div
        className={flex({
          direction: 'column',
          justifyContent: 'center',
          gap: '10',
          py: '10',
          height: '100%',
        })}
      >
        <CameraPlaceholder cameraType="portrait" className={css({ height: '45%', w: 'auto' })} />
        {nbOfParticipants === 4 && (
          <CameraPlaceholder cameraType="portrait" className={css({ height: '45%', w: 'auto' })} />
        )}
      </div>
    </div>
  );
}

ComputerGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default ComputerGuests;
