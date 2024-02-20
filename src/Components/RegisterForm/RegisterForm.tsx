import { log } from 'console'
import React from 'react'
import './RegisterForm.css';

export const RegisterForm = () => {
  return (
    <div className="registerForm">
        <form>
<input type='text' placeholder='Name'></input>
<input type='text' placeholder='Username'></input>
<input type='email' placeholder='E-mail'></input>
<input type='password' placeholder='Password'></input>
<button>REGISTER</button>

</form>
    </div>
  )
}

export default RegisterForm;

