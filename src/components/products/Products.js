import React from 'react';
import PropTypes from 'prop-types';

import Paginator from './paginator/Paginator';

import './Products.css';

const Products = (props) => {
  const { products, selectedCategory } = props;

  const getSubcategoriesIDs = (category) => {
    let ids = [];
    if (category.sublevels) {
      ids = category.sublevels.map(subcategory => getSubcategoriesIDs(subcategory));
    }
    return [category.id, ...ids.flat()];
  };
  const selectedCategoriesIDs = selectedCategory ? getSubcategoriesIDs(selectedCategory) : [];

  const filteredProducts = products
    .filter(product => !selectedCategory || selectedCategoriesIDs.includes(product.sublevel_id))
    .slice(0, 9);

  return (
    <React.Fragment>
      <ul className="product-list">
        {
          filteredProducts.map(product => (
            <li className="product-list-item" key={product.id}>
              <h2 className="product-name">{product.name}</h2>
              <h3 className="product-price">{product.price}</h3>
              <div className="product-details">
                <p className={`product-availability ${product.available ? '' : 'not-available'}`}>
                  {product.available ? 'Available' : 'Not available'}
                </p>
                <p className="product-quantity">{`${product.quantity} in stock`}</p>
              </div>
            </li>
          ))
        }
        {
          filteredProducts.length === 0
          && (<h1 className="no-products"> No products found</h1>)
        }
      </ul>
      <Paginator />
    </React.Fragment>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  selectedCategory: PropTypes.object,
};

Products.defaultProps = {
  products: [],
  selectedCategory: null,
};

export default Products;
