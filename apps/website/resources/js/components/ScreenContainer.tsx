import React, { PropsWithChildren } from 'react';
import { css, cx } from '~/styled-system/css';

export function ScreenContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cx(
        css({
          w: 'full',
          h: 'full',
          borderWidth: '0.6rem',
          borderColor: 'desktop-light',
        }),
        className,
      )}
    >
      {children}
    </div>
  );
}
