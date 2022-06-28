import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Auth() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}
