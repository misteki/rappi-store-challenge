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
    <div className="list-container">
      <h3 className="categories-title"> Categorías </h3>
      {categoriesList(categories, true)}
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
