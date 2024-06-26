import React from 'react';

import { hstack } from '~/styled-system/patterns';
import { css } from '~/styled-system/css';

export type AudioParticipantProps = {
  name: string;
  description: string;
};

export function AudioParticipant({ name, description }: AudioParticipantProps) {
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
      <span
        className={css({
          fontSize: 'lg',
          fontWeight: 'bold',
          backgroundColor: 'red.500',
          px: '2',
          py: '1',
          rounded: 'xl',
          whiteSpace: 'nowrap',
        })}
      >
        ON AIR
      </span>

      <div className={css({ flex: 1 })}>
        <p className={css({ textStyle: '2xl' })}>{name}</p>
        <p className={css({ textStyle: 'xl' })}>{description}</p>
      </div>
    </div>
  );
}
