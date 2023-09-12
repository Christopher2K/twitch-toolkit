import React from 'react';
import { TalkScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout } from '~/components';

type TalkProps = {
  initialData: TalkScreenConfig;
};

function Talk({ initialData }: TalkProps) {
  console.log(initialData);
  return <div>Talk</div>;
}

Talk.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Talk;
