import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import '../style.css';

import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <form  className="login-form" onSubmit={loginUser}>
                <input type='text' name='username' placeholder='Username' rules= {[{ required: true, message: 'Please input your username!' }]} />
                <input type='password' name='password' placeholder='Password' rules= {[{ required: true, message: 'Please input your Password!' }]} />
                <input type="submit"  />
            </form>
                Or  
                    <NavLink 
                        style={{marginRight: '10px'}} 
                        to='/register/'>  Register
                    </NavLink>
                
            
            
        </div>
    );
  }

  export default LoginPage