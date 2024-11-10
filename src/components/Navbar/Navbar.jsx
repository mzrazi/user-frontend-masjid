import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { } from 'react-icons/fa'; // Import FaUserCircle from react-icons

// Navbar component
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear any stored authentication data (e.g., token, user ID)
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className='container'>
      <img src={logo} alt="Logo" className='logo' />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Events">Events</Link></li>
        <li><Link to="/prayer-time">Prayer Time</Link></li>
        <li><Link to="/Donate">Donate</Link></li>
        <li><Link to="/Gallery">Gallery</Link></li>

        {/* Profile icon as a list item */}
        <li className="profile" onClick={toggleDropdown}>
          Profile
          <span className="arrow">&#9662;</span>
          {isDropdownOpen && (
            <div className="dropdown">
              <ul>
                <li><Link to="/settings">Settings</Link></li> {/* Link to settings page */}
                <li onClick={handleLogout}>Logout</li> {/* Logout button */}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
