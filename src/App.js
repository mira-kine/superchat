import './App.css';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './components/SignIn/SignIn';
import ChatRoom from './components/ChatRoom/ChatRoom';

const firebaseConfig = {
  apiKey: 'AIzaSyBw-s1xaCUYJvB7uX5pyxiRXOwiLRadY08',
  authDomain: 'superchat-mkine.firebaseapp.com',
  projectId: 'superchat-mkine',
  storageBucket: 'superchat-mkine.appspot.com',
  messagingSenderId: '761241189116',
  appId: '1:761241189116:web:b33035f18237017e777579',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? <SignIn auth={auth} /> : <ChatRoom />}
      </header>
    </div>
  );
}

export default App;
