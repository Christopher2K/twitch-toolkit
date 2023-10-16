import React, { useRef, createContext, useEffect, PropsWithChildren, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext<null | ReturnType<typeof io>>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  const { current: socket } = useRef(
    io('/', {
      autoConnect: false,
    }),
  );

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const socket = useContext(SocketContext);
  if (socket == null)
    throw new Error("useSocket hook must be used inside a SocketProvider's children");
  return socket;
}
