import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove email from local storage
    localStorage.removeItem('email');
    // Redirect to the login or signup page
    navigate('/signup');
    toast.success('Logged out successfully');
  }, []);

  return (
    <div>Logging out...</div>
  );
}

export default Logout;
