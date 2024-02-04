import { log } from 'console'
import React from 'react'
import './LoginForm.css';

export const LoginForm = () => {
  return (
    <div className="loginForm">
        <form>
<input type='text' placeholder='Login'></input>
<input type='password' placeholder='Password'></input>
<button>LOGIN</button>

</form>
    </div>
  )
}

export default LoginForm;

