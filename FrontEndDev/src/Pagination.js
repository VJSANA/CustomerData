import './page.css';
const Pagination = ({handlePageChange,currentPage,totalPages}) => {
    
    return ( 
        <div className="Pagination">
        <button className="btn-arrow btn-arrow-left"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='span'>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className="btn-arrow btn-arrow-right"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
     );
}
export default Pagination;