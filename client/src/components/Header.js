import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="app-header">
    <h1>Student Management System</h1>
    <p>Efficiently manage student records with our user-friendly interface.</p>
    <nav className="navbar">
      <Link to="/">Student</Link>
      <Link to="/faculty">Faculty</Link>
      <Link to="/bulk-upload">Bulk Upload</Link>
    </nav>
  </header>
);

export default Header;
