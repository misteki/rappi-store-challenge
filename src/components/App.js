import React from 'react';

import './App.css';
import {Navbar} from './navbar/Navbar';

function App() {
  return (
    <div className="app">
      < Navbar />
      <section className="app-main" role="main">
        <ul className="product-list">
        </ul>
      </section>
    </div>
  );
}

export default App;
