import React from 'react';
import { useContext, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

// server uses id
export function SocketProvider({ id, children }) {
  const socket = io(process.env.ENDPOINT_KEY);

  useEffect(() => {
    socket.on();
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
