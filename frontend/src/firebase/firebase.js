import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC04b-XYc3zfYYZv4tpbeQzn98rVk7Uir8",
  authDomain: "evently-7faad.firebaseapp.com",
  projectId: "evently-7faad",
  storageBucket: "evently-7faad.appspot.com",
  messagingSenderId: "811762733485",
  appId: "1:811762733485:web:da2160fc400593b3fbd124",
  measurementId: "G-QB5KRRDPBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };