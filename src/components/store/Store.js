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
      selectedCategory: null,
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  // Fetch categories and products
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

  onCategoryChange(category) {
    this.setState({
      selectedCategory: category,
    });
  }

  render() {
    const { products, categories, selectedCategory } = this.state;

    return (
      <main className="store">
        <aside className="sidebar">
          <Sidebar categories={categories} onCategoryChange={this.onCategoryChange} selectedCategory={selectedCategory} />
        </aside>

        <section className="products" role="main">
          <Products products={products} selectedCategory={selectedCategory} />
        </section>
      </main>
    );
  }
}

export default Store;
