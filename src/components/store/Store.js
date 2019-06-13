import React from 'react';

import './Store.css';
import Sidebar from './sidebar/Sidebar';
import Products from '../shared/products/Products';
import Paginator from './paginator/Paginator';

import {
  getProducts, getCategories, addToCart, getCart,
} from '../../services/store-service';

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      cart: [],
      selectedCategory: null,
      currentProductPage: 0,
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
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

    getCart().then((cart) => {
      this.setState({
        cart,
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

  addProductToCart(product) {
    addToCart(product).then(() => {
      const { cart } = this.state;
      this.setState({
        cart: [...cart, product],
      });
    });
  }

  render() {
    const {
      products, categories, selectedCategory, currentProductPage, cart,
    } = this.state;

    const pageSize = 9;
    const getSubcategoriesIDs = (category) => {
      let ids = [];
      if (category.sublevels) {
        ids = category.sublevels.map(subcategory => getSubcategoriesIDs(subcategory));
      }
      return [category.id, ...ids.flat()];
    };
    const selectedCategoriesIDs = selectedCategory ? getSubcategoriesIDs(selectedCategory) : [];

    const filteredProducts = products
      .filter(product => !selectedCategory || selectedCategoriesIDs.includes(product.sublevel_id));

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
            products={filteredProducts}
            selectedCategory={selectedCategory}
            selectedProducts={cart.map(product => product.id)}
            currentPage={currentProductPage}
            onAction={this.addProductToCart}
            pageSize={pageSize}
            actionIcon="add"
          />
          {products.length > 0 && (
            <Paginator
              entries={filteredProducts.length}
              pageSize={pageSize}
              currentPage={currentProductPage}
              onPageChange={this.onPageChange}
            />
          )}
        </section>
      </main>
    );
  }
}

export default Store;
