import React from 'react';
import '../../firebase';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  FacebookAuthProvider,
} from 'firebase/auth';

export default function SignIn() {
  const GProvider = new GoogleAuthProvider();
  const FbProvider = new FacebookAuthProvider();
  const auth = getAuth();

  return (
    <div>
      <div>
        <h2>Welcome to superchat</h2>
        <div className="login-button google">
          <button onClick={() => signInWithRedirect(auth, GProvider)}>
            Sign In with Google
          </button>
        </div>
      </div>
      <br /> <br />
      <div className="login-button facebook">
        <button onClick={() => signInWithRedirect(auth, FbProvider)}>
          Sign In with Facebook
        </button>
      </div>
    </div>
  );
}
