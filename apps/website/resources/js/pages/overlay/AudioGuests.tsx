import React from 'react';

import { OverlaysLayout } from '~/components';

function AudioGuests() {
  return <div>Guest</div>;
}

AudioGuests.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default AudioGuests;
