import React from 'react';
import SignIn from './components/SignIn/SignIn';
import useLocalStorage from './hooks/useLocalStorage';
import UserPage from './components/UserPage/UserPage';
import { ContactsProvider } from './components/context/ContactsProvider';
import { ConversationsProvider } from './components/context/ConversationsProvider';

function App() {
  // useLocalStorage hook to persist the user's id
  const [id, setId] = useLocalStorage('id');

  const userPage = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <UserPage id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return id ? userPage : <SignIn onIdSubmit={setId} />;
}

export default App;
