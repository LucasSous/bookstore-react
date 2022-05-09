import './UsersList.css';
import React, { useContext, useEffect } from 'react';
import { UsersContext } from '../../../contexts/usersContext';
import DeleteConfirmModal from '../../../components/BaseDeleteConfirmModal/DeleteConfirmModal';
import Pagination from '../../../components/Pagination/Pagination';
import { Col, Row } from 'react-bootstrap';
import BaseHeader from '../../../components/BaseHeader/BaseHeader';
import BaseSearch from '../../../components/BaseSearch/BaseSearch';
import BaseButton from '../../../components/BaseButton/BaseButton';

function UsersList() {
  const {
    users,
    handlerEdit,
    handlerDelete,
    handleShow,
    handleSearch,
    showDeleteConfirm,
    closeDeleteConfirm,
    deleteUser,
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
    ordinationAddress,
    isActiveAddress,
    ordinationCity,
    isActiveCity,
    ordinationEmail,
    isActiveEmail
  } = useContext(UsersContext);

  useEffect(() => {
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itensPerPage]);

  return (
    <div className="users-list">
      <Row>
        <Col>
          <BaseHeader title="Usuários" />
        </Col>
        <Col className="d-flex justify-content-end actions">
          <BaseSearch change={handleSearch} />
          <BaseButton title="Adicionar Usuário" click={handleShow} />
        </Col>
      </Row>
      {users.length ? (
        <div>
          <table className="table shadow-sm mt-4">
            <thead>
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
                <th onClick={ordinationAddress} scope="col">
                  <div className="d-flex">
                    <span>Endereço</span>
                    {!isActiveAddress ? (
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
                <th onClick={ordinationEmail} scope="col">
                  <div className="d-flex">
                    <span>Email</span>
                    {!isActiveEmail ? (
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
              {currentItens?.map((user) => (
                <tr className="items-tr" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nome}</td>
                  <td>{user.endereco}</td>
                  <td>{user.cidade}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      onClick={() => handlerEdit(user.id, user.nome, user.endereco, user.cidade, user.email)}
                      className="material-symbols-outlined btn-action"
                      title="Editar">
                      edit
                    </span>
                    <span
                      onClick={() => handlerDelete(user.id, user.nome, user.endereco, user.cidade, user.email)}
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
        message="Tem certeza que deseja deletar este usuário?"
        clickCancel={closeDeleteConfirm}
        clickConfirm={deleteUser}
      />
    </div>
  );
}

export default UsersList;
