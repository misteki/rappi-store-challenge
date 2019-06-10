import React from 'react';

import './Store.css';
import Sidebar from '../sidebar/Sidebar';
import Products from '../products/Products';

import { getProducts, getCategories } from '../../services/store-service';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
    };
  }

  componentDidMount() {
    getProducts().then((products) => {
      this.setState({
        products,
      });
    });

    getCategories().then((categories) => {
      this.setState({
        categories,
      });
    });
  }

  render() {
    const { products, categories } = this.state;

    return (
      <main className="app-main">
        <Sidebar categories={categories} />
        <Products />
      </main>
    );
  }
}

export default Store;
