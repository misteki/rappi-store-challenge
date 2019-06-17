import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';
import Store from './store/Store';
import Cart from './cart/Cart';
import Filters from './shared/filters/Filters';
import EditProductModal from './edit-product-modal/EditProductModal';

import {
  getProducts, getCategories, addToCart, getCart, removeFromCart, buyCartProducts, editInCart,
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
      addToCartModal: {
        show: false,
        product: null,
        mode: null,
      },
    };
    this.changeView = this.changeView.bind(this);
    this.updateFilterValue = this.updateFilterValue.bind(this);
    this.updateSortValue = this.updateSortValue.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.buyProductsInCart = this.buyProductsInCart.bind(this);
    this.openEditProductModal = this.openEditProductModal.bind(this);
    this.closeEditProductModal = this.closeEditProductModal.bind(this);
    this.editProductInCart = this.editProductInCart.bind(this);
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
    const searchedName = filterId === 'name' ? value : filters.name;
    this.setState({
      currentProductPage: 0,
      filters: {
        ...filters,
        [filterId]: value,
        name: filterId === 'category' ? undefined : searchedName,
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

  addProductToCart(product, amount) {
    addToCart(product, amount).then(() => {
      const { cart } = this.state;
      this.setState({
        cart: [...cart, {
          ...product,
          amount,
        },
        ],
        addToCartModal: {
          show: false,
        },
      });
    });
  }

  editProductInCart(product, amount) {
    editInCart(product.id, amount).then(() => {
      const { cart } = this.state;
      const modifiedCart = cart.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            amount,
          };
        }
        return p;
      });
      this.setState({
        cart: modifiedCart,
        addToCartModal: {
          show: false,
        },
      });
    });
  }

  removeProductFromCart(product) {
    const productId = product.id;
    removeFromCart(product.id).then(() => {
      const { cart } = this.state;
      const cartWithoutProduct = cart.filter(p => p.id !== productId);
      this.setState({
        cart: cartWithoutProduct,
        addToCartModal: {
          show: false,
        },
      });
    }, () => {
      console.log('Error: product could not be removed.');
    });
  }

  buyProductsInCart() {
    buyCartProducts().then(() => {
      this.setState({
        cart: [],
      });
      console.log('Compra exitosa!');
    });
  }

  openEditProductModal(mode) {
    return (product) => {
      this.setState({
        addToCartModal: {
          product,
          mode,
          show: true,
        },
      });
    };
  }

  closeEditProductModal() {
    this.setState({
      addToCartModal: {
        product: null,
        show: false,
        mode: null,
      },
    });
  }

  render() {
    const {
      products, categories, filters, currentProductPage, pageSize, cart, sort, addToCartModal,
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

    const { show: showEditProductModal, product: selectedProduct, mode } = addToCartModal;
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
            onAddToCart={this.openEditProductModal('add')}
            onPageUpdate={this.updatePage}
          />
          )
        }
        {
          currentView === CART_VIEW_ID
          && (
          <Cart
            cart={cart}
            onProductEdit={this.openEditProductModal('remove')}
            onBuy={this.buyProductsInCart}
          />
          )
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
        {
          showEditProductModal
          && selectedProduct
          && (
          <EditProductModal
            open={showEditProductModal}
            product={selectedProduct}
            onClose={this.closeEditProductModal}
            onAdd={this.addProductToCart}
            onEdit={this.editProductInCart}
            onRemove={this.removeProductFromCart}
            mode={mode}
          />
          )

        }
      </div>
    );
  }
}

export default App;
