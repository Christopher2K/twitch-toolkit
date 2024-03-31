import React from 'react';
import { ComputerScreenConfig, GlobalScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, CameraPlaceholder } from '~/components';
import { css } from '~/styled-system/css';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';
import { hstack, vstack } from '~/styled-system/patterns';

type ComputerProps = {
  initialData: {
    computer: ComputerScreenConfig;
    global: GlobalScreenConfig;
  };
};

function Computer({ initialData }: ComputerProps) {
  // const { 'config:computer': computerData } = useSocketDataEvents({
  //   events: ['config:computer'],
  //   initialData: { 'config:computer': initialData.computer },
  // });

  const { 'config:global': globalData } = useSocketDataEvents({
    events: ['config:global'],
    initialData: { 'config:global': initialData.global },
  });

  return (
    <div
      className={hstack({
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        w: 'full',
        h: 'full',
        gap: 0,
      })}
    >
      <div
        className={vstack({
          flex: 1,
          flexShrink: 1,
          gap: 0,
          height: 'full',
        })}
      >
        <CameraPlaceholder className={css({ flex: 1, w: 'full' })} />
        <section
          className={css({
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
      </div>

      <CameraPlaceholder
        className={css({
          width: '450px',
          height: 'full',
          flexShrink: 0,
        })}
      />
    </div>
  );
}

Computer.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Computer;
