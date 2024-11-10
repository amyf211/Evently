import { useAuth } from '../contexts/authContext';

export const doSignInWithGoogle = async () => {
    const { setAuthData } = useAuth();

    try {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar');
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const accessToken = GoogleAuthProvider.credentialFromResult(result).accessToken;
        setAuthData(accessToken);

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
