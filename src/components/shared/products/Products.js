import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircle, CheckCircle, XCircle } from 'react-feather';

import './Products.css';

const Products = (props) => {
  const {
    products, selectedProducts, currentPage, onAction, pageSize, actionIcon,
  } = props;

  const firstProductInPageIndex = pageSize === Infinity ? 0 : pageSize * currentPage;
  const lastProductInPageIndex = firstProductInPageIndex + pageSize;
  const productsInPage = products.slice(firstProductInPageIndex, lastProductInPageIndex);

  const actionButton = (product) => {
    const isSelected = selectedProducts && selectedProducts.includes(product.id);
    return (
      <React.Fragment>
        {
          !selectedProducts || !isSelected
            ? (
              <button
                type="button"
                className={`cart-state ${actionIcon}`}
                title="Add to cart"
                onClick={() => onAction(product)}
              >
                {
              actionIcon === 'add'
                ? <PlusCircle size={36} />
                : <XCircle size={36} />
            }
              </button>
            )
            : (
              <i className="cart-state confirmed" title="Added to your cart">
                <CheckCircle size={36} />
              </i>
            )
        }
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ul className="product-list">
        {
          productsInPage.map(product => (
            <li className="product-list-item" key={product.id}>
              {
                actionButton(product)
              }
              <h2 className="product-name">{product.name}</h2>
              <h3 className="product-price">{product.price}</h3>
              <div className="product-details">
                <p className={`product-availability ${product.available ? '' : 'not-available'}`}>
                  {product.available ? 'Disponible' : 'No disponible'}
                </p>
                <p className="product-quantity">{`${product.quantity} en stock`}</p>
              </div>
            </li>
          ))
        }
        {
          products.length === 0
          && (<h1 className="no-products"> No se han encontrado productos. </h1>)
        }
      </ul>
    </React.Fragment>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  selectedProducts: PropTypes.array,
  onAction: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  actionIcon: PropTypes.oneOf(['add', 'remove']),
};

Products.defaultProps = {
  selectedProducts: null,
  currentPage: 0,
  pageSize: Infinity,
  actionIcon: 'add',
};

export default Products;
