import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function ComputerScreen() {
  useEffect(() => {
    const socket = io('/');
    socket.on('meta', console.log);
    socket.on('computer', console.log);
  }, []);
  return <div>ComputerScreen</div>;
}
