import React from 'react';
import { Target } from 'react-feather';

import './Navbar.css';

const Navbar = () => {
  const title = 'El Baratón';

  return (
    <header className="navbar">
      <Target className="navbar-icon" size="2.8em" />
      <h1 className="navbar-title">
        {' '}
        {title}
        {' '}
      </h1>
    </header>
  );
};

export default Navbar;
