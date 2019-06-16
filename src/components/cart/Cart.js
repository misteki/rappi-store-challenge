import React from 'react';
import PropTypes from 'prop-types';

import Products from '../shared/products/Products';

import './Cart.css';

const Cart = (props) => {
  const {
    cart,
    onProductEdit,
    onBuy,
  } = props;

  const totalPrice = cart.reduce((acc, product) => { console.log(product.price, product.amount); return acc + product.price * product.amount ;}, 0);

  return (
    <main className="cart">
      <header>
        <h2 className="total-price">
        Total general:
          {' '}
          {totalPrice.toLocaleString('en', { style: 'currency', currency: 'USD' })}
        </h2>
      </header>
      <section className="cart-products" role="main">
        <Products
          products={cart}
          onAction={onProductEdit}
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
  onProductEdit: PropTypes.func.isRequired,
  onBuy: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
};

export default Cart;
