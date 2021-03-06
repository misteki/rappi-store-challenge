import * as PRODUCTS_DATA from './data/products.json';
import * as CATEGORIES_DATA from './data/categories.json';

const CART_SESSION_KEY = 'cart';

const getLocalStorageCartData = () => {
  const cartData = localStorage.getItem(CART_SESSION_KEY);
  if (cartData) {
    try {
      const cart = JSON.parse(cartData);
      return cart;
    } catch (e) {
      console.log('Parsing local storage cart data failed.');
      localStorage.clear();
      return [];
    }
  } else {
    console.log('No cart data in the local storage. ');
    return [];
  }
};

export const getProducts = async () => new Promise((resolve) => {
  const productsData = PRODUCTS_DATA.products;
  const parsePrice = priceString => Number(priceString.replace(/[^0-9\.]+/g, ''));

  // Parse propduct price as number
  const products = productsData.map(p => ({
    ...p,
    price: parsePrice(p.price),
  }));
  resolve(products);
});

export const getCategories = async () => new Promise((resolve) => {
  resolve(CATEGORIES_DATA.categories);
});

export const getCart = async () => new Promise((resolve) => {
  const cart = getLocalStorageCartData();
  resolve(cart);
});

export const addToCart = async (product, amount) => new Promise((resolve) => {
  const cart = getLocalStorageCartData();
  cart.push({ ...product, amount });
  localStorage.setItem(CART_SESSION_KEY, JSON.stringify(cart));
  resolve(product);
});

export const removeFromCart = async productId => new Promise((resolve, reject) => {
  const cart = getLocalStorageCartData();
  const productIndex = cart.map(product => product.id).indexOf(productId);
  if (productIndex > -1) {
    cart.splice(productIndex, 1);
    localStorage.setItem(CART_SESSION_KEY, JSON.stringify(cart));
    resolve('Product removed successfully.');
  } else {
    reject('Product removal failed: Product is not in cart.');
  }
});

export const editInCart = async (productId, amount) => new Promise((resolve, reject) => {
  const cart = getLocalStorageCartData();
  const productIndex = cart.map(product => product.id).indexOf(productId);
  if (productIndex > -1) {
    const product = cart[productIndex];
    cart.splice(productIndex, 1, { ...product, amount });
    localStorage.setItem(CART_SESSION_KEY, JSON.stringify(cart));
    resolve('Product edited successfully.');
  } else {
    reject('Product removal failed: Product is not in cart.');
  }
});

// Simulates purchase by clearing cart
export const buyCartProducts = async => new Promise((resolve) => {
  localStorage.clear();
  resolve('Success!');
});
