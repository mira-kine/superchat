import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuth } from '../context/AuthContext';

export default function ChatRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // set messages as state
  // useEffect fetch call to database to receive messages in real time, set it to empty array in state

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
