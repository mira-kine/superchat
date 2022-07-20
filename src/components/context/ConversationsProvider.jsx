import React, { useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();
  console.log('socket', socket);

  // function to create conversation that takes recipient + message
  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  // takes messages from others and ourselves -> show recipient AND sender
  // Adding message to conversation
  const addMessage = useCallback(
    ({ recipients, text, sender }) => {
      // do i need a new conversation or add a new message to an existing conversation
      setConversations((prevConversations) => {
        // have I made any changes?
        let changeMade = false;
        const newMessage = { sender, text };
        // check if any new conversations match convos we already have
        const newConversations = prevConversations.map((conversation) => {
          // create function that will see if two arrays match
          if (arrayEquality(conversation.recipients, recipients)) {
            changeMade = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (changeMade) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  // useEffect so that it does not continue to make a reference every time a message is sent
  // to increase efficiency, wrapped addMessage in a useCallback function
  // that will only run when setConversations is changed
  // useCallback returns memoized functions, preventing addMessage from rerendering unless the props have changed
  useEffect(() => {
    if (socket === null) return;

    socket.on('receive-message', addMessage);
    // we don't want to keep it on after you receive message
    return () => socket.off('receive-message');
  }, [socket, addMessage]);

  // function to send message
  function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text });
    // ^ this will send the message to all our clients, not just us
    addMessage({ recipients, text, sender: id });
  }

  // unify formatting of conversations
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    // formatting each message that is sent
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      // flag when the message is from myself
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    // format when conversation is selected in the conversations array
    // return conversation, messages, recipients, and selected
    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
// creating function outside of component since it doesn't affect it
function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  // sort
  a.sort();
  b.sort();
  // loop through each array and see if each element in a matches b
  // .every() tests whether all elements pass the test implemented by provided function
  // ---> returns boolean
  return a.every((element, index) => {
    return element === b[index];
  });
}
