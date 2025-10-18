import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Bharat Backpackers</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/about">About</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
