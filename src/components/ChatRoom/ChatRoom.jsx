import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuth } from '../context/AuthContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDoc } from 'firebase/firestore';

export default function ChatRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const { uid, displayName, photoURL } = user;
  // set messages as state
  const [messages, setMessages] = useState([]);
  // set new messages as state
  const [newMessage, setNewMessage] = useState([]);
  // useEffect fetch call to database to receive messages in real time, set it to empty array in state
  const docRef = firebase.firestore().doc();
  const db = getDoc(docRef);

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection('messages')
        .orderBy('createdAt')
        .limit(100)
        // use onSnapShot() to watch for any changes in database
        .onSnapshot((querySnapshot) => {
          // get all documents from the collection with ID
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log('data', data);
          console.log('unsubscribe', unsubscribe);
          // update state
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection('messages').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          placeholder="Type message here..."
        />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
