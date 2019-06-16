import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircle, CheckCircle, Edit } from 'react-feather';

import './Products.css';

const Products = (props) => {
  const {
    products, selectedProducts, currentPage, onAction, pageSize, actionIcon, noMatchMessage,
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
                className="cart-state action"
                title={actionIcon === 'add' ? 'Agregar al carrito' : 'Editar producto'}
                onClick={() => onAction(product)}
              >
                {
              actionIcon === 'add'
                ? <PlusCircle size={36} />
                : <Edit size={36} />
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
              <h2 className="product-list-item__name">{product.name}</h2>
              <h3 className="product-list-item__price">
                {product.price.toLocaleString('en', { style: 'currency', currency: 'USD' })}
              </h3>
              {product.amount && (
              <p className="product-list-item__amount">
                <b>{product.amount}</b>
                {' '}
                en el carrito
              </p>
              ) }
              <div className="product-list-item__details">
                <p className={`product-list_item__availability ${product.available ? '' : 'product-list_item__availability_not-available'}`}>
                  {product.available ? 'Disponible' : 'No disponible'}
                </p>
                <p className="product-list_item__quantity">{`${product.quantity} en stock`}</p>
              </div>
            </li>
          ))
        }
        {
          products.length === 0
          && (
          <h1 className="no-products">
            {noMatchMessage}
          </h1>
          )
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
  noMatchMessage: PropTypes.string,
};

Products.defaultProps = {
  selectedProducts: null,
  currentPage: 0,
  pageSize: Infinity,
  actionIcon: 'add',
  noMatchMessage: 'No se han encontrado productos',
};

export default Products;
