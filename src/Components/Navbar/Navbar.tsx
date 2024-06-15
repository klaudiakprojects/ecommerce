import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBasket } from "react-icons/fa";
import allProducts from '../Assets/data';


const Navbar = () => {
    return (
        <div className='navbar'>
            <ul className='nav-menu'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/ground'>Ground</Link></li>
                <li><Link to='/beans'>Beans</Link></li>
                <li><Link to='/promotions'>Promotions</Link></li>
            </ul>
            <Search />

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

const Search = () => {
    const [keyword, setKeyword] = useState('');
    

    const navigate = useNavigate();

    const searchHandler = (e: any) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }

        const filteredProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
        );

    }



    return <>
        <div className="search-bar">
            <form onSubmit={searchHandler}><input type="search" placeholder="Search..." onChange={(e) => setKeyword(e.target.value)}></input></form>
        </div>
    </>

}


export default Navbar;