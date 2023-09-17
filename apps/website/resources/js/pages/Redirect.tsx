import React from 'react';
import { css } from '~/styled-system/css';
import { flex } from '~/styled-system/patterns';

export type RedirectProps = {
  error?: string;
};

export default function Redirect({ error = undefined }: RedirectProps) {
  return (
    <div
      className={flex({
        direction: 'column',
        p: '4',
        gap: '4',
      })}
    >
      {error ? (
        <p className={css({ color: 'black' })}>Error, check the server logs {error}</p>
      ) : (
        <p className={css({ color: 'black' })}>Succesful login, you can close this window!</p>
      )}

      <p className={css({ color: 'black' })}>Please close this window</p>
    </div>
  );
}
