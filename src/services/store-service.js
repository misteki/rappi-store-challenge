import * as PRODUCTS_DATA from './data/products.json';
import * as CATEGORIES_DATA from './data/categories.json';

export const getProducts = async () => new Promise((resolve) => {
  resolve(PRODUCTS_DATA.products);
});

export const getCategories = async () => new Promise((resolve) => {
  resolve(CATEGORIES_DATA.categories);
});
