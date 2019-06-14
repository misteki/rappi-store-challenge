import React from 'react';

import './Store.css';
import Sidebar from './sidebar/Sidebar';
import Products from '../shared/products/Products';
import Paginator from './paginator/Paginator';
import ControlsBar from './controls-bar/ControlsBar';

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
      currentProductPage: 0,
      filters: {
        category: undefined,
        availability: undefined,
        minStock: undefined,
        maxStock: undefined,
        minPrice: undefined,
        maxPrice: undefined,
      },
    };
    this.onFilterValueChange = this.onFilterValueChange.bind(this);
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

  onFilterValueChange(filterId, value) {
    const { filters } = this.state;
    this.setState({
      currentProductPage: 0,
      filters: {
        ...filters,
        [filterId]: value,
      },
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
      products, categories, filters, currentProductPage, cart,
    } = this.state;
    const {
      category,
      availability,
      minStock,
      maxStock,
      minPrice,
      maxPrice,
    } = filters;

    const pageSize = 9;

    const getSubcategoriesIDs = (category) => {
      let ids = [];
      if (category.sublevels) {
        ids = category.sublevels.map(subcategory => getSubcategoriesIDs(subcategory));
      }
      return [category.id, ...ids.flat()];
    };
    const selectedCategoriesIDs = category ? getSubcategoriesIDs(category) : [];

    // Apply filters
    const filteredProducts = products
      .filter(product => (!category || selectedCategoriesIDs.includes(product.sublevel_id))
        && (availability === undefined || product.available === availability)
        && (minStock === undefined || Number.isNaN(minStock) || product.quantity >= minStock)
        && (maxStock === undefined || Number.isNaN(maxStock) || product.quantity <= maxStock)
        && (minPrice === undefined || Number.isNaN(minPrice) || product.price >= minPrice)
        && (maxPrice === undefined || Number.isNaN(maxPrice) || product.price <= maxPrice));

    return (
      <React.Fragment>
        <ControlsBar />
        <main className="store">
          <aside className="sidebar">
            <Sidebar
              categories={categories}
              onFilterValueChange={(filterId, value) => { this.onFilterValueChange(filterId, value); }}
              filters={filters}
            />
          </aside>

          <section className="products" role="main">
            <Products
              products={filteredProducts}
              selectedProducts={cart.map(product => product.id)}
              currentPage={currentProductPage}
              onAction={this.addProductToCart}
              pageSize={pageSize}
              noMatchMessage="No se han encontrado productos que concidan con tus filtros"
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
      </React.Fragment>
    );
  }
}

export default Store;
