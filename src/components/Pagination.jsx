import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  console.log(currentPage, totalPages, onPageChange, 'Pagination')
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Define visible page numbers dynamically
    const visibleRange = 3; // Number of pages to display before/after the current page
    const startPage = Math.max(1, currentPage - visibleRange);
    const endPage = Math.min(totalPages, currentPage + visibleRange);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
            i === currentPage
              ? 'bg-primary text-white scale-110'
              : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-[#232323] text-gray-700 hover:bg-[#000] hover:text-white'
        }`}
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        &larr; Prev
      </button>

      {/* Page Numbers */}
      {renderPageNumbers() }

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
