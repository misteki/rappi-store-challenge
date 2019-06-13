import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';
import Store from './store/Store';

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
    return (
      <div className="app">
        <Navbar />
        <Store />
      </div>
    );
  }
}

export default App;
