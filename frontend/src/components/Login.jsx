import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Login = () => {
    const { userLoggedIn, doSignInWithGoogle } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const onGoogleSignIn = async () => {
        setIsSigningIn(true);
        try {
            await doSignInWithGoogle();
            console.log("Signed in successfully");
        } catch (error) {
            console.error("Google Sign-In failed:", error);
        } finally {
            setIsSigningIn(false);
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <div>
            <main>
                <div>
                    <h1 className="login-title">Evently</h1>
                    <button
                        className="google-button"
                        disabled={isSigningIn}
                        onClick={onGoogleSignIn}
                    >
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
