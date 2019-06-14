import React from 'react';

import { ShoppingCart, ArrowLeft } from 'react-feather';
import './Navbar.css';

const Navbar = (props) => {
  const { view, onViewChange } = props;

  const title = 'El Baratón';

  return (
    <header className="navbar">
      <h1 className="navbar-title">
        {title}
      </h1>
      {
        view === 'cart'
        && (
        <button type="button" title="See your cart" className="view-button store-link" onClick={() => { onViewChange('store'); }}>
          <ArrowLeft size={20} />
        </button>
        )
      }
      {
        view === 'store'
        && (
        <button type="button" title="See your cart" className="view-button cart-link" onClick={() => { onViewChange('cart'); }}>
          <ShoppingCart cart={30} />
        </button>
        )
      }
    </header>
  );
};

export default Navbar;
