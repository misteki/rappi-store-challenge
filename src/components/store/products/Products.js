import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircle, CheckCircle } from 'react-feather';

import Paginator from './paginator/Paginator';

import './Products.css';

const Products = (props) => {
  const pageSize = 9;

  const {
    products, selectedProducts, selectedCategory, currentPage, onPageChange, onAddProduct,
  } = props;

  const getSubcategoriesIDs = (category) => {
    let ids = [];
    if (category.sublevels) {
      ids = category.sublevels.map(subcategory => getSubcategoriesIDs(subcategory));
    }
    return [category.id, ...ids.flat()];
  };
  const selectedCategoriesIDs = selectedCategory ? getSubcategoriesIDs(selectedCategory) : [];

  const filteredProducts = products
    .filter(product => !selectedCategory || selectedCategoriesIDs.includes(product.sublevel_id));

  const firstProductInPageIndex = pageSize * currentPage;
  const lastProductInPageIndex = firstProductInPageIndex + pageSize;
  const productsInPage = filteredProducts.slice(firstProductInPageIndex, lastProductInPageIndex);

  return (
    <React.Fragment>
      <ul className="product-list">
        {
          productsInPage.map(product => (
            <li className="product-list-item" key={product.id}>
              {selectedProducts.includes(product.id)
                ? <i className="cart-state added" title="Added to your cart"><CheckCircle size={36} /></i>
                : (
                  <button type="button" className="cart-state add-to-cart" title="Add to cart" onClick={() => onAddProduct(product)}>
                    <PlusCircle size={36} />
                  </button>
                )

                }
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
      {filteredProducts.length > 0
      && (
      <Paginator
        entries={filteredProducts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      )}
    </React.Fragment>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  selectedCategory: PropTypes.object,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

Products.defaultProps = {
  products: [],
  selectedCategory: null,
  currentPage: 0,
};

export default Products;
