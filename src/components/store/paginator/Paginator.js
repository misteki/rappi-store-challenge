import React from 'react';
import { ArrowRight, ArrowLeft } from 'react-feather';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import './Paginator.css';

const Paginator = (props) => {
  const {
    entries, pageSize, currentPage, onPageChange,
  } = props;

  const pages = Math.ceil(entries / pageSize);
  const firstPage = 0;
  const lastPage = pages - 1;

  const changePage = (page) => {
    if (page >= firstPage && page <= lastPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="paginator-container">
      {
        entries > 0
        && (
        <div className="paginator">
          <button
            type="button"
            className={currentPage > firstPage ? '' : 'invisible'}
            onClick={() => { changePage(currentPage - 1); }}
          >
            <ArrowLeft size={14} />
          </button>
          {
             [...Array(pages)].map((page, pageIndex) => (
               <button
                 type="button"
                 className={`paginator__button ${pageIndex === currentPage ? 'paginator__button_selected' : 'paginator__button'}`}
                 onClick={() => { changePage(pageIndex); }}
                 key={shortid.generate()}
               >
                 {pageIndex + 1}
               </button>
             ))
           }
          <button
            type="button"
            className={currentPage < lastPage ? '' : 'invisible'}
            onClick={() => { changePage(currentPage + 1); }}
          >
            <ArrowRight size={14} />
          </button>

        </div>
        )
      }
    </nav>
  );
};

Paginator.propTypes = {
  entries: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

Paginator.defaultProps = {
  entries: 0,
  pageSize: Infinity,
  currentPage: 0,
};

export default Paginator;
