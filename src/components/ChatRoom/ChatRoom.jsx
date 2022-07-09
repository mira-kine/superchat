import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { ChatEngine } from 'react-chat-engine';

export default function ChatRoom() {
  return (
    <div>
      <ChatEngine projectId="temp project ID" userName="." userSecret="." />
    </div>
  );
}
