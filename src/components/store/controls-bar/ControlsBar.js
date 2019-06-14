import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown } from 'react-feather';

import './ControlsBar.css';

const ControlsBar = (props) => {
  const { sortAttribute, ascendingOrder, onSortChange } = props;

  return (
    <section className="controls-bar">
      <span>Breadcrumb placeholder</span>
      <div className="sort-control-group">
        <div className="sort-control">
          <label className="sort-control-label" htmlFor="sort-by"> Ordenar por </label>
          <select
            name="sort-by"
            id="sort-by"
            className="sort-control-input"
            onChange={(e) => { onSortChange('attribute', e.target.value); }}
            defaultValue=""
          >
            <option value=""> Sin ordenar </option>
            <option value="price"> Precio </option>
            <option value="available"> Disponibilidad </option>
            <option value="quantity"> Stock </option>
          </select>
        </div>
        <div className={`sort-control ${sortAttribute ? '' : 'hidden'}`}>
          <label
            className="sort-control-label"
            htmlFor="sort-by"
          >
          Orden
          </label>
          <button
            type="button"
            className="sort-control-button"
            onClick={() => { onSortChange('isAscending', !ascendingOrder); }}
            title={ascendingOrder ? 'Ordenar descendentemente' : 'Ordenar ascendentemente'}
          >
            {
              ascendingOrder
                ? <ArrowDown size={16} title="Ascendente" />
                : <ArrowUp size={16} title="Descendente" />
            }
          </button>
        </div>
      </div>
    </section>
  );
};

ControlsBar.propTypes = {
  sortAttribute: PropTypes.string,
  ascendingOrder: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
};

ControlsBar.defaultProps = {
  sortAttribute: null,
  ascendingOrder: true,
};

export default ControlsBar;
