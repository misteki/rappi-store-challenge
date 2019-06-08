import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Products from './products/Products';

const App = () => (
  <div className="app">
    <Navbar />
    <main className="app-main">
      <Sidebar />
      <Products />
    </main>
  </div>
);

export default App;
