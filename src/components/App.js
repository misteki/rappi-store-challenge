import React from 'react';

import './App.css';
import Navbar from './navbar/Navbar';

const App = () => (
  <div className="app">
    <Navbar />
    <section className="app-main" role="main">
      <ul className="product-list" />
    </section>
  </div>
);

export default App;
