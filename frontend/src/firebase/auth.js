import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, 'users', user.uid);

        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                isAdmin: false
            });
        }

        return { user, isAdmin: userDoc.exists() ? userDoc.data().isAdmin : false };
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
        throw error;
    }
};

export const doSignOut = () => {
    return auth.signOut();
};
