import React from 'react';
import { css } from '~/styled-system/css';

export type TitleBannerProps = {
  title?: string;
  banner?: string;
};

export function TitleBanner({ title, banner }: TitleBannerProps) {
  return (
    <div
      className={css({
        position: 'absolute',
        bottom: '0',
        left: '0',
        w: 'full',
        p: '4',
      })}
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
