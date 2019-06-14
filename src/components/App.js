import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';
import Store from './store/Store';
import Cart from './cart/Cart';
import Filters from './shared/filters/Filters';

import {
  getProducts, getCategories, addToCart, getCart,
} from '../services/store-service';

const STORE_VIEW_ID = 'store';
const CART_VIEW_ID = 'cart';
const FILTERS_VIEW_ID = 'filters';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: STORE_VIEW_ID,
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
    this.changeView = this.changeView.bind(this);
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

  changeView(viewId) {
    this.setState({
      currentView: viewId,
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

    const { currentView } = this.state;

    return (
      <div className="app">
        <Navbar
          view={currentView}
          onViewChange={this.changeView}
        />
        {
          currentView === STORE_VIEW_ID
          && (
          <Store
            products={filteredProducts}
            categories={categories}
            cart={cart}
            currentProductPage={currentProductPage}
            pageSize={pageSize}
            filters={filters}
            sort={sort}
            onFilterValueChange={this.updateFilterValue}
            onSortValueUpdate={this.updateSortValue}
            onAddToCart={this.addProductToCart}
            onPageUpdate={this.updatePage}
          />
          )
        }
        {
          currentView === CART_VIEW_ID
          && <Cart />
        }
        {
          currentView === FILTERS_VIEW_ID
          && (
          <Filters
            categories={categories}
            onFilterValueChange={(filterId, value) => { this.updateFilterValue(filterId, value); }}
            filters={filters}
          />
          )
        }
      </div>
    );
  }
}

export default App;
