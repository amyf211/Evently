import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Reference to this user's document in Firestore
        const userRef = doc(db, 'users', user.uid);

        // Check if user already exists in Firestore
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // Add user to Firestore with isAdmin: false if they are new
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                isAdmin: false // Default value; modify if needed
            });
        }

        // Return user info and isAdmin status
        return { user, isAdmin: userDoc.exists() ? userDoc.data().isAdmin : false };
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
        throw error; // Throw error to handle in calling component
    }
};

// Sign-out function
export const doSignOut = () => {
    return auth.signOut();
};
