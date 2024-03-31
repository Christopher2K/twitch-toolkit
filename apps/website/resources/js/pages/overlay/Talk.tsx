import React from 'react';
import { GlobalScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { css } from '~/styled-system/css';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';

type TalkProps = {
  initialData: {
    global: GlobalScreenConfig;
  };
};

function Talk({ initialData }: TalkProps) {
  const { 'config:global': data } = useSocketDataEvents({
    events: ['config:global'],
    initialData: { 'config:global': initialData.global },
  });

  return (
    <div
      className={css({
        width: 'full',
        height: 'full',
      })}
    >
      <CameraPlaceholder cameraType="landscape" />

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
        <p className={css({ fontSize: 'six', color: 'accent' })}>{data.banner ?? ''}</p>
        <h1 className={css({ fontSize: 'four', color: 'desktop-light' })}>{data.title ?? ''}</h1>
      </section>
    </div>
  );
}

Talk.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Talk;
