import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircle, CheckCircle } from 'react-feather';

import './Products.css';

const Products = (props) => {
  const {
    products, selectedProducts, currentPage, onAddProduct, pageSize,
  } = props;

  const firstProductInPageIndex = pageSize * currentPage;
  const lastProductInPageIndex = firstProductInPageIndex + pageSize;
  const productsInPage = products.slice(firstProductInPageIndex, lastProductInPageIndex);

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
          products.length === 0
          && (<h1 className="no-products"> No products found</h1>)
        }
      </ul>
    </React.Fragment>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  selectedProducts: PropTypes.array,
  onAddProduct: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
};

Products.defaultProps = {
  selectedProducts: [],
  currentPage: 0,
  pageSize: 10,
};

export default Products;
