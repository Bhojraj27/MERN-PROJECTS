import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const auth = localStorage.getItem('email');
  return (
    <div>
      <ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li></li>
        <li><Link to="/profile">Profile</Link></li>
        {auth ? <li><Link to="/logout">Logout</Link></li> :
          <>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>

          </>}
      </ul>
    </div>
  )
}

export default Navbar;