import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

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