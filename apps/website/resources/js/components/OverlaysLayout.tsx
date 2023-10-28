import React, { PropsWithChildren } from 'react';

import { css } from '~/styled-system/css';

import { Alerts } from './Alerts';

type OverlaysLayoutProps = PropsWithChildren<{
  hasVideoBackground?: boolean;
}>;

export function OverlaysLayout({ children, hasVideoBackground = false }: OverlaysLayoutProps) {
  return (
    <main
      className={css({
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundColor: hasVideoBackground ? 'rgba(0, 0, 0, 0.7)' : 'background',
      })}
    >
      <Alerts />
      {children}
    </main>
  );
}
