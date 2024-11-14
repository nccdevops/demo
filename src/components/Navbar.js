import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import './Navbar.css';  // Import the external CSS file

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">DesignPad</Link>
        <div className="links">
          <Link to="/about" className="link">About</Link>
          {isAuthenticated ? (
            <>
              <Link to="/design" className="link">Design</Link>
              <Link to="/feedback" className="link">Feedback</Link>
              <button
                onClick={handleLogout}
                className="link logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
