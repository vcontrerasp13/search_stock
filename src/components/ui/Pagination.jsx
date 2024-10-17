export const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // Crear un rango de páginas para mostrar
    const range = (start, end) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };
  
    const getPageNumbers = () => {
      const pages = [];
  
      // Si el total de páginas es menor a 7, mostrar todas las páginas
      if (totalPages < 7) {
        return range(1, totalPages);
      }
  
      // Si la página actual está en el inicio
      if (currentPage < 4) {
        pages.push(...range(1, 3), '...', totalPages);
      }
      // Si la página actual está en el final
      else if (currentPage > totalPages - 3) {
        pages.push(1, '...', ...range(totalPages - 2, totalPages));
      }
      // Si la página actual está en el medio
      else {
        pages.push(1, '...', ...range(currentPage - 1, currentPage + 1), '...', totalPages);
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
  
//   export default Pagination;
  