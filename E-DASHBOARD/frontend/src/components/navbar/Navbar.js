import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully');
  }
  const auth = localStorage.getItem('user');

  return (
    <>
      <div style={{ height: '20px', fontSize: '10px', color: 'white', fontWeight: 'bold', background: 'green', alignItems: 'center', display: 'flex', zIndex: 999 }}>
        <marquee>hello new year offer 50% offf</marquee>
      </div>
      <div>
        <img alt='' className='navlogo'
          src='images/b.png' height={50} width={50} />
        {auth ? <ul className='nav-ul'>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/signup" onClick={() => logout()} >Logout( {JSON.parse(auth).name} )</Link></li>
        </ul> :
          <ul className='nav-ul nav-right'>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>

          </ul>}
      </div></>

  )
}

export default Navbar;