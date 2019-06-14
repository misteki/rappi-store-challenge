import React from 'react';

import Products from '../shared/products/Products';
import { getCart, removeFromCart, buyCartProducts } from '../../services/store-service';

import './Cart.css';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
    this.removeProductToCart = this.removeProductToCart.bind(this);
  }

  componentDidMount() {
    getCart().then((cart) => {
      this.setState({
        cart,
      });
    });
  }

  removeProductToCart(product) {
    const productId = product.id;
    removeFromCart(product.id).then(() => {
      const { cart } = this.state;
      const cartWithoutProduct = cart.filter(p => p.id !== productId);
      this.setState({
        cart: cartWithoutProduct,
      });
    }, () => {
      console.log('Error: product could not be removed.');
    });
  }

  buyProductsInCart() {
    buyCartProducts().then(() => {
      this.setState({
        cart: [],
      });
      console.log('Compra exitosa!');
    });
  }

  render() {
    const {
      cart,
    } = this.state;

    return (
      <main className="cart">
        <section className="cart-products" role="main">
          <Products
            products={cart}
            onAction={this.removeProductToCart}
            noMatchMessage="No hay productos en el carrito"
            actionIcon="remove"
          />
        </section>
        <footer className="cart-footer">
          {
            cart.length > 0
            && <button type="button" title="Comprar!" className="buy-button" onClick={() => { this.buyProductsInCart(); }}>Comprar!</button>
          }
        </footer>
      </main>
    );
  }
}

export default Cart;
