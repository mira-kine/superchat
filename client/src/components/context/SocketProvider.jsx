import React from 'react';
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const ENDPOINT = 'http://localhost:5001';

export function useSocket() {
  return useContext(SocketContext);
}

// server uses id
export function SocketProvider({ id, children }) {
  // const [socket, setSocket] = useState();
  const socket = io(ENDPOINT);
  console.log('socket', socket);

  useEffect(() => {
    const newSocket = io('http://localhost:5001', {
      query: {
        id,
      },
    });
    // setSocket(newSocket);
    //close sockets everytime you access
    return () => newSocket.close();
  }, [id]);

  useEffect(() => {
    socket.on();
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
