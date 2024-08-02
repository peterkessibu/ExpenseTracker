// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcxi1vhmp14b2xS2UYeEHdzS6A0ZnWIaE",
  authDomain: "expense-tracker-58744.firebaseapp.com",
  projectId: "expense-tracker-58744",
  storageBucket: "expense-tracker-58744.appspot.com",
  messagingSenderId: "438692649822",
  appId: "1:438692649822:web:48bb8817657f678c000dcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);