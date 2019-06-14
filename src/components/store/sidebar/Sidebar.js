import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';

const Sidebar = (props) => {
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
  } = filters;

  const isCategorySelected = categoryId => selectedCategory && categoryId === selectedCategory.id;
  const isSublevelSelected = category => (selectedCategory && category.id === selectedCategory.id)
    || (category.sublevels && category.sublevels.some(c => isSublevelSelected(c)));

  const categoriesList = (levelCategories, isParent) => (
    <ul className={`category-list ${isParent ? 'first-level' : 'sublevel'}`}>
      {levelCategories.map(category => (
        <React.Fragment key={category.id}>
          <li className="category-list-item">
            <button
              type="button"
              className={isCategorySelected(category.id) ? 'category-button selected' : 'ategory-button-item'}
              onClick={() => { onFilterValueChange('category', category); }}
            >
              {category.name}
            </button>
          </li>
          {
            category.sublevels && isSublevelSelected(category)
            && <li className="category-list-item">{ categoriesList(category.sublevels, false) }</li>
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
      <h3 className="filter-name"> Categorías </h3>
      <div className="filter-controls">
        {categoriesList(categories, true)}
      </div>
      <h3 className="filter-name"> Disponibilidad </h3>
      <div className="filter-controls">
        <div className="filter-checkbox">
          <input
            type="checkbox"
            name="available"
            id="checkbox-available"
            onChange={(e) => { onFilterValueChange('availability', (e.target.checked ? true : undefined)); }}
            checked={availability === true}
          />
          <label htmlFor="checkbox-available">Disponible</label>
        </div>
        <div className="filter-checkbox">
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
      <h3 className="filter-name"> Stock </h3>
      <div className="filter-controls">
        <label htmlFor="stock-min">Mínimo</label>
        <input
          type="number"
          name="stock-min"
          id="stock-min"
          value={minStock}
          onChange={(e) => { onNumberValueChange('minStock', parseInt(e.target.value, 10)); }}
        />
        <label htmlFor="stock-max">Máximo</label>
        <input
          type="number"
          name="stock-max"
          id="stock-max"
          value={maxStock}
          onChange={(e) => { onNumberValueChange('maxStock', parseInt(e.target.value, 10)); }}
        />
      </div>
      <h3 className="filter-name"> Precios </h3>
      <div className="filter-controls">
        <label htmlFor="price-min">Mínimo</label>
        <input
          type="number"
          name="price-min"
          id="price-min"
          value={minPrice}
          onChange={(e) => { onNumberValueChange('minPrice', parseInt(e.target.value, 10)); }}
        />
        <label htmlFor="price-max">Máximo</label>
        <input
          type="number"
          name="price-max"
          id="price-max"
          value={maxPrice}
          onChange={(e) => { onNumberValueChange('maxPrice', parseInt(e.target.value, 10)); }}
        />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterValueChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.object,
  filters: PropTypes.object,
};

Sidebar.defaultProps = {
  filters: null,
  selectedCategory: null,
};

export default Sidebar;
