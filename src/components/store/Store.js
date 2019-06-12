import React from 'react';

import './Store.css';
import Sidebar from './sidebar/Sidebar';
import Products from './products/Products';

import { getProducts, getCategories } from '../../services/store-service';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      selectedCategory: null,
      currentProductPage: 0,
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
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
      currentProductPage: 0,
      selectedCategory: category,
    });
  }

  onPageChange(page) {
    this.setState({
      currentProductPage: page,
    });
  }

  render() {
    const {
      products, categories, selectedCategory, currentProductPage,
    } = this.state;

    return (
      <main className="store">
        <aside className="sidebar">
          <Sidebar
            categories={categories}
            onCategoryChange={this.onCategoryChange}
            selectedCategory={selectedCategory}
          />
        </aside>

        <section className="products" role="main">
          <Products
            products={products}
            selectedCategory={selectedCategory}
            currentPage={currentProductPage}
            onPageChange={this.onPageChange}
          />
        </section>
      </main>
    );
  }
}

export default Store;
