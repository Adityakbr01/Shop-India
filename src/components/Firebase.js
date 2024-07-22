// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkk2G2P6ee8kINl6ziuh9p-aeiGQ-2Y-I",
  authDomain: "e-com-auth-3a7c4.firebaseapp.com",
  projectId: "e-com-auth-3a7c4",
  storageBucket: "e-com-auth-3a7c4.appspot.com",
  messagingSenderId: "387722157277",
  appId: "1:387722157277:web:2ebf3dedd8c55753820f34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { app, auth, db, provider, signInWithPopup, signOut };
export default app;
