import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
<ul className='nav-menu'>
    <li><Link to='/ground'>Ground</Link></li>
    <li><Link to='/beans'>Beans</Link></li>
    <li>Category 3</li>
    <li>Category 4</li>
</ul>
<div className="nav-login">
    <button><Link to='/login'>Login</Link></button>
    <button><Link to='/register'>Register</Link></button>
</div>
        </div>
    )
}

export default Navbar;