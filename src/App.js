import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
