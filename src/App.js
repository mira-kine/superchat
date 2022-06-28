import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Auth from './components/Auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBw-s1xaCUYJvB7uX5pyxiRXOwiLRadY08',
  authDomain: 'superchat-mkine.firebaseapp.com',
  projectId: 'superchat-mkine',
  storageBucket: 'superchat-mkine.appspot.com',
  messagingSenderId: '761241189116',
  appId: '1:761241189116:web:b33035f18237017e777579',
};

firebase.initializeApp({ firebaseConfig });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth />
      </header>
    </div>
  );
}

export default App;
