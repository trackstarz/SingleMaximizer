import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className="app-header">
        {user ? (
          <p onClick={logoutUser}>Logout</p>
        ): (
          <p>Login</p>
        )}
        <h1>Single Maximizer for {user && <span>{user.name}</span>}</h1>

    </div>
  )
}

export default Header


