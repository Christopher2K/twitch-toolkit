import React from 'react';
import { AudioGuestsScreenConfig } from '@twitchtoolkit/types';

import { OverlaysLayout } from '~/components';

type AudioGuestsProps = {
  initialData: AudioGuestsScreenConfig;
};

function AudioGuests({ initialData }: AudioGuestsProps) {
  console.log(initialData);
  return <div>Guest</div>;
}

AudioGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default AudioGuests;
