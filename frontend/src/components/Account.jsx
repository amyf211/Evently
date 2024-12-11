import React from "react";
import { useAuth } from '../contexts/authContext';
import { useNavigate } from "react-router-dom";

function Account() {
    const navigate = useNavigate();
    const { currentUser, doSignOut } = useAuth();

    const handleLogout = async () => {
        await doSignOut();
        navigate('/login');
    };

    return (
        <>
            <h2>Account</h2>
            <p>You are currently logged in as {currentUser.email}</p>
            <button className="login-button" onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Account;
