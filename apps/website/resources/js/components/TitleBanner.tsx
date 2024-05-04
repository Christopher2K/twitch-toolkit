import React from 'react';
import { css, cva, cx } from '~/styled-system/css';

export type TitleBannerProps = {
  position?: 'left' | 'right';
  title?: string;
  banner?: string;
};

const positionStyle = cva({
  base: {
    position: 'absolute',
    bottom: '0',
  },
  variants: {
    position: {
      left: {
        left: '0',
      },
      right: {
        right: '0',
      },
    },
  },
  defaultVariants: {
    position: 'left',
  },
});

export function TitleBanner({ title, banner, position }: TitleBannerProps) {
  if (!title && !banner) return null;
  const positionStyleValue = positionStyle({ position });

  return (
    <div
      className={cx(
        css({
          position: 'absolute',
          bottom: '0',
          p: '4',
          w: 'fit-content',
        }),
        positionStyleValue,
      )}
    >
      <div
        className={css({
          layerStyle: 'card',
          backgroundColor: 'desktop',
          p: '4',
          textStyle: '3xl',
          w: 'fit-content',
          maxW: '100%',
        })}
      >
        {title && (
          <>
            <p
              className={css({
                textStyle: 'xl',
                mb: '1',
              })}
            >
              📹 Now streaming...
            </p>

            <p
              className={css({
                mb: '2',
              })}
            >
              {title}
            </p>
          </>
        )}
        {banner && (
          <p
            className={css({
              textStyle: 'lg',
            })}
          >
            {banner}
          </p>
        )}
      </div>
    </div>
  );
}
