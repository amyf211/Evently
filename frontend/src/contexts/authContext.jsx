// authContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export async function getGoogleAuthorisation() {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");

    const result = await signInWithPopup(auth, provider);
    const { email } = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      return { error: true };
    }

    const token = credential.accessToken;

    return {
      email,
      token,
      error: false,
    };
  } catch (err) {
    console.error("Error during Google authorisation:", err);
    return { error: true };
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const doSignInWithGoogle = async () => {
    const authResult = await getGoogleAuthorisation();

    if (authResult.error) {
      console.error("Google Sign-In failed.");
      return;
    }

    const { email, token } = authResult;

    setAccessToken(token);
    setUserLoggedIn(true);

    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);
    setIsAdmin(userDoc.exists() ? userDoc.data().isAdmin : false);

    setCurrentUser({ email });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const token = await user.getIdToken(true);
        setAccessToken(token);
        setCurrentUser(user);
        setUserLoggedIn(true);

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        setIsAdmin(userDoc.exists() ? userDoc.data().isAdmin : false);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIsAdmin(false);
        setAccessToken(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const doSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserLoggedIn(false);
      setIsAdmin(false);
      setAccessToken(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    isAdmin,
    accessToken,
    doSignInWithGoogle,
    doSignOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

