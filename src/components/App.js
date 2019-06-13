import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';
import Store from './store/Store';
import Cart from './cart/Cart';

const STORE_VIEW_ID = 'store';
const CART_VIEW_ID = 'view';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: STORE_VIEW_ID,
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(viewId) {
    this.setState({
      currentView: viewId,
    });
  }

  render() {
    const { currentView } = this.state;

    return (
      <div className="app">
        <Navbar
          view={currentView}
          onViewChange={this.changeView}
        />
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
