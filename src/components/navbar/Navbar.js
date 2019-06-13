import React from 'react';

import { ShoppingCart } from 'react-feather';
import './Navbar.css';

const Navbar = () => {
  const title = 'El Baratón';

  return (
    <header className="navbar">
      <h1 className="navbar-title">
        {' '}
        {title}
        {' '}
      </h1>
      <button type="button" title="See your cart" className="cart-button">
        <ShoppingCart cart={40} />
      </button>
    </header>
  );
};

export default Navbar;
