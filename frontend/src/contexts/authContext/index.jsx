import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase/firebase'; // Import your Firestore db
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // New state to track admin status

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid)); // Replace 'users' with your collection name
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setIsAdmin(userData.admin || false); // Set admin status (defaults to false if not found)
            } else {
                setIsAdmin(false); // If user document doesn't exist, set isAdmin to false
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setIsAdmin(false); // Reset admin status when user is logged out
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        isAdmin, // Add isAdmin to the value provided to the context
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
