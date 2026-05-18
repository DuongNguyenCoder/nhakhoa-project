import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
  
    // Luôn hiển thị trang 1 và 2
    pages.push(1);
    if (totalPages >= 2) pages.push(2);
  
    // Nếu currentPage > 3 thì hiển thị ...
    if (currentPage > 3) {
      pages.push("...");
    }
  
    // Thêm currentPage nếu nó không phải là 1 hoặc 2 hoặc totalPages
    if (
      currentPage > 2 &&
      currentPage < totalPages &&
      !pages.includes(currentPage)
    ) {
      pages.push(currentPage);
    }
  
    // Nếu currentPage < totalPages - 2 thì hiển thị ...
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
  
    // Luôn hiển thị trang cuối nếu khác 1 và 2
    if (totalPages > 2 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
  
    return pages.map((page, idx) =>
      page === "..." ? (
        <span key={`dots-${idx}`} className="px-2 text-gray-500">
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded-lg border ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
          }`}
        >
          {page}
        </button>
      )
    );
  };
  
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-blue-100 disabled:opacity-50"
      >
        &laquo;
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-blue-100 disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
