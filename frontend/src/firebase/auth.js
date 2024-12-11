import { auth, db } from "./firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        isAdmin: false,
      });
      console.log("User document created in Firestore.");
    } else {
      console.log("User document already exists in Firestore.");
    }

    return user;
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    // Sign in the user with email and password
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Check if the user document exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // If not, create a new user document
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous", // Default if no display name
        isAdmin: false,
      });
      console.log("User document created in Firestore.");
    } else {
      console.log("User document already exists in Firestore.");
    }

    return user;
  } catch (error) {
    console.error("Error during Email Sign-In:", error);
    throw error;
  }
};

export const doSignOut = () => {
  return auth.signOut();
};
