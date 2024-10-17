import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { db } from '../firebase/firebase'; // Import Firestore db
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                // Create the user with email and password
                const userCredential = await doCreateUserWithEmailAndPassword(email, password);
                const userId = userCredential.user.uid; // Get the user ID from the credential

                // Create a user document in Firestore with the admin property
                await setDoc(doc(db, 'users', userId), {
                    email: email,
                    admin: false, // Set admin property (change to true if needed)
                    createdAt: new Date(),
                });

                // Navigate to the home page upon successful registration
                navigate('/home');
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main>
                <div>
                    <h1>Evently</h1>
                    <h3>Create a New Account</h3>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>

                        <div>
                            <label>Confirm Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </div>

                        {errorMessage && (
                            <span>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div>
                            Already have an account? 
                            <Link to={'/login'}>Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Register;

