// firebase.js

// Initialize Firebase with configuration
const firebaseConfig = {
  apiKey: "AIzaSyC04b-XYc3zfYYZv4tpbeQzn98rVk7Uir8",
  authDomain: "evently-7faad.firebaseapp.com",
  projectId: "evently-7faad",
  storageBucket: "evently-7faad.appspot.com",
  messagingSenderId: "811762733485",
  appId: "1:811762733485:web:da2160fc400593b3fbd124",
  measurementId: "G-QB5KRRDPBC"
};

// Initialize Firebase app, auth, and Firestore using global `firebase` object
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Export Firebase services for use in other files
export { auth, db };
