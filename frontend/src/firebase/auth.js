import { useAuth } from '../contexts/authContext';

export const doSignInWithGoogle = async () => {
  const { setAuthData } = useAuth();

  try {
    // Access the GoogleAuthProvider and other Firebase functions globally
    const provider = new window.firebaseAuth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar');

    const result = await window.firebaseAuth().signInWithPopup(provider);
    const user = result.user;

    const accessToken = window.firebaseAuth.GoogleAuthProvider.credentialFromResult(result).accessToken;
    setAuthData(accessToken);

    const userRef = window.firebaseDb.doc(`users/${user.uid}`);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      await userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        isAdmin: false,
      });
    }

    return { user, isAdmin: userDoc.exists ? userDoc.data().isAdmin : false };
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    throw error;
  }
};



export const doSignOut = () => {
    return auth.signOut();
};
