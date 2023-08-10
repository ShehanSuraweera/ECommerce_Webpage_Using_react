import React from 'react';
import "./Pagination.scss";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination">
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          className={pageNum === currentPage ? 'active' : ''}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
