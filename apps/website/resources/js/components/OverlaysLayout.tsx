import React, { PropsWithChildren } from 'react';
import { css } from '~/styled-system/css';

export function OverlaysLayout({ children }: PropsWithChildren<{}>) {
  return (
    <main
      className={css({
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundColor: 'background',
      })}
    >
      {children}
    </main>
  );
}
