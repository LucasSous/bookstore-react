import { Col, Row } from 'react-bootstrap';
import BaseButton from '../../../components/BaseButton/BaseButton';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import BaseSearch from '../../../components/BaseSearch/BaseSearch';
import { BooksContext } from '../../../contexts/booksContext';
import React, { useContext } from 'react';
import './BooksList.css';
import DeleteConfirmModal from '../../../components/BaseDeleteConfirmModal/DeleteConfirmModal';
import Pagination from '../../../components/Pagination/Pagination';

function BooksList() {
  const {
    books,
    handleShow,
    handlerEdit,
    handlerDelete,
    handleSearch,
    showDeleteConfirm,
    closeDeleteConfirm,
    deleteBook,
    pages,
    currentItens,
    currentPage,
    setCurrentPage,
    itensPerPage,
    setItensPerPage,
    loadingTitle,
    ordinationId,
    isActiveId,
    isAscending,
    ordinationName,
    isActiveName,
    ordinationPublisher,
    isActivePublisher,
    ordinationAuthor,
    isActiveAuthor,
    ordinationReleaseYear,
    isActiveReleaseYear,
    ordinationQuantity,
    isActiveQuantity
  } = useContext(BooksContext);

  return (
    <div className="books-list">
      <Row>
        <Col>
          <BaseHeader title="Livros"></BaseHeader>
        </Col>
        <Col className="d-flex justify-content-end actions">
          <BaseSearch change={handleSearch} />
          <BaseButton title="Adicionar Livro" click={handleShow} />
        </Col>
      </Row>
      {books.length ? (
        <div>
          <table className="table shadow-sm mt-4">
            <thead className="thead-books">
              <tr>
                <th onClick={ordinationId} className="th-start" scope="col">
                  <div className="d-flex">
                    <span>Cód.</span>
                    {!isActiveId ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationName} scope="col">
                  <div className="d-flex">
                    <span>Nome</span>
                    {!isActiveName ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationPublisher} scope="col">
                  <div className="d-flex">
                    <span>Editora</span>
                    {!isActivePublisher ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationAuthor} scope="col">
                  <div className="d-flex">
                    <span>Autor</span>
                    {!isActiveAuthor ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationReleaseYear} scope="col">
                  <div className="d-flex">
                    <span>Lançamento</span>
                    {!isActiveReleaseYear ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th onClick={ordinationQuantity} scope="col">
                  <div className="d-flex">
                    <span>Qtd. Disponível</span>
                    {!isActiveQuantity ? (
                      <span className="material-symbols-outlined icon-sync">sync_alt</span>
                    ) : (
                      <span className={`material-symbols-outlined icon-arrow ${!isAscending ? 'rotate-icon' : null}`}>
                        north
                      </span>
                    )}
                  </div>
                </th>
                <th className="th-end" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItens?.map((book) => (
                <tr className="items-tr" key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.nome}</td>
                  <td>{book.editora.nome}</td>
                  <td>{book.autor}</td>
                  <td>{book.lancamento}</td>
                  <td>{book.quantidade === 0 ? <p className="unavailable-book">Indisponível</p> : book.quantidade}</td>
                  <td>
                    <span
                      onClick={() =>
                        handlerEdit(book.id, book.nome, book.editora.id, book.autor, book.lancamento, book.quantidade)
                      }
                      className="material-symbols-outlined btn-action"
                      title="Editar">
                      edit
                    </span>
                    <span
                      onClick={() =>
                        handlerDelete(book.id, book.nome, book.editora.id, book.autor, book.lancamento, book.quantidade)
                      }
                      className="material-symbols-outlined btn-action"
                      title="Deletar">
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itensPerPage={itensPerPage}
            setItensPerPage={setItensPerPage}
          />
        </div>
      ) : (
        <div className="loading">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <span>{loadingTitle}...</span>
          </div>
        </div>
      )}
      <DeleteConfirmModal
        show={showDeleteConfirm}
        onHide={closeDeleteConfirm}
        message="Tem certeza que deseja deletar este livro?"
        clickCancel={closeDeleteConfirm}
        clickConfirm={deleteBook}
      />
    </div>
  );
}

export default BooksList;
