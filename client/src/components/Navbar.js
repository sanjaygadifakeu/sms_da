import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/students">Student Interface</Link></li>
      <li><Link to="/faculty">Faculty Page</Link></li>
      <li><Link to="/bulk-upload">Bulk Upload</Link></li>
    </ul>
  </nav>
);

export default Navbar;
