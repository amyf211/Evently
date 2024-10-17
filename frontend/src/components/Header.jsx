import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/authContext';

function Header() {
    const { userLoggedIn, isAdmin } = useAuth(); // Destructure isAdmin from the context

    return (
        <header className="header">
           <nav id="nav">
            {
                userLoggedIn ? (
                    <>
                        <Link to='/home' id='header-title'>Evently</Link>
                        <Link to='/account' className="links">Account</Link>
                        <Link to='/events' className="links">Events</Link>
                        {isAdmin && <Link to='/create-event' className="links">Create</Link>}
                    </>
                ) : (
                    <></>
                )
            }
           </nav>
        </header>
    );
}

export default Header;
