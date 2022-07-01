import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyBw-s1xaCUYJvB7uX5pyxiRXOwiLRadY08',
    authDomain: 'superchat-mkine.firebaseapp.com',
    projectId: 'superchat-mkine',
    storageBucket: 'superchat-mkine.appspot.com',
    messagingSenderId: '761241189116',
    appId: '1:761241189116:web:b33035f18237017e777579',
  })
  .auth();
