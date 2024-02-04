import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='footer'>
        <ul className='footer-navbar'>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/faq'>FAQ</Link></li>
            <li><Link to='/contact'>Contact us</Link></li>
        </ul>
    </div>
  )
  
}

export default Footer;