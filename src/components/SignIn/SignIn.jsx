import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function SignIn({ auth }) {
  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(provider);
  };

  return (
    <div>
      <button onClick={signinWithGoogle}>Sign In With Google</button>
    </div>
  );
}
