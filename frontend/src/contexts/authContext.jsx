import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    // Function to sign in with Google and get initial access token
    const doSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const token = await user.getIdToken(); // Get access token after sign-in

            setCurrentUser(user);
            setAccessToken(token);
            setUserLoggedIn(true);

            // Fetch user admin status from Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            setIsAdmin(userDoc.exists() ? userDoc.data().isAdmin : false);
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            if (user) {
                // Get a refreshed access token on auth state change
                const token = await user.getIdToken();
                setAccessToken(token);
                setCurrentUser(user);
                setUserLoggedIn(true);

                // Check if the user is an admin
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                setIsAdmin(userDoc.exists() ? userDoc.data().isAdmin : false);
            } else {
                // Reset state if user signs out
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
        doSignInWithGoogle, // Expose sign-in function for Login component
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
