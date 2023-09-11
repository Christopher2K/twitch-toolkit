import React, { PropsWithChildren } from 'react';
import { Instagram, Twitter } from 'lucide-react';

import { hstack, vstack } from '~/styled-system/patterns';
import { css } from '~/styled-system/css';
import { SocialMediaBanner } from './SocialMediaBanner';
import LongLogo from '~/components/icons/long_logo.svg';

type TransitionScreenLayoutProps = PropsWithChildren<{}>;

export function TransitionScreenLayout({ children }: TransitionScreenLayoutProps) {
  return (
    <div
      className={vstack({
        width: 'full',
        height: 'full',
        borderColor: 'desktop-light',
        borderWidth: '0.6rem',
        p: '3',
        justifyContent: 'space-between',
      })}
    >
      <div
        className={vstack({
          width: 'full',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <div
          className={vstack({
            flex: 6,
            justifyContent: 'flex-end',
            alignItems: 'center',
            w: 'full',
          })}
        >
          <LongLogo className={css({ w: '3/5', h: 'auto' })} />
        </div>

        <div
          className={vstack({
            flex: 5,
            gap: '5',
            justifyContent: 'center',
            alignItems: 'center',
            w: 'full',
          })}
        >
          {children}
        </div>
      </div>

      <div
        className={hstack({
          width: 'full',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10',
          py: '3',
        })}
      >
        <SocialMediaBanner icon={<Twitter size={50} />} label="@LLCoolChris_" />
        <SocialMediaBanner icon={<Instagram size={50} />} label="@LLCoolChris_" />
      </div>
    </div>
  );
}
