import React from 'react';
import 'firebase/app';
// import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

export default function SignIn() {
  return (
    <div>
      <div>
        <h2>Welcome to superchat</h2>
        <div className="login-button google">
          <button onClick={() => signInWithRedirect(new GoogleAuthProvider())}>
            Sign In with Google
          </button>
        </div>
      </div>
      <br /> <br />
      {/* <div className="login-button facebook">
        <button
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          Sign In with Facebook
        </button>
      </div> */}
    </div>
  );
}
