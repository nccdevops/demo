
// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

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
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">DesignPad</Link>
        <div className="space-x-4">
          <Link to="/about" className="hover:text-gray-300">About</Link>
          {isAuthenticated ? (
            <>
              <Link to="/design" className="hover:text-gray-300">Design</Link>
              <Link to="/feedback" className="hover:text-gray-300">Feedback</Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;