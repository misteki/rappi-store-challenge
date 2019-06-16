import React from 'react';
import PropTypes from 'prop-types';

import { ShoppingCart, List, Filter } from 'react-feather';

import './Navbar.css';

const Navbar = (props) => {
  const { view, onViewChange } = props;

  const title = 'El Baratón';

  return (
    <header className="navbar">
      <h1 className="navbar__title">
        {title}
      </h1>
      <nav className="navbar__nav">
        {
        view !== 'store'
        && (
        <button
          type="button"
          title="Back to the store"
          className="navbar__link-button navbar__link-button_store"
          onClick={() => { onViewChange('store'); }}
        >
          <List size={20} />
        </button>
        )
      }
        {
        view !== 'cart'
        && (
        <button
          type="button"
          title="See your cart"
          className="navbar__link-button navbar__link-button_cart"
          onClick={() => { onViewChange('cart'); }}
        >
          <ShoppingCart cart={30} />
        </button>
        )
      }
        {
        view !== 'filters'
        && (
        <button
          type="button"
          title="See filters"
          className="navbar__link-button navbar__link-button_filters"
          onClick={() => { onViewChange('filters'); }}
        >
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
