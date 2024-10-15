import React from 'react';
import { Link } from "react-router-dom"

function Header() {

    return (
        <header className="header">
           {/* <h1>Evently</h1> */}
           <nav id="nav">
            <h1 id='header-title'>Evently</h1>
            <Link to='/' className="links">Home</Link>
            <Link to='/events' className="links">Events</Link>
            <Link to='/create-event' className="links">Create</Link>
           </nav>
        </header>
       )
}

export default Header