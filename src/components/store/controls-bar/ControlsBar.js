import React from 'react';
import { ArrowUp, ArrowDown } from 'react-feather';

import './ControlsBar.css';

const ControlsBar = () => (
  <section className="controls-bar">
    <span> ola </span>
    <div className="sort-control-group">
      <div className="sort-control">
        <label className="sort-control-label" htmlFor="sort-by"> Sort by </label>
        <select name="sort-by" id="sort-by" className="sort-control-input">
          <option>hello</option>
          <option>Goodbye</option>
        </select>
      </div>
      <div className="sort-control">
        <label className="sort-control-label" htmlFor="sort-by"> Order </label>
        <button type="button" className="sort-control-button">
          <ArrowUp size={14} />
        </button>
      </div>
    </div>
  </section>
);

export default ControlsBar;
