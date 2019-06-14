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
      pageSize: 9,
      filters: {
        category: undefined,
        availability: undefined,
        name: undefined,
        minStock: undefined,
        maxStock: undefined,
        minPrice: undefined,
        maxPrice: undefined,
      },
      sort: {
        attribute: null,
        isAscending: true,
      },
    };
    this.updateFilterValue = this.updateFilterValue.bind(this);
    this.updateSortValue = this.updateSortValue.bind(this);
    this.updatePage = this.updatePage.bind(this);
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

  updateFilterValue(filterId, value) {
    const { filters } = this.state;
    this.setState({
      currentProductPage: 0,
      filters: {
        ...filters,
        [filterId]: value,
      },
    });
  }

  updateSortValue(sortOption, value) {
    const { sort } = this.state;
    this.setState({
      currentProductPage: 0,
      sort: {
        ...sort,
        [sortOption]: value,
      },
    });
  }

  updatePage(page) {
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
      products, categories, filters, currentProductPage, pageSize, cart, sort,
    } = this.state;
    const {
      category,
      availability,
      minStock,
      maxStock,
      minPrice,
      maxPrice,
      name,
    } = filters;

    // Get all the sub-categories for the selected category
    const getSubcategoriesIDs = (c) => {
      let ids = [];
      if (c.sublevels) {
        ids = c.sublevels.map(subcategory => getSubcategoriesIDs(subcategory));
      }
      return [c.id, ...ids.flat()];
    };
    const selectedCategoriesIDs = category ? getSubcategoriesIDs(category) : [];

    // Apply filters and sorting
    const {
      attribute,
      isAscending,
    } = sort;

    const filteredProducts = products
      .filter(product => (!category || selectedCategoriesIDs.includes(product.sublevel_id))
        && (availability === undefined || product.available === availability)
        && (name === undefined || product.name.includes(name))
        && (minStock === undefined || Number.isNaN(minStock) || product.quantity >= minStock)
        && (maxStock === undefined || Number.isNaN(maxStock) || product.quantity <= maxStock)
        && (minPrice === undefined || Number.isNaN(minPrice) || product.price >= minPrice)
        && (maxPrice === undefined || Number.isNaN(maxPrice) || product.price <= maxPrice))
      .sort((a, b) => {
        const aValue = a[attribute];
        const bValue = b[attribute];
        const isAFirst = isAscending ? aValue < bValue : bValue < aValue;
        return isAFirst ? -1 : 1;
      });

    return (
      <React.Fragment>
        <ControlsBar
          sortAttribute={attribute}
          ascendingOrder={isAscending}
          onSortChange={this.updateSortValue}
          nameFilter={name}
          onFilterUpdate={(filterId, value) => { this.updateFilterValue(filterId, value); }}
        />
        <main className="store">
          <aside className="sidebar">
            <Sidebar
              categories={categories}
              onFilterValueChange={(filterId, value) => { this.updateFilterValue(filterId, value); }}
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
              onPageChange={this.updatePage}
            />
            )}
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Store;
