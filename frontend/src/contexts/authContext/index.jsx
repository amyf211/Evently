import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase/firebase';
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
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);

            const userDoc = await getDoc(doc(db, 'users', user.uid)); 
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setIsAdmin(userData.admin || false); 
            } else {
                setIsAdmin(false);
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
        loading,
        isAdmin, 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
