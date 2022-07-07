import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../../firebase';

export default function ChatRoom() {
  return (
    <div>
      <ChatEngine />
    </div>
  );
}
