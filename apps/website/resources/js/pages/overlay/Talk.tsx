import React from 'react';
import { TalkScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { css } from '~/styled-system/css';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';

type TalkProps = {
  initialData: TalkScreenConfig;
};

function Talk({ initialData }: TalkProps) {
  const { 'config:talk': data } = useSocketDataEvents({
    events: ['config:talk'],
    initialData: { 'config:talk': initialData },
  });

  return (
    <div
      className={css({
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
        <p className={css({ fontSize: 'six', color: 'accent' })}>{data.banner}</p>
        <h1 className={css({ fontSize: 'four', color: 'desktop-light' })}>{data.title}</h1>
      </header>
      <section className={css({ w: '80%' })}>
        <CameraPlaceholder cameraType="landscape" />
      </section>
    </div>
  );
}

Talk.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Talk;
