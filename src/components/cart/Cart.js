import React from 'react';
import PropTypes from 'prop-types';

import Products from '../shared/products/Products';

import './Cart.css';

const Cart = (props) => {
  const {
    cart,
    onProductRemove,
    onBuy,
  } = props;

  return (
    <main className="cart">
      <section className="cart-products" role="main">
        <Products
          products={cart}
          onAction={onProductRemove}
          noMatchMessage="No hay productos en el carrito"
          actionIcon="remove"
        />
      </section>
      <footer className="cart-footer">
        {
            cart.length > 0
            && <button type="button" title="Comprar!" className="buy-button" onClick={() => { onBuy(); }}>Comprar!</button>
          }
      </footer>
    </main>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
  onProductRemove: PropTypes.func.isRequired,
  onBuy: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
};

export default Cart;
