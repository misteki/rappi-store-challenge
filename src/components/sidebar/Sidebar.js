import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';

const Sidebar = (props) => {
  const { categories } = props;

  const categoriesList = levelCategories => (
    <ul className="category-list">
      {levelCategories.map(category => (
        <React.Fragment>
          <li className="category-list-item">
            {category.name}
          </li>
          {
            category.sublevels && categoriesList(category.sublevels)
          }
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <aside className="sidebar">
      {categoriesList(categories)}
    </aside>
  );
};

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};

Sidebar.defaultProps = {
  categories: [],
};

export default Sidebar;
