import React from 'react';

import './Products.css';

const Products = (props) => {
  const { products } = props;
  const listedProducts = products.slice(0, 9);

  return (
    <React.Fragment>
      <ul className="product-list">
        {
          listedProducts.map(product => (
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
      </ul>
    </React.Fragment>
  );
};

export default Products;
