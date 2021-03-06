import React, { useCallback, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsProvider';

export default function OpenConversations() {
  const [text, setText] = useState('');
  const { sendMessage, selectedConversation } = useConversations();
  console.log('selectedConversation.messages', selectedConversation.messages);
  // use last message reference to keep current message displayed
  // useCallback avoids unnecessary renders from child, whereas useEffect creates side effects
  // when dependencies change.
  // I don't want to rerender every time, so for efficiency used useCallback
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.id),
      text
    );
    setText('');
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      {/* overflow-auto not working with bootsrap - fix for UI */}
      <div className="flex-grow-1 overflow-auto">
        <div className="h-100 d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? 'align-self-end' : ''
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? 'bg-primary text-white' : 'border'
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? 'text-right' : ''
                  }`}
                >
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            {/* set button to key down enter submit */}
            <Button variant="primary" type="submit">
              Send
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
