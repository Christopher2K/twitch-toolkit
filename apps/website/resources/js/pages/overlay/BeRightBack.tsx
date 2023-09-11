import React from 'react';

import { css } from '~/styled-system/css';
import { TransitionScreenLayout, Separator, OverlaysLayout } from '~/components';

function BeRightBack() {
  return (
    <TransitionScreenLayout>
      <h1 className={css({ fontSize: 'one' })}>Petite pause!</h1>
      <Separator />
      <p className={css({ fontSize: 'five' })}>
        Rejoins le discord <span className={css({ color: 'accent' })}>[!discord]</span> follow moi
        sur les réseaux!
      </p>
    </TransitionScreenLayout>
  );
}

BeRightBack.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default BeRightBack;
