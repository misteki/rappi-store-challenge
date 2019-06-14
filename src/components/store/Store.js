import React from 'react';

import './Store.css';
import Filters from '../shared/filters/Filters';
import Products from '../shared/products/Products';
import Paginator from './paginator/Paginator';
import ControlsBar from './controls-bar/ControlsBar';

const Store = (props) => {
  const {
    products,
    categories,
    cart,
    currentProductPage,
    pageSize,
    filters,
    sort,
    onFilterValueChange,
    onSortValueUpdate,
    onAddToCart,
    onPageUpdate,
  } = props;

  const {
    name,
  } = filters;

  const {
    attribute,
    isAscending,
  } = sort;

  return (
    <React.Fragment>
      <main className="store">
        <aside className="filters-panel">
          <Filters
            categories={categories}
            onFilterValueChange={(filterId, value) => { onFilterValueChange(filterId, value); }}
            filters={filters}
          />
        </aside>

        <section className="products" role="main">
          <ControlsBar
            sortAttribute={attribute}
            ascendingOrder={isAscending}
            onSortChange={onSortValueUpdate}
            nameFilter={name}
            onFilterUpdate={(filterId, value) => { onFilterValueChange(filterId, value); }}
          />
          <Products
            products={products}
            selectedProducts={cart.map(product => product.id)}
            currentPage={currentProductPage}
            onAction={onAddToCart}
            pageSize={pageSize}
            noMatchMessage="No se han encontrado productos que concidan con tus filtros"
            actionIcon="add"
          />
          {products.length > 0 && (
          <Paginator
            entries={products.length}
            pageSize={pageSize}
            currentPage={currentProductPage}
            onPageChange={onPageUpdate}
          />
          )}
        </section>
      </main>
    </React.Fragment>
  );
};

export default Store;
