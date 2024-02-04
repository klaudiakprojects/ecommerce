import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaShoppingBasket } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className='navbar'>
<ul className='nav-menu'>
    <li><Link to='/ground'>Ground</Link></li>
    <li><Link to='/beans'>Beans</Link></li>
    <li><Link to='/promotions'>Promotions</Link></li>
</ul>
    <div className="search-bar">
        <input type="search" placeholder="Search..."></input>
    </div>
<div className="nav-login">
    <button><Link to='/login'>Login</Link></button>
    <button><Link to='/register'>Register</Link></button>
    </div>
    <div className="cart-icon">
    <button><Link to='/cart'><FaShoppingBasket /></Link></button>
</div>
        </div>
    )
}

export default Navbar;