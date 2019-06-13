import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';
import Store from './store/Store';
import Cart from './cart/Cart';

const STORE_VIEW_ID = 'store-view';
const CART_VIEW_ID = 'cart-view-id';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: STORE_VIEW_ID,
    };
  }

  render() {
    const { currentView } = this.state;

    return (
      <div className="app">
        <Navbar />
        {
          currentView === STORE_VIEW_ID
            ? <Store />
            : <Cart />
        }
      </div>
    );
  }
}

export default App;
