// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC04b-XYc3zfYYZv4tpbeQzn98rVk7Uir8",
  authDomain: "evently-7faad.firebaseapp.com",
  projectId: "evently-7faad",
  storageBucket: "evently-7faad.firebasestorage.app",
  messagingSenderId: "811762733485",
  appId: "1:811762733485:web:da2160fc400593b3fbd124",
  measurementId: "G-QB5KRRDPBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };