import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import { OverlaysLayout } from '~/components';

function Computer() {
  useEffect(() => {
    const socket = io('/');
    socket.on('meta', console.log);
    socket.on('computer', console.log);
  }, []);

  return <div>ComputerScreen</div>;
}

Computer.layout = (page: JSX.Element) => <OverlaysLayout children={page} />;

export default Computer;
