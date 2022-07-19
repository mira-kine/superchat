// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';

// Add in Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBw-s1xaCUYJvB7uX5pyxiRXOwiLRadY08',
  authDomain: 'superchat-mkine.firebaseapp.com',
  projectId: 'superchat-mkine',
  storageBucket: 'superchat-mkine.appspot.com',
  messagingSenderId: '761241189116',
  appId: '1:761241189116:web:b33035f18237017e777579',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase quthentication
export const auth = getAuth(app);
