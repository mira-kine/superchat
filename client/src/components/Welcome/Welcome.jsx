import React from 'react';

export default function Welcome() {
  return (
    <div className="d-flex flex-column justify-content-center text-center vw-100">
      <h2>Not sure what to do?</h2>
      <h4>✨ Here are some starter steps ✨: </h4>
      <ul className="list-group">
        <li className="list-group-item">
          {' '}
          1. Go toContacts and add an ID + a name
        </li>
        <li className="list-group-item">
          {' '}
          2. Go to Conversations and select the friend you want to chat with
        </li>
        <li className="list-group-item"> 3. Happy chatting!</li>
      </ul>
    </div>
  );
}
