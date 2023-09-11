import React from 'react';

import { OverlaysLayout } from '~/components';

function Talk() {
  return <div>Talk</div>;
}

Talk.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Talk;
