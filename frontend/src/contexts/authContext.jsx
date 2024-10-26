import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);
    
                // Fetch the user's Firestore document to get the 'admin' property
                const userDocRef = doc(db, 'users', user.uid);
                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const isAdminValue = userDoc.data().isAdmin || false;
                        console.log("isAdmin from Firestore:", isAdminValue); // Log for debugging
                        setIsAdmin(isAdminValue);
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setIsAdmin(false);
                }
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                setIsAdmin(false);
            }
            setLoading(false);
        });
    
        return unsubscribe; // Unsubscribe on cleanup
    }, []);
    

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        isAdmin,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

