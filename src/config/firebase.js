// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeRhNVJ-mkMx__ZgfDZqTOSZ2oxddjCRQ",
  authDomain: "devpad-2cb77.firebaseapp.com",
  projectId: "devpad-2cb77",
  storageBucket: "devpad-2cb77.firebasestorage.app",
  messagingSenderId: "49017156107",
  appId: "1:49017156107:web:17eaf990f45f12dc0a8d0e",
  measurementId: "G-N1R2CXPW0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
