import React from 'react';

import { css } from '~/styled-system/css';
import { TransitionScreenLayout, OverlaysLayout } from '~/components';

function EndStreaming() {
  return (
    <TransitionScreenLayout>
      <h1 className={css({ fontSize: 'one' })}>Fini!</h1>
      <hr
        className={css({
          w: '1/5',
          mb: '10',
          borderWidth: '0.3rem',
          borderRadius: 'full',
          bg: 'white',
        })}
      />
      <p className={css({ fontSize: 'five' })}>
        Rejoins le discord <span className={css({ color: 'accent' })}>[!discord]</span> follow moi
        sur les réseaux!
      </p>
    </TransitionScreenLayout>
  );
}

EndStreaming.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default EndStreaming;
