import { useContext } from 'react';
import './Pagination.css';
import { GlobalContext } from '../../contexts/globalContext';

function Pagination({ pages, currentPage, setCurrentPage, itensPerPage, setItensPerPage }) {
  const { textTheme } = useContext(GlobalContext);

  return (
    <div className="d-flex justify-content-center">
      {Array.from(Array(pages), (item, index) => {
        return (
          <button
            key={index}
            style={index === currentPage ? { backgroundColor: '#10492e' } : null}
            className="button-pagination"
            value={index}
            onClick={(e) => setCurrentPage(Number(e.target.value))}>
            {index + 1}
          </button>
        );
      })}
      <select
        className={`select-pagination ${textTheme + '-color'}`}
        value={itensPerPage}
        onChange={(e) => setItensPerPage(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}

export default Pagination;
