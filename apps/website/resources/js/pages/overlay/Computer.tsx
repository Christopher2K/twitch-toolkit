import React from 'react';
import { ComputerScreenConfig, GlobalScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout, TitleBanner } from '~/components';
import { css } from '~/styled-system/css';
import { hstack, vstack } from '~/styled-system/patterns';
import { useSocketDataEvents } from '~/hooks/useSocketDataEvents';

type ComputerProps = {
  initialData: {
    computer: ComputerScreenConfig;
    global: GlobalScreenConfig;
  };
};

function Computer({ initialData }: ComputerProps) {
  const { 'config:global': data } = useSocketDataEvents({
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
          <TitleBanner position="right" title={data.title} banner={data.banner} />
        </div>
      </div>
      {/* CAMERAS */}
      <div
        className={vstack({
          width: '493px',
          height: 'full',
          gap: '0',
        })}
      >
        <div
          className={css({
            width: '100%',
            flex: '1',
            p: '4',
            pb: '2 !important',
            pl: '2 !important',
          })}
        >
          <div
            className={css({
              layerStyle: 'card',
              w: 'full',
              h: 'full',
              backgroundColor: 'placeholder',
            })}
          ></div>
        </div>

        <div
          className={css({
            width: '100%',
            aspectRatio: '16 / 9',
            p: '4',
            pt: '2 !important',
            pl: '2 !important',
          })}
        >
          <div
            className={css({
              layerStyle: 'card',
              w: 'full',
              h: 'full',
              backgroundColor: 'placeholder',
            })}
          ></div>
        </div>
      </div>
    </div>
  );
}

Computer.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Computer;
