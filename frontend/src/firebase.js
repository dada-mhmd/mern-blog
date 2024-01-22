// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-148ba.firebaseapp.com',
  projectId: 'mern-blog-148ba',
  storageBucket: 'mern-blog-148ba.appspot.com',
  messagingSenderId: '457275100441',
  appId: '1:457275100441:web:e721328c6b9a841edac988',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
