import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';

const Sidebar = (props) => {
  const { categories, onCategoryChange, selectedCategory } = props;

  const categoriesList = (levelCategories, isParent) => (
    <ul className={`category-list ${isParent ? 'first-level' : 'sublevel'}`}>
      {levelCategories.map(category => (
        <React.Fragment key={category.id}>
          <li
            role="button"
            className={selectedCategory && category.id === selectedCategory.id ? 'category-list-item selected' : 'category-list-item'}
            onClick={() => { onCategoryChange(category); }}
          >
            {category.name}
          </li>
          {
            category.sublevels && categoriesList(category.sublevels, false)
          }
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <div className="filters">
      <h3 className="filter-name"> Categorías </h3>
      <div className="filter-controls">
        {categoriesList(categories, true)}
      </div>
      <h3 className="filter-name"> Disponibilidad </h3>
      <div className="filter-controls">
        <div className="filter-checkbox">
          <input type="checkbox" name="available" id="checkbox-available" />
          <label htmlFor="checkbox-available">Disponible</label>
        </div>
        <div className="filter-checkbox">
          <input type="checkbox" name="no-available" id="checkbox-no-available" />
          <label htmlFor="checkbox-no-available">No disponible</label>
        </div>
      </div>
      <h3 className="filter-name"> Stock </h3>
      <div className="filter-controls">
        <label htmlFor="stock-min">Mínimo</label>
        <input type="number" name="stock-min" id="stock-min" />
        <label htmlFor="stock-max">Máximo</label>
        <input type="number" name="stock-max" id="stock-max" />
      </div>
      <h3 className="filter-name"> Precios </h3>
      <div className="filter-controls">
        <label htmlFor="price-min">Mínimo</label>
        <input type="number" name="price-min" id="price-min" />
        <label htmlFor="price-max">Máximo</label>
        <input type="number" name="price-max" id="price-max" />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.object,
};

Sidebar.defaultProps = {
  selectedCategory: null,
};

export default Sidebar;
