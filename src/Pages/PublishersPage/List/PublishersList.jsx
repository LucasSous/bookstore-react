import './PublishersList.css';
import React, { useContext, useEffect } from 'react';
import DeleteConfirmModal from '../../../components/BaseDeleteConfirmModal/DeleteConfirmModal';
import Pagination from '../../../components/Pagination/Pagination';
import { Col, Row } from 'react-bootstrap';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import BaseSearch from '../../../components/BaseSearch/BaseSearch';
import BaseButton from '../../../components/BaseButton/BaseButton';
import { PublishersContext } from '../../../contexts/publishersContext';
import { GlobalContext } from '../../../contexts/globalContext';
import ButtonSettings from '../../../components/ButtonSettings/ButtonSettings';
import Loading from '../../../components/Loading/Loading';

function PublishersList() {
  const {
    publishers,
    pages,
    currentItens,
    itensPerPage,
    setItensPerPage,
    currentPage,
    setCurrentPage,
    isAscending,
    ordinationId,
    isActiveId,
    ordinationName,
    isActiveName,
    ordinationCity,
    isActiveCity,
    closeDeleteConfirm,
    showDeleteConfirm,
    handleSearch,
    loadingTitle,
    handlerShow,
    handlerEdit,
    handlerDelete,
    deletePublisher
  } = useContext(PublishersContext);

  const { tableTheme } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itensPerPage]);

  return (
    <div className="publishers-list">
      <Row>
        <Col>
          <BaseHeader title="Editoras" />
        </Col>
        <Col className="d-flex justify-content-end align-items-center actions">
          <ButtonSettings />
          <BaseSearch change={handleSearch} />
          <BaseButton title="Adicionar Editora" click={handlerShow} />
        </Col>
      </Row>
      {publishers.length ? (
        <div>
          <table className={`${tableTheme} table shadow-sm mt-4`}>
            <thead className="thead-publishers">
              <tr>
                <th onClick={ordinationId} className="th-start" scope="col">
                  <div className="d-flex ">
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
                <th onClick={ordinationCity} scope="col">
                  <div className="d-flex">
                    <span>Cidade</span>
                    {!isActiveCity ? (
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
              {currentItens?.map((publisher) => (
                <tr className="items-tr" key={publisher.id}>
                  <td>{publisher.id}</td>
                  <td>{publisher.nome}</td>
                  <td>{publisher.cidade}</td>
                  <td>
                    <span
                      onClick={() => handlerEdit(publisher.id, publisher.nome, publisher.cidade)}
                      className="material-symbols-outlined btn-action"
                      title="Editar">
                      edit
                    </span>
                    <span
                      onClick={() => handlerDelete(publisher.id, publisher.nome, publisher.cidade)}
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
        <Loading loadingTitle={loadingTitle} />
      )}
      <DeleteConfirmModal
        show={showDeleteConfirm}
        onHide={closeDeleteConfirm}
        message="Tem certeza que deseja deletar esta editora?"
        clickCancel={closeDeleteConfirm}
        clickConfirm={deletePublisher}
      />
    </div>
  );
}

export default PublishersList;
