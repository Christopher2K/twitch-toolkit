import React from 'react'
import { css } from '~/styled-system/css';

export function Separator() {
  return (
    <hr
      className={css({
        w: '1/5',
        mb: '10',
        borderWidth: '0.3rem',
        borderRadius: 'full',
        bg: 'white',
      })}
    />
  );
}
