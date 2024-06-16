// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';  // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw4yxIYX9gUd5EXqDmjD9wIkz76NE6f1g",
  authDomain: "aech-ca277.firebaseapp.com",
  projectId: "aech-ca277",
  storageBucket: "aech-ca277.appspot.com",
  messagingSenderId: "453863387858",
  appId: "1:453863387858:web:32748ab8ac896d8fa4330b",
  measurementId: "G-6SHG8HDE2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firestore
const db = getFirestore(app);  // Initialize Firestore

export { app, auth, storage, db };  // Export Firestore
