import React from 'react';

import { flex } from '~/styled-system/patterns';
import { css } from '~/styled-system/css';

export type AudioParticipantProps = {
  name: string;
};

export function AudioParticipant({ name }: AudioParticipantProps) {
  return (
    <div
      className={flex({
        flexDir: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        py: '3',
      })}
    >
      <p className={css({ fontSize: 'seven' })}>{name}</p>
      <span
        className={css({
          fontSize: 'six',
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
    </div>
  );
}
