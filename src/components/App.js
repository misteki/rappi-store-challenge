import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Products from './products/Products';

import { getProducts, getCategories } from '../services/store-service';

const App = () => {
  let products = [];
  let categories = [];

  getProducts().then((data) => {
    products = data;
  });

  getCategories().then((data) => {
    categories = data;
  });

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Sidebar />
        <Products />
      </main>
    </div>
  );
};

export default App;
