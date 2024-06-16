import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';  


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firestore
const db = getFirestore(app);  

export { app, auth, storage, db }; 
