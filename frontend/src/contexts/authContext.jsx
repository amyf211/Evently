import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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

        // Fetch user data from Firestore if needed
        const userDocRef = doc(db, 'users', email);  // Assuming email is used as the identifier in Firestore
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

                const userDocRef = doc(db, 'users', user.uid);
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

