import React from 'react';
import { useAuth } from '../contexts/authContext';

const Home = () => {
    const { currentUser } = useAuth();

    const getUsername = (email) => {
        if (email) {
            const [username] = email.split('@');
            return username;
        }
        return '';
    };

    return (
        <div>
            <h1>Welcome to Evently, {currentUser && getUsername(currentUser.email)}!</h1>
            <h3>Featured Events:</h3>
        </div>
    );
};

export default Home;
