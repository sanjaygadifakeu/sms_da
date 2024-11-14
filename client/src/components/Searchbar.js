import React from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchQuery }) => (
  <input
    type="text"
    className="search-bar"
    placeholder="Search by name..."
    onChange={(e) => setSearchQuery(e.target.value)}
  />
);
export default SearchBar;