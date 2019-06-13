import React from 'react';

import Products from '../shared/products/Products';
import { getCart } from '../../services/store-service';

import './Cart.css';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    getCart().then((cart) => {
      this.setState(
        cart,
      );
    });
  }

  render() {
    const { cart } = this.state;

    return (
      <main className="cart">
        <section className="cart-products" role="main">
          <Products
            products={cart}
            actionIcon="remove"
          />
        </section>
      </main>
    );
  }
}

export default Cart;
