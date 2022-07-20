import React from 'react';
import { useContext, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const ENDPOINT = 'http://localhost:5001';

export function useSocket() {
  return useContext(SocketContext);
}

// server uses id
export function SocketProvider({ id, children }) {
  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.on();
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
