import React from 'react';
import PropTypes from 'prop-types';

import { ShoppingCart, List, Filter } from 'react-feather';

import './Navbar.css';

const Navbar = (props) => {
  const { view, onViewChange } = props;

  const title = 'El Baratón';

  return (
    <header className="navbar">
      <h1 className="navbar-title">
        {title}
      </h1>
      <nav className="link-buttons">
        {
        view !== 'store'
        && (
        <button type="button" title="Back to the store" className="view-button store-link" onClick={() => { onViewChange('store'); }}>
          <List size={20} />
        </button>
        )
      }
        {
        view !== 'cart'
        && (
        <button type="button" title="See your cart" className="view-button cart-link" onClick={() => { onViewChange('cart'); }}>
          <ShoppingCart cart={30} />
        </button>
        )
      }
        {
        view !== 'filters'
        && (
        <button type="button" title="See filters" className="view-button mobile-hide filters-link" onClick={() => { onViewChange('filters'); }}>
          <Filter cart={30} />
        </button>
        )
      }
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  view: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
};

export default Navbar;
