import React from 'react';

import { hstack } from '~/styled-system/patterns';
import { css } from '~/styled-system/css';

export type VideoParticipantProps = {
  name: string;
  description: string;
};

export function VideoParticipant({ name, description }: VideoParticipantProps) {
  return (
    <div
      className={hstack({
        layerStyle: 'card',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: 'white',
        w: 'full',
        backgroundColor: 'desktop',
        px: '4',
        py: '2',
        width: 'fit-content',
        gap: '4',
      })}
    >
      <div className={css({ flex: 1 })}>
        <p className={css({ textStyle: '2xl' })}>{name}</p>
        <p className={css({ textStyle: 'xl' })}>{description}</p>
      </div>
    </div>
  );
}
