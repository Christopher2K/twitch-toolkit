import React from 'react';

import { css } from '~/styled-system/css';
import { TransitionScreenLayout, Countdown, OverlaysLayout } from '~/components';

function StartStreaming() {
  return (
    <TransitionScreenLayout>
      <h1 className={css({ fontSize: 'one' })}>Starting soon</h1>
      <Countdown minutes={5}>
        <p className={css({ fontSize: 'five' })}>[Ok, peut-être en retard 😅]</p>
      </Countdown>
    </TransitionScreenLayout>
  );
}

StartStreaming.layout = (page: JSX.Element) => (
  <OverlaysLayout children={page} hasVideoBackground />
);

export default StartStreaming;
