import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown, Search } from 'react-feather';

import './ControlsBar.css';

const ControlsBar = (props) => {
  const {
    nameFilter, sortAttribute, ascendingOrder, onSortChange, onFilterUpdate,
  } = props;

  return (
    <section className="controls-bar">
      <div className="sort-control-group">
        <label className="sort-control-label" htmlFor="search-name">
          <Search />
        </label>
        <input
          type="text"
          name="search-name"
          id="search-name"
          className="sort-control-input"
          value={nameFilter}
          onChange={(e) => { onFilterUpdate('name', e.target.value); }}
        />
      </div>
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
  nameFilter: PropTypes.string,
  sortAttribute: PropTypes.string,
  ascendingOrder: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
  onFilterUpdate: PropTypes.func.isRequired,
};

ControlsBar.defaultProps = {
  nameFilter: undefined,
  sortAttribute: undefined,
  ascendingOrder: true,
};

export default ControlsBar;
