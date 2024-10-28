// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-app-7d962.firebaseapp.com",
  projectId: "auth-app-7d962",
  storageBucket: "auth-app-7d962.appspot.com",
  messagingSenderId: "249706978640",
  appId: "1:249706978640:web:039cf41cafa1803fcba055"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);