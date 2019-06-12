import React from 'react';
import { ArrowRight, ArrowLeft } from 'react-feather';

import './Paginator.css';

const Paginator = props => (
  <nav className="paginator-container">
    <div className="paginator">
      <ArrowLeft size={16} />
      <button type="button" className="paginator-button selected"> 1 </button>
      <button type="button" className="paginator-button"> 2 </button>
      <button type="button" className="paginator-button"> 3 </button>
      <button type="button" className="paginator-button"> 4 </button>
      <button type="button" className="paginator-button"> 5 </button>
      <ArrowRight size={16} />

    </div>
  </nav>
);

export default Paginator;
