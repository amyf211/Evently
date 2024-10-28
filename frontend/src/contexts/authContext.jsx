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

    const doSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const token = await user.getIdToken();

            setCurrentUser(user);
            setAccessToken(token);
            setUserLoggedIn(true);

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

                const token = await user.getIdToken();
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
