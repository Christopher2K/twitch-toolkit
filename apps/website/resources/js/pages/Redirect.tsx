import React from 'react';
import { css } from '~/styled-system/css';

export type RedirectProps = {
  error?: string;
};

export default function Redirect({ error = undefined }: RedirectProps) {
  return (
    <div
      className={css({
        w: 'full',
        p: '4',
        color: 'black',
      })}
    >
      {error
        ? `Error, check the server logs... [${error}]`
        : 'Succesful login, go back to Twitch Toolkit App...'}
    </div>
  );
}
