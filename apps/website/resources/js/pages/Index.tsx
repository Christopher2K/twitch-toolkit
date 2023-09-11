import React from 'react';
import { Link } from '@inertiajs/react';
import { css } from '~/styled-system/css';
import { styled } from '~/styled-system/jsx';

const Anchor = styled(Link, { base: { textDecoration: 'underline', color: 'black' } });

function Index() {
  return (
    <main className={css({ p: '4' })}>
      <h1
        className={css({
          fontSize: '3xl',
          fontWeight: 'bold',
          mb: '5',
          color: 'black',
        })}
      >
        Streaming overlays by (for ?) LLCoolChris
      </h1>
      <ul>
        <li>
          <Anchor href="/start-streaming">Start streaming</Anchor>
        </li>
        <li>
          <Anchor href="/brb">BRB</Anchor>
        </li>
        <li>
          <Anchor href="/end-streaming">End streaming</Anchor>
        </li>
        <li>
          <Anchor href="/talk">Talk overlay</Anchor>
        </li>
        <li>
          <Anchor href="/computer">Computer screen</Anchor>
        </li>
        <li>
          <Anchor href="/audio-guests">Audio guest screen</Anchor>
        </li>
      </ul>
    </main>
  );
}

export default Index;
