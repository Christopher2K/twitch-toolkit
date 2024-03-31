import React from 'react';

import { flex, hstack } from '~/styled-system/patterns';
import { css } from '~/styled-system/css';

export type AudioParticipantProps = {
  name: string;
  description: string;
};

export function AudioParticipant({ name, description }: AudioParticipantProps) {
  return (
    <div
      className={hstack({
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: 'white',
        w: 'full',
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
        <p className={css({ fontSize: 'seven' })}>{name}</p>
        <p className={css({ fontSize: 'seven' })}>{description}</p>
      </div>
    </div>
  );
}
