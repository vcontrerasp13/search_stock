// Pagination.js
export const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Crear un rango de páginas para mostrar
    const range = (start, end) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };
  
    const getPageNumbers = () => {
      if (totalPages <= 5) {
        return range(1, totalPages); // Si hay 5 o menos páginas, mostrar todas
      }
  
      const pages = [];
      if (currentPage > 2) {
        pages.push(1);
        if (currentPage > 3) pages.push('...'); // Agregar '...' si hay más de 3 páginas
      }
  
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) pages.push('...'); // Agregar '...' si hay más de 3 páginas
        pages.push(totalPages);
      }
  
      return pages;
    };
  
    return (
      <div className="join">
        <button
          className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`join-item btn ${currentPage === page ? 'btn-primary' : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={typeof page === 'string'} // Deshabilitar si es '...'
          >
            {page}
          </button>
        ))}
        <button
          className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    );
  };
