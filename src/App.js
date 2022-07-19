import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { AuthProvider } from './components/context/AuthContext';
import SignIn from './components/SignIn/SignIn';
import ChatRoom from './components/ChatRoom/ChatRoom';

function App() {
  const [id, setId] = useState();

  return (
    <div className="App">
      <>{id}</>
      <Router>
        <Switch>
          <Route path="/chatroom">
            <ChatRoom />
          </Route>
          <Route path="/">
            <SignIn onIdSubmit={setId} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
