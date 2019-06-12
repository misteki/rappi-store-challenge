import React from 'react';
import { ArrowRight, ArrowLeft } from 'react-feather';
import shortid from 'shortid';

import './Paginator.css';

const Paginator = (props) => {
  const {
    entries, pageSize, currentPage, onPageChange,
  } = props;

  const pages = Math.ceil(entries / pageSize);
  const firstPage = 0;
  const lastPage = pages - 1;

  return (
    <nav className="paginator-container">
      <div className="paginator">
        {
          currentPage > firstPage
          && (
          <button type="button" onClick={() => { onPageChange(currentPage - 1); }}>
            <ArrowLeft size={14} />
          </button>
          )
          }
        {
        [...Array(pages)].map((page, pageIndex) => (
          <button
            type="button"
            className={`paginator-button ${pageIndex === currentPage ? 'selected' : ''}`}
            onClick={() => { onPageChange(pageIndex); }}
            key={shortid.generate()}
          >
            {pageIndex + 1}
          </button>
        ))
      }
        {
          currentPage < lastPage
          && (
          <button type="button" onClick={() => { onPageChange(currentPage + 1); }}>
            <ArrowRight size={14} />
          </button>
          )
          }
      </div>
    </nav>
  );
};

export default Paginator;
