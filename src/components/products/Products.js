import React from 'react';
import PropTypes from 'prop-types';

import Paginator from './paginator/Paginator';

import './Products.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 9,
      currentPage: 0,
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(page) {
    this.setState({ currentPage: page });
  }

  render() {
    const { products, selectedCategory } = this.props;
    const { pageSize, currentPage } = this.state;

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
        {filteredProducts.length > 0 && <Paginator entries={filteredProducts.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.onPageChange} />}
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array,
  selectedCategory: PropTypes.object,
};

Products.defaultProps = {
  products: [],
  selectedCategory: null,
};

export default Products;
