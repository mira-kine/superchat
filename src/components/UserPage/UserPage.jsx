import React from 'react';
import { useConversations } from '../context/ConversationsProvider';
import Sidebar from '../Sidebar/Sidebar';
import Welcome from '../Welcome/Welcome';
import OpenConversations from './OpenConversations';

export default function UserPage({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversations />}
      {!selectedConversation && <Welcome />}
    </div>
  );
}
