import * as PRODUCTS_DATA from './data/products.json';
import * as CATEGORIES_DATA from './data/categories.json';

const CART_SESSION_KEY = 'cart';

export const getProducts = async () => new Promise((resolve) => {
  resolve(PRODUCTS_DATA.products);
});

export const getCategories = async () => new Promise((resolve) => {
  resolve(CATEGORIES_DATA.categories);
});

export const addToCart = async product => new Promise((resolve) => {
  let cart = [];
  const cartData = localStorage.getItem(CART_SESSION_KEY);
  if (cartData) {
    cart = JSON.parse(cartData);
  }
  cart.push(product);
  localStorage.setItem(CART_SESSION_KEY, JSON.stringify(cart));
  resolve(product);
});

export const removeFromCart = async productId => new Promise((resolve, reject) => {
  let cart = [];
  const cartData = localStorage.getItem(CART_SESSION_KEY);
  if (!cartData) {
    reject('Product removal failed: there are no items in the cart.');
  } else {
    cart = JSON.parse(cartData);
  }
  const productIndex = cart.map(product => product.id).indexOf(productId);
  if (productIndex > -1) {
    cart.splice(productIndex, 1);
    localStorage.setItem(CART_SESSION_KEY, JSON.stringify(cart));
    resolve('Product removed successfully.');
  } else {
    reject('Product removal failed: Product is not in cart.');
  }
});
