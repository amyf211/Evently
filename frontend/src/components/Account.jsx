import React from "react";
import { useAuth } from '../contexts/authContext';
import { useNavigate } from "react-router-dom";
import { doSignOut } from '../firebase/auth';

function Account() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    return (
            <>
                <h2>Account</h2>
                <p>You are currently logged in as {currentUser.email}</p>
                <button onClick={() => { doSignOut().then(() => { navigate('/login')})}}>Logout</button>
            </>
       )
}

export default Account