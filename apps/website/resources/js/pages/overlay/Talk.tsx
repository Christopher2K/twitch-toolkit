import React from 'react';
import { GlobalScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, TitleBanner } from '~/components';
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
        <TitleBanner title={data.title} banner={data.banner} />
      </div>
    </div>
  );
}

Talk.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Talk;
