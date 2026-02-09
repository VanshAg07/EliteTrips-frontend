// firebase/setup.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhYJorQoBY13RC3J83Bx6tPUIuOlgaUVM",
  authDomain: "travelloten.firebaseapp.com",
  projectId: "travelloten",
  storageBucket: "travelloten.appspot.com",
  messagingSenderId: "669532007247",
  appId: "1:669532007247:web:3cc2edf5b7eda825a6f33a",
  measurementId: "G-N85XVX58P2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);