import React from 'react';
import PropTypes from 'prop-types';
import { XCircle } from 'react-feather';

import './Filters.css';

const Filters = (props) => {
  const {
    categories,
    onFilterValueChange,
    filters,
  } = props;

  const {
    category: selectedCategory,
    availability,
    minStock,
    maxStock,
    minPrice,
    maxPrice,
    name,
  } = filters;

  const isCategorySelected = categoryId => selectedCategory && categoryId === selectedCategory.id;
  const isSublevelSelected = category => (selectedCategory && category.id === selectedCategory.id)
    || (category.sublevels && category.sublevels.some(c => isSublevelSelected(c)));

  const categoriesList = (levelCategories, isParent) => (
    <ul className={`category-list ${isParent ? 'category-list_first-level' : 'category-list_sublevel'}`}>
      {levelCategories.map(category => (
        <React.Fragment key={category.id}>
          <li className="category-list__item">
            <button
              type="button"
              className={isCategorySelected(category.id) ? 'category-list__button_selected' : 'category-list__button'}
              onClick={() => { onFilterValueChange('category', category); }}
            >
              {category.name}
            </button>
          </li>
          {
            category.sublevels && isSublevelSelected(category)
            && <li className="category-list__item">{ categoriesList(category.sublevels, false) }</li>
          }
        </React.Fragment>
      ))}
    </ul>
  );

  const onNumberValueChange = (filterId, value) => {
    const newValue = Number.isNaN(value) ? undefined : value;
    onFilterValueChange(filterId, newValue);
  };

  return (
    <div className="filters">
      <h3 className="filters__filter-name">
        Categorías
        {
          selectedCategory
          && (
            <button
              type="button"
              className="filters__clear-category"
              onClick={() => { onFilterValueChange('category', null); }}
            >
              <XCircle size={14} />
            </button>
          )
        }
      </h3>
      <div className="filters__filter-controls">
        {categoriesList(categories, true)}
      </div>
      {
        selectedCategory && !selectedCategory.sublevels
        && (
        <React.Fragment>
          <h3 className="filters__filter-name"> Nombre </h3>
          <div className="filters__filter-controls">
            <label htmlFor="search-name">
          Búsqueda
            </label>
            <input
              type="text"
              name="search-name"
              id="search-name"
              value={name}
              onChange={(e) => { onFilterValueChange('name', e.target.value); }}
            />
          </div>
        </React.Fragment>
        )
      }
      <h3 className="filters__filter-name"> Disponibilidad </h3>
      <div className="filters__filter-controls">
        <div className="filters__filter-checkbox">
          <input
            type="checkbox"
            name="available"
            id="checkbox-available"
            onChange={(e) => { onFilterValueChange('availability', (e.target.checked ? true : undefined)); }}
            checked={availability === true}
          />
          <label htmlFor="checkbox-available">Disponible</label>
        </div>
        <div className="filters__filter-checkbox">
          <input
            type="checkbox"
            name="no-available"
            id="checkbox-no-available"
            checked={availability === false}
            onChange={(e) => { onFilterValueChange('availability', (e.target.checked ? false : undefined)); }}
          />
          <label htmlFor="checkbox-no-available">No disponible</label>
        </div>
      </div>
      <h3 className="filters__filter-name"> Stock </h3>
      <div className="filters__filter-controls">
        <label htmlFor="stock-min">Mínimo</label>
        <input
          type="number"
          name="stock-min"
          id="stock-min"
          min={0}
          step={1}
          value={minStock}
          onChange={(e) => { onNumberValueChange('minStock', parseInt(e.target.value, 10)); }}
        />
        <label htmlFor="stock-max">Máximo</label>
        <input
          type="number"
          name="stock-max"
          id="stock-max"
          min={0}
          step={1}
          value={maxStock}
          onChange={(e) => { onNumberValueChange('maxStock', parseInt(e.target.value, 10)); }}
        />
      </div>
      <h3 className="filters__filter-name"> Precios </h3>
      <div className="filters__filter-controls">
        <label htmlFor="price-min">Mínimo</label>
        <input
          type="number"
          name="price-min"
          id="price-min"
          min={0}
          step={1}
          value={minPrice}
          onChange={(e) => { onNumberValueChange('minPrice', parseInt(e.target.value, 10)); }}
        />
        <label htmlFor="price-max">Máximo</label>
        <input
          type="number"
          name="price-max"
          id="price-max"
          min={0}
          step={1}
          value={maxPrice}
          onChange={(e) => { onNumberValueChange('maxPrice', parseInt(e.target.value, 10)); }}
        />
      </div>
    </div>
  );
};

Filters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterValueChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.object,
  filters: PropTypes.object,
};

Filters.defaultProps = {
  filters: null,
  selectedCategory: null,
};

export default Filters;
