import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { doSignOut } from '../firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        setLoading(true);
        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setIsAdmin(userData.isAdmin || false);
                } else {
                    console.warn("No Firestore document found for user:", user.uid);
                }

                setCurrentUser({ ...user });
                setUserLoggedIn(true);
            } catch (error) {
                console.error("Error fetching Firestore user document:", error);
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setIsAdmin(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        isAdmin,
        loading,
        doSignOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
