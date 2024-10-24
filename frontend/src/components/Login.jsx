import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { doSignInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [isSigningIn, setIsSigningIn] = useState(false);

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if(!isSigningIn){
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div>
        {userLoggedIn && <Navigate to={'/home'} replace={true} />}
        <main>
            <div>
                <h1 className='login-title'>Evently</h1>
                <button
                    className='google-button'
                    disabled={isSigningIn}
                    onClick={(e) => { onGoogleSignIn(e) }}
                >
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </div>
        </main>
    </div>
);
};

export default Login;
