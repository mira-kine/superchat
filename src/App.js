import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { AuthProvider } from './components/context/AuthContext';
import SignIn from './components/SignIn/SignIn';
import ChatRoom from './components/ChatRoom/ChatRoom';
import useLocalStorage from './hooks/useLocalStorage';
import UserPage from './components/UserPage/UserPage';
import { ContactsProvider } from './components/context/ContactsProvider';
import { ConversationsProvider } from './components/context/ConversationsProvider';

function App() {
  // useLocalStorage hook to persist the user's id
  const [id, setId] = useLocalStorage('id');

  return (
    <div className="App">
      <Router>
        <Switch>
          <ContactsProvider>
            <ConversationsProvider>
              <Route path="/chatroom">
                <ChatRoom />
              </Route>
              <Route path="/">
                {id ? <UserPage id={id} /> : <SignIn onIdSubmit={setId} />}
              </Route>
            </ConversationsProvider>
          </ContactsProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
