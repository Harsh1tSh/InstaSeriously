import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Post from './components/Post';
import ImageUpload from './components/ImageUpload';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user is logged in
        setUser(authUser);
      } else {
        // user is logged out
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // Fetch posts from Firestore
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  // Handle Sign Up
  const signUp = event => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(authUser => {
        // Update profile after successful sign up
        return updateProfile(authUser.user, {
          displayName: email.split('@')[0] // Assuming username is the part of the email before the '@'
        });
      })
      .catch(error => alert(error.message));
  };

  // Handle Sign In
  const signIn = event => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => alert(error.message));
  };

  // Handle Sign Out
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="App">
      <Navbar />
      {user ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <ImageUpload username={user.displayName || user.email} />
        </div>
      ) : (
        <form>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" onClick={signIn}>Sign In</button>
          <button type="submit" onClick={signUp}>Sign Up</button>
        </form>
      )}
      <div className="post-list">
        {posts.map(({ id, post }) => (
          <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
        ))}
      </div>
    </div>
  );
}

export default App;
