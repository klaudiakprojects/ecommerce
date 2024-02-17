import React from 'react'
import './ContactUs.css';


export const ContactUs = () => {
  return (
    <div className="contact-grid"> 
    <h2>Contact us</h2>
        <form>
           <input type="text" placeholder="Your name...">
           </input>
           <input type="email" placeholder="Your e-mail...">
           </input>
           <textarea placeholder="Your message...">
           </textarea>
        </form>
        <button>SEND</button>
    </div>
  )
}

export default ContactUs;