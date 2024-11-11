import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export async function getGoogleAuthorisation() {
  try {
    // Use Google OAuth directly from the global object provided by the CDN
    const provider = new window.firebaseAuth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");

    const result = await window.firebaseAuth().signInWithPopup(provider);
    const { email } = result.user;
    const credential = window.firebaseAuth.GoogleAuthProvider.credentialFromResult(result);

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

    // Access Firestore via the global firebaseDb object
    const userDocRef = window.firebaseDb.doc(`users/${email}`);
    const userDoc = await userDocRef.get();
    setIsAdmin(userDoc.exists ? userDoc.data().isAdmin : false);

    setCurrentUser({ email });
  };

  useEffect(() => {
    const unsubscribe = window.firebaseAuth().onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        const token = await user.getIdToken(true);
        setAccessToken(token);
        setCurrentUser(user);
        setUserLoggedIn(true);

        const userDocRef = window.firebaseDb.doc(`users/${user.uid}`);
        const userDoc = await userDocRef.get();
        setIsAdmin(userDoc.exists ? userDoc.data().isAdmin : false);
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

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    isAdmin,
    accessToken,
    doSignInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
