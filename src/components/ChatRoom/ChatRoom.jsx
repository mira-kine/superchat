import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function ChatRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log('user', user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    // blobs are any files in binary format aka contains our image
    const data = await response.blob();
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }
    // Axios is a JS library used to make HTTP requests
    // instead of using fetch, which is a two step process making an initial request
    // and then calling .json() to receive the actual object aka parsing
    // Axios removes the need to .json() your data, and catches errors using .catch()
    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'PROJECT-ID': '4908d6f2-3299-408b-8c7b-6895fe55bcf3',
          'user-name': user.email,
          'user-secret': user.uid,
          'PRIVATE-KEY': '050fdb53-168d-4861-8fa2-8dc7f3797b33',
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        // creating key/value pairs that will be used as my user object using FormData()
        // new data is added to user object using .append
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoUrl).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);
          // use POST HTTPS request method to create a user
          axios
            .post('https://api.chatengine.io/users', formdata, {
              headers: {
                'private-key': '050fdb53-168d-4861-8fa2-8dc7f3797b33',
              },
            })
            .then(() => setLoading(false))
            .then((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return 'loading...';

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
      <ChatEngine
        height="100vh"
        projectID="4908d6f2-3299-408b-8c7b-6895fe55bcf3"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
