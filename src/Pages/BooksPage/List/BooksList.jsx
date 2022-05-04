import { Col, Row } from 'react-bootstrap';
import BaseButton from '../../../components/BaseButton/BaseButton';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import BaseSearch from '../../../components/BaseSearch/BaseSearch';
import { BooksContext } from '../../../contexts/booksContext';
import React, { useContext, useEffect } from 'react';
import './BooksList.css';

function BooksList() {
  const { books, handleShow } = useContext(BooksContext);

  return (
    <div className="books-list">
      <Row>
        <Col>
          <BaseHeader title="Livros"></BaseHeader>
        </Col>
        <Col className="d-flex justify-content-end actions">
          <BaseSearch />
          <BaseButton title="Adicionar Livro" click={handleShow} />
        </Col>
      </Row>
      {books.length ? (
        <div>
          <table className="table shadow-sm mt-4">
            <thead>
              <tr>
                <th className="th-start" scope="col">
                  Cód.
                </th>
                <th scope="col">Nome</th>
                <th scope="col">Editora</th>
                <th scope="col">Autor</th>
                <th scope="col">Lançamento</th>
                <th scope="col">Qtd. Disponível</th>
                <th className="th-end" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book) => (
                <tr className="items-tr" key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.nome}</td>
                  <td>{book.editora.nome}</td>
                  <td>{book.autor}</td>
                  <td>{book.lancamento}</td>
                  <td>{book.quantidade == 0 ? <p className="unavailable-book">Indisponível</p> : book.quantidade}</td>
                  <td>
                    <span className="material-symbols-outlined btn-action" title="Editar">
                      edit
                    </span>
                    <span className="material-symbols-outlined btn-action" title="Deletar">
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="loading">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <span>dasdasd</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksList;
