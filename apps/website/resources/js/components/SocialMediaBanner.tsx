import React from 'react'
import { hstack } from '~/styled-system/patterns';
import { css } from '~/styled-system/css';

export const ICON_SIZE = '50px';

type SocialMediaBannerProps = {
  icon: JSX.Element;
  label: string;
};

export function SocialMediaBanner({ icon, label }: SocialMediaBannerProps) {
  return (
    <div className={hstack({ gap: '2' })}>
      {icon}
      <p className={css({ fontSize: 'x-large' })}>{label}</p>
    </div>
  );
}

